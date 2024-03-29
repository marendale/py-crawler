import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from urllib.robotparser import RobotFileParser
from concurrent.futures import ThreadPoolExecutor, as_completed
import os
import math
import threading
from models import Website, Image
from config import app, db

class Crawler():
    def __init__(self):
        self.urls = None
        self.stopped = True  # Initially set to True until 'start_crawl' is called
        self.user_agent = 'MyCrawler'
        self.depth = 0
        self.visited = []
        self.robots_parser = {}
        self.last_request_time = {}
        self.crawl_thread = None
        self.stop_thread = False
        self.workers = 0
        
    def can_fetch(self, url):
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        if base_url not in self.robots_parser:
            parser = RobotFileParser()
            parser.set_url(urljoin(base_url, 'robots.txt'))
            parser.read()
            self.robots_parser[base_url] = parser
        return self.robots_parser[base_url].can_fetch(self.user_agent, url)
    
    def respectful_delay(self, url, delay=1):
        domain = urlparse(url).netloc
        if domain in self.last_request_time:
            sleep_time = delay - (time.time() - self.last_request_time[domain])
            if sleep_time > 0:
                time.sleep(sleep_time)
        self.last_request_time[domain] = time.time()
            
    def crawl(self, url):
        if self.stopped:  # Check if the crawler has been paused/stopped
            return None
        if not self.can_fetch(url):
            return None
        self.respectful_delay(url)
        headers = {'User-Agent': self.user_agent}
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return None
        soup = BeautifulSoup(response.text, 'html.parser')
        name = soup.title.string if soup.title else 'No title found'
        website = Website(url=url, name=name)
        try:
            with app.app_context():
                db.session.add(website)
                db.session.commit()
        except Exception as e:
            print(e)
            return None
        img_tags = soup.find_all('img')
        valid_img_tags = [img.get('src') for img in img_tags if img.get('src') and urlparse(img.get('src')).scheme in ['http', 'https']]
        if len(valid_img_tags) > 0:
            try:
                with app.app_context():
                    for img_tag in valid_img_tags:
                        image = Image(url=img_tag)
                        db.session.add(image)
                    db.session.commit()
            except Exception as e:
                print(e)
        links = soup.find_all('a')
        urls = [link.get('href') for link in links if link.get('href') and urlparse(link.get('href')).scheme in ['http', 'https']]
        return list(set(urls))  # To remove duplicates
    
    def multi_threaded_crawl(self):
        workers = min(2 * round(math.log(len(self.urls), 3)) + 1, os.cpu_count() + 4)
        self.workers = workers
        print(f"Crawling depth: {self.depth}, URLs to crawl: {len(self.urls)}, Workers: {workers}")
        with ThreadPoolExecutor(max_workers=workers) as executor:
            future_to_url = {executor.submit(self.crawl, url): url for url in self.urls}
            self.urls = []
            for future in as_completed(future_to_url):
                result = future.result()
                if result:
                    self.urls.extend(result)
        #self.urls = self.urls[:50]
        self.visited.extend(self.urls)
        self.depth += 1
            
    def run(self):
        while not self.stopped and self.urls:
            self.multi_threaded_crawl()
             
    def start_crawl(self, urls=None):
        if urls is not None:
            self.urls = urls
        self.stopped = False
        self.visited.extend(self.urls)
        if self.crawl_thread is None or not self.crawl_thread.is_alive():
            # Start the crawler in a new thread
            self.crawl_thread = threading.Thread(target=self.run)
            self.crawl_thread.start()
            
    def pause_crawl(self):
        self.stopped = True
        self.crawl_thread.join()

    def end_crawl(self):
        self.__init__()
