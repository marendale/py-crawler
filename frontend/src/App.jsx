import { useState, useRef } from 'react'
import './App.css'
import CrawlStats from './CrawlStats'
import StartCrawl from './StartCrawl'
import PauseCrawl from './PauseCrawl'
import ResumeCrawl from './ResumeCrawl'
import EndCrawl from './EndCrawl'
import CrawlContent from './CrawlContent'

function App() {
  const [websites, setWebsites] = useState([])
  const [images, setImages] = useState([])
  const [depth, setDepth] = useState("")
  const [urls, setUrls] = useState("")
  const [workers, setWorkers] = useState("")
  const [startOption, setStartOption] = useState(true)
  const [resumeOption, setResumeOption] = useState(false)
  const [pauseOption, setPauseOption] = useState(false)
  const [endOption, setEndOption] = useState(false)
  const crawlInterval = useRef();
  
  const fetchWebsites = async () => {
    const webresponse = await fetch("http://127.0.0.1:5000/websites")
    const webdata = await webresponse.json()
    setWebsites(webdata.websites)
    const imgresponse = await fetch("http://127.0.0.1:5000/images")
    const imgdata = await imgresponse.json()
    setImages(imgdata.images)
  }

  const fetchStats = async () => {
    const response = await fetch("http://127.0.0.1:5000/crawl_stats")
    const data = await response.json()
    setDepth(data.depth)
    setUrls(data.urls)
    setWorkers(data.workers)
  }

  const startInterval = () => {
    crawlInterval.current = setInterval(() => { fetchWebsites(), fetchStats() }, 1000)
  } 

  const pauseInterval = () => {
    clearInterval(crawlInterval.current);
  }

  const onStart = () => {
    setPauseOption(true)
    setStartOption(false)
    fetchWebsites()
    fetchStats()
    startInterval()
  }

  const onPause = () => {
    pauseInterval()
    setResumeOption(true)
    setEndOption(true)
    setPauseOption(false)
  }

  const onResume = () => {
    setPauseOption(true)
    setEndOption(false)
    setResumeOption(false)
    fetchWebsites()
    fetchStats()
    startInterval()
  }

  const onEnd = () => {
    fetchWebsites()
    setResumeOption(false)
    setEndOption(false)
    setStartOption(true)
  }


  return (
    <>
    <h1>Multi-Threaded Web Crawler</h1>
    <div className='controls'>
      {startOption && <StartCrawl startCallback={onStart} />}

      {pauseOption && <CrawlStats depth={depth} urls={urls} workers={workers}/>}

      {pauseOption && <PauseCrawl pauseCallback={onPause} />}

      {resumeOption && <ResumeCrawl resumeCallback={onResume} />}

      {endOption && <EndCrawl endCallback={onEnd} />}
    </div>
    <CrawlContent websites={websites} images={images}/>
    </>
  )
}

export default App
