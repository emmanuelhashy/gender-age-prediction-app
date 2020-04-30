import React from 'react';
import './ImageLinkForm.css'
import Rank from '../Rank/Rank'

function ImageLinkForm ({rank,onImageLinkChange, onImageLinkSubmit}) {
    return (
        <form className="form">
            <div className="u-margin-bottom-medium">
                <h2 className="heading-primary">
                    Hello Deven Your current image count is....
                </h2>
            </div>

            <div className="t-center u-margin-bottom-medium">
                <Rank rank={rank}/>
            </div>

            <div className="form__group">
                <input 
                    type="text" 
                    className="form__input" 
                    placeholder="Image url" 
                    id="name" 
                    required
                    onChange={onImageLinkChange}
                />
                <label htmlFor="name" className="form__label">Image url</label>
            </div>

            <div className="form__group">
                <button 
                    className="btn btn--green"
                    onClick={onImageLinkSubmit}
                >
                Detect&rarr;</button>
            </div>
        </form>
    )
}

export default ImageLinkForm