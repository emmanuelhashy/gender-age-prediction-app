import React from 'react'
// import detectImg from './nat-2.jpg'
import './FaceDetection.css';
function FaceDetection ({imageUrl, faceBoxes}) {
    return (
        <div className="img-detect">
            <img id='image' src={imageUrl} alt="" width="100%" />
            {faceBoxes.map(faceBox =>{
              return  <div key={faceBox.topRow} className="face-box" style={{top:faceBox.topRow, left:faceBox.leftCol, right:faceBox.rightCol, bottom:faceBox.bottomRow}}></div>
            })

            }
            
        </div>
    )
}

export default FaceDetection