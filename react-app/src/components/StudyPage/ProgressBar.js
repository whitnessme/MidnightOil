// import { useState } from "react";
import ProgressImage from "./ProgressImage";
import ProgressShapes from "./ProgressShapes";
import './ProgressBar.css'

const ProgressBar = ({ progressColors, numOfCards, deckName }) => {

    return (
        <div className="progress-bar-div">
            <p>Deck: {deckName}</p>
            <ProgressImage />
            <ProgressShapes
            progressColors={progressColors}
            numOfCards={numOfCards}
            />
            <div className="round-timer-div">
                <p>This Round(#): timer</p>
            </div>
        </div>
    )
}

export default ProgressBar;