import React, { useState } from "react";
import WebsiteList from "./WebsiteList";
import ImageList from "./ImageList";
import './CrawlContent.css'

const CrawlContent = ({websites, images}) => {
    const [websitesTab, setWebsitesTab] = useState(true)
    const [imagesTab, setImagesTab] = useState(false)

    const openWebTab = () => {
        setImagesTab(false)
        setWebsitesTab(true)

    }

    const openImgTab = () => {
        setWebsitesTab(false)
        setImagesTab(true)
    }

    return (
        <>
        <div className="tab">
            <button className="tablinks" onClick={openWebTab}>Websites</button>
            <button className="tablinks" onClick={openImgTab}>Images</button>
        </div>

        {websitesTab && 
        <div className="tabcontent">
            <WebsiteList websites={websites} />
        </div>
        }

        {imagesTab &&
        <div className="tabcontent">
            <ImageList images={images} />
        </div>
        }
        </>
    )
}

export default CrawlContent