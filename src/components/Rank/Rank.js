import React from 'react'
import './Rank.css'

function Rank ({rank}) {
    return (
        <h2 className=" heading-secondary">
            #{rank}
        </h2>
    )
}

export default Rank