import React, { useState } from 'react'

const PauseCrawl = ({pauseCallback}) => {
    const [pausing, setPausing] = useState(false)

    const onPauseCrawl = async () => {
        setPausing(true)
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
        <button className={"control"} onClick={onPauseCrawl} disabled={pausing}>{pausing ? ("Pausing") : ("Pause Crawl")}</button>
    )
}

export default PauseCrawl