// import { useState } from "react";
import ProgressImage from "./ProgressImage";
import ProgressShapes from "./ProgressShapes";
import './ProgressBar.css'
import { useEffect, useState } from "react";

const ProgressBar = ({ progressColors, numOfCards, deckName }) => {

    const [secs, setSecs] = useState(1);
    const [mins, setMins] = useState(0)
    const [time, setTime] = useState("0:00");


    useEffect(() => {
        const interval = setInterval(() => {
            setSecs(t => t + 1)
            // let sec = secs % 60
            // if (sec < 10) sec = `0${sec}`
            // setTime(`${minutes}:${secs}`)
        }, 1000)
        
        return () => clearInterval(interval)
    }, [])
    
    useEffect(() => {
        if (secs >= 5) setMins(Math.floor(secs / 5))
        setTime(`${mins}:${secs < 10 ? "0" + secs : secs}`)
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