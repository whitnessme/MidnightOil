import { useState } from "react"
import "./FlipCard.css"

const FlipCard = () => {

    const [showSide, setShowSide] = useState("front");
    const [showRating, setShowRating] = useState(false);

    const handleFlipClick = (e) => {
        e.preventDefault();
        if (showSide === "front") {
            setShowSide("back")
            setShowRating(true)
        }
    }

    return (
        <div className="flip-card-div">
            {showSide === "front" &&
                <div  className="flip-card study-front">FRONT</div>
            }

            {showSide === "back" &&
            <div className="flip-card study-back">BACK</div>
            }
            <button onClick={handleFlipClick}>REVEAL</button>
            <div className="rating-div">
                {[1, 2, 3, 4, 5].map((ele) => (
                    <div className="rating-button">{ele}</div>
                ))}
            </div>
        </div>
    )
}

export default FlipCard;