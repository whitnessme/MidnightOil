import { useState } from "react";
import ProgressImage from "./ProgressImage";
import ProgressShapes from "./ProgressShapes";
import './ProgressBar.css'

const ProgressBar = () => {

    const [fill, setFill] = useState("grey")

    return (
        <div className="progress-bar-div">
            <p>Deck name</p>
            <ProgressImage />
            <ProgressShapes fill={fill} />
            <div className="round-timer-div">
                <p>This Round(#): timer</p>
            </div>
        </div>
    )
}

export default ProgressBar;