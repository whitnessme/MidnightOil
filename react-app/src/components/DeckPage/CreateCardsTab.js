import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadDeckCards } from "../../store/cards";
// import LeftCardsCol from '../Cards/LeftCardsCol';
import CreateCardForm from '../Cards/CreateCardForm';
import MiniCard from "../Cards/MiniCard";
import './CreateCardsTab.css';

const CreateCardsTab = () => {
    const dispatch = useDispatch()
    const { deckId } = useParams()

    const cards = useSelector((state) => Object.values(state?.cards?.all))


    useEffect(() => {
        (async () => {
            if (deckId) {
                await dispatch(loadDeckCards(deckId))
            }
        })()
    }, [])

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
                    <div className="mini-card-container">
                        <div className="mini-card-num">
                            <p>{i+1}</p>
                        </div>
                        <MiniCard card={card} />
                    </div>
                ))}
            </div>
            <CreateCardForm />
        </div>
    )
}

export default CreateCardsTab;