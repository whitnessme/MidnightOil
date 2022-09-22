import { useEffect } from "react";
import './ProgressBar.css'

const ProgressShapes = ({ progressColors, numOfCards }) => {

    let numOfShapes = [...progressColors];

    for (let i = 1; i <= (numOfCards - progressColors.length); i++) {
        numOfShapes.push(i)
    } 

    console.log(numOfShapes)

    // progressColors is an array of color values 

    return (
        <>
            {numOfShapes.map((num, i) => (
                <div key={`progress-lamp-${num}`} className="progress-lamp-div">
                    <img alt={`oil lamp ${num}`} className="progress-lamp" src={`../../../../static/progress_lamp_${numOfShapes[i].length > 1 ? numOfShapes[i] : "blank"}.png`}></img>
                </div>
                )
                )}
        </>
    )
}

export default ProgressShapes;