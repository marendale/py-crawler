import React, { useState } from 'react'

const StartCrawl = ({startCallback}) => {
    const [url, setUrl] = useState("")

    const onStartCrawl = async (e) => {
        e.preventDefault()

        const data = {
            url
        }
        const route = "http://127.0.0.1:5000/start_crawl"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(route, options)
        if (response.status !== 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            startCallback()
        }
            
    }

    return(
        <form onSubmit={onStartCrawl}>
            <div>
                <label htmlFor="url">url: </label>
                <input 
                    type="text" 
                    id="url" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
            </div>
            <button className={"control"} type="submit">Start Crawl</button>
        </form>
    )
}

export default StartCrawl