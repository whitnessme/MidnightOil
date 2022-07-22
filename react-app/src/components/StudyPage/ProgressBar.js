// import { useState } from "react";
import ProgressImage from "./ProgressImage";
import ProgressShapes from "./ProgressShapes";
import './ProgressBar.css'

const ProgressBar = ({ progressColors }) => {

    return (
        <div className="progress-bar-div">
            <p>Deck name</p>
            <ProgressImage />
            <ProgressShapes progressColors={progressColors} />
            <div className="round-timer-div">
                <p>This Round(#): timer</p>
            </div>
        </div>
    )
}

export default ProgressBar;