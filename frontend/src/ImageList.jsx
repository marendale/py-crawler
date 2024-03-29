import React from "react";

const ImageList = ({images}) => {

    
    return (
    <div>
        <h3>Images</h3>
        <div className='images'>
            {images.map((image) => (
                <img key={image.id} src={image.url} />
            ))}
        </div>
    </div>
    )
}

export default ImageList