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
    back,
    setShowResults
    }) => {

    const dispatch = useDispatch();
    
    const ratingColors = {
            1: "#CA0081",
            2: "#FFA500",
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
        // Things that need to change about the card in DB
        if (num === 5 && currCard.curr_rating === 5) {
            // Want to count how many times in a row they get 5's
            currCard.numFivesInRow++
        } else if (num !== 5) {
            // If the num isn't five, want to make sure this is reset to 0
            currCard.numFivesInRow = 0
        }
        currCard.curr_rating = num;
        currCard.seen = true;
        
        (async () => {
            // Change the current rating for the currnt card!
            dispatch(editACard(currCard.id, currCard)).then((res) => {
                if (res.errors) console.log(res.errors)
                else {
                    // Grab study obj from localStorage
                    let study = JSON.parse(localStorage.study)

                    // Update the count for the specific rating they chose
                    let countKey = `count_${num}`
                    study[countKey]++

                    let cards = study.cards
        
                    if (num !== 1 && cards.length > 0) { // need to make sure its not empty
                        // If they successfully knew it (even a little bit), we want to remove it from the cards array
                        study.cards.pop()   
                        // Make sure progress bar has the rating color they chose
                        study.progress.push(num)
                    } else if (num === 1 && cards.length > 1) { // still with another card left to switch spots
                        // If the rating is 1, we don't remove the card but put it switch it with another card in the array randomly
                        let newIndex = Math.floor(Math.random() * (cards.length - 1))
                        study.cards[cards.length - 1] = study.cards[newIndex]
                        study.cards[newIndex] = res
                    };
                    // After editing the cards array we want to make sure local Storage has it still, in case of refresh
                    localStorage.study = JSON.stringify(study);
                    if (study.cards.length) {
                        // when there are still cards in line, we want to grab the next one
                        let newCard = cards[cards.length - 1];
                        (async () => {
                            await dispatch(loadCard(newCard.id)).then((res) => {
                                if (res.errors) console.log(res.errors)
                            })
                            setCurrCardId(newCard.id)
                            setCurrCard(newCard)
                        })()
                    } else {
                        // No more cards left means the study session is done; time to show the results!
                        setShowResults(true)
                    }
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
                        style={{ borderBottom: `5px solid ${borderColor}`}}>
                            <p>{front}</p>
                            </div>
                    <button
                        className="reveal-button"
                        onClick={handleFlipClick}
                        style={{ backgroundColor: `${borderColor}`, color: `${fontColor}`}}>Reveal Answer</button>
                </>
            }

            {showSide === "back" &&
                <>
                    <div
                        className="flip-card study-back"
                        style={{ "borderBottom": `5px solid ${borderColor}`}}>
                            <p>{back}</p>
                            </div>
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