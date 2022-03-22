import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadDeck } from "../../store/decks";

import DeckHeader from './DeckHeader'
import CardsButtons from "../Cards/CardsButtons";
import CardsListTab from "./CardsListTab";
import CreateCardsTab from "./CreateCardsTab";

import './DeckPage.css'

const DeckPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { deckId } = useParams();

    const deck = useSelector((state) => state.decks?.one[deckId])
    const currUser = useSelector((state) => state.session?.user)

    const [showCardsListTab, setShowCardsListTab] = useState(true);
    const [showCreateCardsTab, setShowCreateCardsTab] = useState(false);
    const [hideOverflow, setHideOverflow] = useState("auto")
    
    useEffect( () => {
        (async () => {
            await dispatch(loadDeck(deckId))
        })()
    }, [])
    
    if (deck && currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }
    // Only user's who own the deck can access the deck's page:

    return (
        <div className="deck-page-container">
            <DeckHeader deck={deck} />
            <CardsButtons setHideOverflow={setHideOverflow} setShowCardsListTab={setShowCardsListTab} setShowCreateCardsTab={setShowCreateCardsTab} />
            {showCardsListTab &&
                <CardsListTab />
            }
            {showCreateCardsTab &&
                <CreateCardsTab />
            }
        </div>
    )
}

export default DeckPage;