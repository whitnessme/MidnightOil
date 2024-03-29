// import { useState } from "react";
import ProgressImage from "./ProgressImage";
import ProgressShapes from "./ProgressShapes";
import './ProgressBar.css'
import { useEffect, useState } from "react";
import StudyTimer from "./StudyTimer";

const ProgressBar = ({ progressColors, numOfCards, deckName }) => {

    return (
        <div className="progress-bar-div">
            <div className="left-bar">
                <p id="deck-name">{deckName}</p>
            </div>
            {/* <ProgressImage /> */}
            <ProgressShapes
                progressColors={progressColors}
                numOfCards={numOfCards}
            />
            <StudyTimer />
        </div>
    )
}

export default ProgressBar;