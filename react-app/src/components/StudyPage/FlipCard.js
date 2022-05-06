import { useState } from "react"
import "./FlipCard.css"

const FlipCard = () => {

    const [showSide, setShowSide] = useState("front");

    const handleFlipClick = (e) => {
        e.preventDefault();
        if (showSide === "front") {
            setShowSide("back")
        }
    }

    const handleRate = (num) => {
        setShowSide("front")
    }

    const ratingColors = {
        1: "#CA0081",
        2: "#ffa500",
        3: "#FFDA00",
        4: "#60B024",
        5: "#00A9DB",
    }

    return (
        <div className="flip-card-div">
            {showSide === "front" &&
                <>
                    <div  className="flip-card study-front">FRONT</div>
                    <button onClick={handleFlipClick}>REVEAL</button>
                </>
            }

            {showSide === "back" &&
                <>
                    <div className="flip-card study-back">BACK</div>
                    <div className="rating-div">
                        {[1, 2, 3, 4, 5].map((ele) => (
                            <div
                            onClick={() => handleRate(ele) }
                            className={`rating-button rate-${ele}`}
                            style={{ "backgroundColor": `${ratingColors[ele]}`}}
                            >
                                {ele === 1 ? (
                                    <>
                                        <div>{ele}</div>
                                        <div className="rate-info">Not At All</div>
                                    </>
                                    ) : ele === 5 ? (
                                        <>
                                        <div>{ele}</div>
                                        <div className="rate-info">Perfectly</div>
                                    </>
                                    ) :
                                    ele}
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default FlipCard;