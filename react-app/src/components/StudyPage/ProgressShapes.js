import { useEffect } from "react";
import './ProgressBar.css'

const ProgressShapes = ({ progressColors, numOfCards }) => {

    let numOfShapes = [...progressColors];

    // progressColors is an array of numbers cooresponding with what ratings the user has made so far
    // this for loop adds the correct # of "blank" progress lamps to the mapping 
    for (let i = 1; i <= (numOfCards - progressColors.length); i++) {
        numOfShapes.push("blank")
    } 

    return (
        <div className="lamps-container">
            {numOfShapes.map((num, i) => (
                <div key={`progress-lamp-${num, i}`} className="progress-lamp-div">
                    <img alt={`oil lamp ${num}`} className="progress-lamp" src={`../../../../static/progress_lamp_${numOfShapes[i]}.png`}></img>
                </div>
                )
                )}
        </div>
    )
}

export default ProgressShapes;