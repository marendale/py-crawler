import React from "react";

const CrawlStats = ({depth, urls, workers}) => {
    return (
        <h3>Crawling depth: {depth}, URLs to crawl: {urls}, Workers: {workers}</h3>
    )
}

export default CrawlStats