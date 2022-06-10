// import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { editACard } from "../../store/cards";
import { loadCard } from "../../store/cards";
import "./FlipCard.css"

const FlipCard = ({ deckId,
    showSide,
    setShowSide,
    borderColor,
    fontColor,
    currCard,
    setCurrCard,
    setCurrCardId,
    front,
    back
    }) => {

    const dispatch = useDispatch();
    
    console.log(borderColor)
    const ratingColors = {
            1: "#CA0081",
            2: "#ffa500",
            3: "#FFDA00",
            4: "#60B024",
            5: "#00A9DB",
    }


    const handleFlipClick = (e) => {
        e.preventDefault();
        if (showSide === "front") {
            setShowSide("back")
        }
    }

    const handleRate = (num) => {
        currCard.curr_rating = num;

        (async () => {
            console.log(currCard)
            dispatch(editACard(currCard.id, currCard)).then((res) => {
                if (res.errors) console.log(res.errors)
                else {
                    let study = JSON.parse(localStorage.study)
                    study.cards.pop()
                    localStorage.study = JSON.stringify(study)
                    let newCard = study.cards[study.cards.length-1];
                    
                    (async () => {
                        await dispatch(loadCard(newCard.id)).then((res) => {
                            console.log("RES",res)
                        })
                        setCurrCardId(newCard.id)
                        setCurrCard(newCard)
                    })()
                }
            })
        })()
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
                        style={{ "borderBottom": `5px solid ${borderColor}`}}>{front}</div>
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
                        style={{ "borderBottom": `5px solid ${borderColor}`}}>{back}</div>
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