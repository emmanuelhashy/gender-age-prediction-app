import React from 'react';
import './FaceBio.css';

function FaceBio ({facesBio}) {
    return (
        <div className="face-bio">
            {facesBio.map(faceBio =>{
                return (
                    <div key={faceBio.age} className="bio-box">
                        <p className="face-bio__text"><span className="face-bio__text--primary">Age: </span>{faceBio.age}</p>
                        <p className="face-bio__text"><span className="face-bio__text--primary">Gender: </span>{faceBio.gender}</p>
                        <p className="face-bio__text"><span className="face-bio__text--primary">Multicultural_Appearance: </span>{faceBio.appearance}</p>  
                    </div>
                )
                
            })

            }
            
        </div>
    )
}
export default FaceBio;