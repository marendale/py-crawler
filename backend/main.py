from flask import request, jsonify
from config import app, db
from models import Website, Image
from crawler import Crawler

crawler = Crawler()

@app.route("/websites", methods=["GET"])
def get_websites():
    websites = Website.query.all()
    json_websites = list(map(lambda x: x.to_json(), websites))
    return jsonify({"websites": json_websites})

@app.route("/images", methods=["GET"])
def get_images():
    images = Image.query.all()
    json_images = list(map(lambda x: x.to_json(), images))
    return jsonify({"images": json_images})

@app.route("/start_crawl", methods=["POST"])
def start_crawl():
    url = request.json.get("url")
    if not url:
        return jsonify({"message": "Enter a url to start crawler"}), 400
    if not crawler.can_fetch(url):
        return jsonify({"message": f"Crawl not allowed by robots.txt: {url}"}), 400
    url = [url]
    try:
        crawler.start_crawl(url)
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"meassage": "Crawl started!"}), 201

@app.route("/pause_crawl")
def pause_crawl():
    try:
        crawler.pause_crawl()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"meassage": "Crawl paused!"}), 201

@app.route("/resume_crawl")
def resume_crawl():
    try:
        crawler.start_crawl()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"meassage": "Crawl resumed!"}), 201

@app.route("/end_crawl", methods=["DELETE"])
def end_crawl():
    websites = Website.query.all()
    images = Image.query.all()
    if not websites:
        return jsonify({"message": "No websites found"}), 404
    try:
        crawler.end_crawl()
        for website in websites:
            db.session.delete(website)
        for image in images:
            db.session.delete(image)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Crawl ended!"}), 200

@app.route("/crawl_stats", methods=["GET"])
def crawl_stats():
    return jsonify({"depth": crawler.depth, "urls": len(crawler.urls), "workers": crawler.workers})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)