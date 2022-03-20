import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadDeckCards } from "../../store/cards";
import CardPreview from "../Cards/CardPreview"

const CardsListTab = () => {
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
        <div className="cards-list-tab-container">
            {cards?.map((card, i) => (
                <CardPreview card={card} idx={i + 1} />
            ))}
        </div>
    )
}

export default CardsListTab;