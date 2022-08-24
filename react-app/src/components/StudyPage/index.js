import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadCard } from '../../store/cards';
import { loadDeck } from "../../store/decks";
import { loadStudyCards } from '../../store/studyCards';
import FlipCard from './FlipCard';
import ProgressBar from './ProgressBar';
import "./StudyPage.css"
import StudyResults from './StudyResults';


const StudyPage = () => {
    const dispatch = useDispatch();
    const { deckId } = useParams();
    const history = useHistory();

    const ratingColors = {
        0: '#CCCCCC',
        1: "#CA0081",
        2: "#ffa500",
        3: "#FFDA00",
        4: "#60B024",
        5: "#00A9DB",
    }

    const deck = useSelector((state) => state.decks?.one[deckId])
    const currUser = useSelector((state) => state.session?.user)
    const card = useSelector((state) => Object.values(state.cards?.one)[0])

    const [showSide, setShowSide] = useState("front");
    const [borderColor, setBorderColor] = useState('#CCCCCC');
    const [fontColor, setFontColor] = useState("black");
    const [progressColors, setProgressColors] = useState([]);
    
    const [currCard, setCurrCard] = useState();
    const [currCardId, setCurrCardId] = useState();
    const [front, setFront] = useState();
    const [back, setBack] = useState();
    
    const [numOfCards, setNumOfCards] = useState();

    const [showResults, setShowResults] = useState(false);

    // Local Storage to Store 10 cards:
    
    useEffect( () => {
        // If the deck doesn't exist, then pushed to unauth page
        (async () => {
            await dispatch(loadDeck(deckId)).then((res) => {
                if (res.errors) history.push('/unauthorized')
            })
        })()
    }, [dispatch, deckId, history])
    
    
    useEffect(() => {
        (async () => {
            // Grab study obj from localStorage
            let study = JSON.parse(localStorage.study)

            if (study.cards.length === 0) {
                // This occurs when someone presses the study button on a deck--study.cards is empty in localStorage
               await dispatch(loadStudyCards(deckId)).then((res) => {
                    if (res.errors) console.log(res)
                    else {
                        localStorage.study = JSON.stringify({deck_id: deckId, progress: [], cards: res, count_1: 0, count_2: 0, count_3: 0, count_4: 0, count_5: 0});
                        (async () => {
                            await dispatch(loadCard(res[res.length - 1].id)).then((res) => {
                                if (res.errors) console.log(res.errors)
                            })
                            setNumOfCards(res.length)
                            setCurrCardId(res[res.length - 1].id)
                            setCurrCard(res[res.length - 1])
                        })()
                    }
                })
            }
            else {
                // This occurs during a refresh, when study.cards DOES have something saved in localStorage
                (async () => {
                    await dispatch(loadCard(study.cards[0].id)).then((res) => {
                        // console.log("RES",res)
                    })
                    setCurrCardId(study.cards[0].id)
                    setCurrCard(study.cards[0])
                })()
                setProgressColors(study.progress)
            }
        })()
    }, [dispatch, deckId])
    
    useEffect(() => {
        // This occurs whenever currCard is changed, to see all the right values
        let study = JSON.parse(localStorage.study)
        if (study.cards.length > 0 && card) {
            setFront(card.front)
            setBack(card.back)
            setBorderColor(ratingColors[card.curr_rating])
            setProgressColors(study.progress)
            if (showSide === 'back') {
                setShowSide('front')
            }
        }
    }, [currCard])

    useEffect(() => {
        // This occurs whenever borderColor changes to make sure the font is readable
        if (borderColor === '#CCCCCC' || "#FFDA00") {
            setFontColor('black')
        } else setFontColor('white')
    }, [borderColor])
    
    // If user does not own the deck (like if they change the url manually) they will not be able to study it
    if (deck && currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }

    return (
        <div className='study-page-div'>
            {showResults ? 
                <StudyResults
                    deckId={deckId}
                    setShowResults={setShowResults}
                    setProgressColors={setProgressColors}
                />
            :
            <>
                <ProgressBar
                progressColors={progressColors}
                numOfCards={numOfCards}
                deckName={deck?.name}
                />
                
                <FlipCard deckId={deckId}
                showSide={showSide}
                setShowSide={setShowSide}
                borderColor={borderColor}
                fontColor={fontColor}
                currCard={currCard}
                setCurrCard={setCurrCard}
                setCurrCardId={setCurrCardId}
                front={front}
                back={back}
                setShowResults={setShowResults}
                />
            </>
            }
        </div>
    )
}

export default StudyPage;