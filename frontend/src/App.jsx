import { useState, useRef } from 'react'
import './App.css'
import WebsiteList from './WebsiteList'
import StartCrawl from './StartCrawl'
import PauseCrawl from './PauseCrawl'
import ResumeCrawl from './ResumeCrawl'
import EndCrawl from './EndCrawl'

function App() {
  const [websites, setWebsites] = useState([])
  const [startOption, setStartOption] = useState(true)
  const [resumeOption, setResumeOption] = useState(false)
  const [pauseOption, setPauseOption] = useState(false)
  const [endOption, setEndOption] = useState(false)
  const crawlInterval = useRef();
  
  const fetchWebsites = async () => {
    const response = await fetch("http://127.0.0.1:5000/websites")
    const data = await response.json()
    setWebsites(data.websites)
  }

  const startInterval = () => {
    crawlInterval.current = setInterval(() => fetchWebsites(), 1000)
  } 

  const pauseInterval = () => {
    clearInterval(crawlInterval.current);
  }

  const onStart = () => {
    setPauseOption(true)
    setStartOption(false)
    fetchWebsites()
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
    {startOption && <StartCrawl startCallback={onStart} />}

    {pauseOption && <PauseCrawl pauseCallback={onPause} />}

    {resumeOption && <ResumeCrawl resumeCallback={onResume} />}

    {endOption && <EndCrawl endCallback={onEnd} />}

    <WebsiteList websites={websites} />
    </>
  )
}

export default App
