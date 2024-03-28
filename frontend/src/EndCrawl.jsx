import React from 'react'

const EndCrawl = ({endCallback}) => {

    const onEndCrawl = async () => {
        const route = 'http://127.0.0.1:5000/end_crawl'
        const options = {
            "method": "DELETE"
        }
        const response = await fetch(route, options)
        if (response.status !== 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            endCallback()
        }
    }

    return (
        <button onClick={onEndCrawl}>End Crawl</button>
    )
}

export default EndCrawl