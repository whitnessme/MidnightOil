import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadDeckCards, loadCard } from "../../store/cards";
// import LeftCardsCol from '../Cards/LeftCardsCol';
import CreateCardForm from '../Cards/CreateCardForm';
import MiniCard from "../Cards/MiniCard";
import './CreateCardsTab.css';

const CreateCardsTab = () => {
    const dispatch = useDispatch()
    const { deckId } = useParams()

    const newCardRef = useRef(null);

    const [selectedId, setSelectedId] = useState()
    const [selectedNum, setSelectedNum] = useState(1)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(true)


    console.log(selectedId)

    const cards = useSelector((state) => Object.values(state?.cards?.all))

    // const scrollToNewCard = () => {
    //         newCardRef.current.scrollIntoView()
    // }

    useEffect(() => {
        if (newCardRef.current) {
                newCardRef.current.scrollIntoView()
        }
    }, [showCreate])

    useEffect(() => {
        (async () => {
            if (deckId) {
                await dispatch(loadDeckCards(deckId))
            }
        })()
    }, [])

    useEffect(() => {
        if (cards) {
            setSelectedId(cards[0].id)
        }
    }, [])

    useEffect(() => {
        (async () => {
            if (selectedId) {
                await dispatch(loadCard(selectedId))
            }
        })()
    }, [selectedId])

    return (
        <div className="create-tab-container">
            <div className='left-col-create-container'>
                <div className='left-col-header'>
                    <p>{"CARDS " + `(${cards?.length})`}</p>
                    <div onClick={() => {
                        setShowCreate(true)
                        setShowEdit(false)
                        // scrollToNewCard()
                    }} className="add-mini-card-button">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>
                {cards?.map((card, i) => (
                    <div onClick={() => {
                        setSelectedId(card.id)
                        setSelectedNum(i + 1)
                        setShowEdit(true)
                        setShowCreate(false)
                        }} className="mini-card-container">
                        <div className="mini-card-num">
                            <p>{i+1}</p>
                        </div>
                        <MiniCard card={card} />
                    </div>
                ))}
                {showCreate &&
                    <div ref={newCardRef} className="mini-card-container">
                        <div className="mini-card-num">
                            <p>{cards?.length + 1}</p>
                        </div>
                        <MiniCard />
                    </div>
                }
            </div>
            {showEdit &&
            <CreateCardForm cardId={selectedId} deckId={deckId} selectedNum={selectedNum} type="edit" />
            }
            {showCreate &&
                <CreateCardForm type="create" deckId={deckId} selectedNum={cards?.length + 1} />
            }
        </div>
    )
}

export default CreateCardsTab;