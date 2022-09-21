// import { useState } from "react";
import ProgressImage from "./ProgressImage";
import ProgressShapes from "./ProgressShapes";
import './ProgressBar.css'
import { useEffect, useState } from "react";

const ProgressBar = ({ progressColors, numOfCards, deckName }) => {

    const [secs, setSecs] = useState(1);
    const [mins, setMins] = useState(0);
    const [time, setTime] = useState("0:00");

    useEffect(() => {
        let timer;
            if (secs <= 1800) {
                timer = setTimeout(() => setSecs(secs + 1), 1000)
                if (secs >= 60) setMins(Math.floor(secs / 60))
                
                setTime(
                    `${mins}:${(secs - 1) % 60 < 10 ? "0" + ((secs - 1) % 60)
                    :
                    ((secs - 1) % 60)}`
                    )
            } else {
                setTime("30+ minutes--Are you still there?")
            }
        return () => clearTimeout(timer)
    }, [secs])

    return (
        <div className="progress-bar-div">
            <p>Deck: {deckName}</p>
            {/* <ProgressImage /> */}
            <ProgressShapes
                progressColors={progressColors}
                numOfCards={numOfCards}
            />
            <div className="round-timer-div">
                <p>This Round: {
                    time
                }</p>
            </div>
        </div>
    )
}

export default ProgressBar;