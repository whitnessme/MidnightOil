import { useState } from "react"
import "./FlipCard.css"

const FlipCard = () => {

    const [showSide, setShowSide] = useState("front");

    return (
        <div className="flip-card-div">
            {showSide === "front" &&
                <div className="flip-card study-front">FRONT</div>
            }
            
            {showSide === "back" &&
            <div className="flip-card study-back">BACK</div>
            }
        </div>
    )
}

export default FlipCard;