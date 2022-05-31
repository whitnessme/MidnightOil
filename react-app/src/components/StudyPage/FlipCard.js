import { useEffect, useState } from "react"
import "./FlipCard.css"

const FlipCard = () => {

    const [showSide, setShowSide] = useState("front");
    const [borderColor, setBorderColor] = useState('#CCCCCC');
    const [fontColor, setFontColor] = useState("black")

    useEffect(() => {
        if (borderColor === '#CCCCCC' || "#FFDA00") {
            setFontColor('black')
        } else setFontColor('white')
    }, [borderColor])

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

    // useEffect(() => {
    //     if (card?.curr_rating) {
    //         setBorderColor(ratingColors[card.curr_rating])
    //     }
    // }, [card])

    return (
        <div className="flip-card-div">
            {showSide === "front" &&
                <>
                    <div 
                        className="flip-card study-front"
                        style={{ "borderBottom": `5px solid ${borderColor}`}}>FRONT</div>
                    <button
                        className="reveal-button"
                        onClick={handleFlipClick}
                        style={{ backgroundColor: {borderColor}, color: `${fontColor}`}}>Reveal Answer</button>
                </>
            }

            {showSide === "back" &&
                <>
                    <div
                        className="flip-card study-back"
                        style={{ "borderBottom": `5px solid ${borderColor}`}}>BACK</div>
                    <div className="rating-div">
                        {[1, 2, 3, 4, 5].map((ele) => (
                            <div key={ele}
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
                                    <div>{ele}</div>}
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default FlipCard;