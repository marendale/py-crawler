import React from 'react'

const ResumeCrawl = ({resumeCallback}) => {
    const onResumeCrawl = async () => {
        const route = "http://127.0.0.1:5000/resume_crawl"
        const response = await fetch(route)
        if (response.status !== 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            resumeCallback()
        }
    }
    return (
        <button className={"control"} onClick={onResumeCrawl}>Resume Crawl</button>
    )
}

export default ResumeCrawl