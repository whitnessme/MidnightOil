import { useEffect, useState } from "react";
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

    const [selectedId, setSelectedId] = useState()
    console.log(selectedId)

    const cards = useSelector((state) => Object.values(state?.cards?.all))
    const selectedCard = useSelector((state) => state?.cards?.one)

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
                    <div className="add-mini-card-button">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>
                {cards?.map((card, i) => (
                    <div onClick={() => setSelectedId(card.id)} className="mini-card-container">
                        <div className="mini-card-num">
                            <p>{i+1}</p>
                        </div>
                        <MiniCard card={card} />
                    </div>
                ))}
            </div>
            <CreateCardForm card={selectedCard} />
        </div>
    )
}

export default CreateCardsTab;