import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadDeckCards } from "../../store/cards";
import CardPreview from "../Cards/CardPreview"

const CardsListTab = ({ setSelected, setShowCardsListTab, setShowCreateCardsTab }) => {
    const dispatch = useDispatch()
    const { deckId } = useParams()

    const cards = useSelector((state) => Object.values(state?.cards?.all))

    const handleCreate = (e) => {
        e.preventDefault()
        setShowCreateCardsTab(true)
        setShowCardsListTab(false)
        setSelected("edit")
    }

    useEffect(() => {
        (async () => {
            if (deckId) {
                await dispatch(loadDeckCards(deckId))
            }
        })()
    }, [])

    if (!cards.length) {
        return (
            <div className="cards-list-tab-container">
                <div className="no-cards-div">
                    <p>No cards yet!</p>
                    <button className="dark-buttons" onClick={handleCreate}>Create the first card!</button>
                </div>
            </div>
        )
    }

    return (
        <div className="cards-list-tab-container">
            {cards?.map((card, i) => (
                <CardPreview card={card} idx={i + 1} />
            ))}
        </div>
    )
}

export default CardsListTab;