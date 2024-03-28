import React from 'react'

const PauseCrawl = ({pauseCallback}) => {
    const onPauseCrawl = async () => {
        const route = "http://127.0.0.1:5000/pause_crawl"
        const response = await fetch(route)
        if (response.status !== 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            pauseCallback()
        }
    }
    return (
        <button className={"control"} onClick={onPauseCrawl}>Pause Crawl</button>
    )
}

export default PauseCrawl