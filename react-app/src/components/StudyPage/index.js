import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadCard } from '../../store/cards';
import { loadDeck } from "../../store/decks";
import { loadStudyCards } from '../../store/studyCards';
import FlipCard from './FlipCard';
import ProgressBar from './ProgressBar';
import "./StudyPage.css"


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
    
    const [currCard, setCurrCard] = useState();
    const [currCardId, setCurrCardId] = useState();
    const [front, setFront] = useState();
    const [back, setBack] = useState();

    // Local Storage to Store 10 cards:
    
    useEffect( () => {
        (async () => {
            await dispatch(loadDeck(deckId)).then((res) => {
                if (res.errors) history.push('/unauthorized')
            })
        })()
    }, [dispatch, deckId, history])
    
    useEffect(() => {
        (async () => {
            let study = JSON.parse(localStorage.study)
            if (study.cards.length === 0) {
               await dispatch(loadStudyCards(deckId)).then((res) => {
                    if (res.errors) console.log(res)
                    else {
                        localStorage.study = JSON.stringify({deck_id: deckId, cards: res, one_count: 0, two_count: 0, three_count: 0, four_count: 0, five_count: 0});
                        // setStudyCards(res)
                        (async () => {
                            await dispatch(loadCard(res[0].id)).then((res) => {
                                console.log("RES",res)
                            })
                            setCurrCardId(res[0].id)
                            setCurrCard(res[0])
                        })()
                    }
                })
            }
            else {
                let card = study.cards[0]
                setCurrCard(card)
            }
        })()
    }, [dispatch, deckId])
    
    useEffect(() => {
        let study = JSON.parse(localStorage.study)
        if (study.cards.length > 0) {
            // let card = study.cards[0]
            setFront(card.front)
            setBack(card.back)
            console.log(card.curr_rating)
            setBorderColor(ratingColors[card.curr_rating])
        }
    }, [showSide, currCard])

    useEffect(() => {
        if (borderColor === '#CCCCCC' || "#FFDA00") {
            setFontColor('black')
        } else setFontColor('white')
    }, [borderColor])
    
    if (deck && currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }

    return (
        <div className='study-page-div'>
            <ProgressBar color={borderColor} />
            <FlipCard deckId={deckId}
                showSide={showSide}
                setShowSide={setShowSide}
                borderColor={borderColor}
                fontColor={fontColor}
                currCard={currCard}
                front={front}
                back={back}
            />
        </div>
    )
}

export default StudyPage;