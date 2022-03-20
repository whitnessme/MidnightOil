import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadDeck } from "../../store/decks";

import DeckHeader from './DeckHeader'
import CardsButtons from "../Cards/CardsButtons";
import CardsListTab from "./CardsListTab";
import CreateCardsTab from "./CreateCardsTab";

const DeckPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { deckId } = useParams();

    const deck = useSelector((state) => state.decks?.one[deckId])
    const currUser = useSelector((state) => state.session?.user)
    console.log(deck?.Cards)
    const [showCardsListTab, setShowCardsListTab] = useState(true);
    const [showCreateCardsTab, setShowCreateCardsTab] = useState(false);
    
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
            <CardsButtons setShowCardsListTab={setShowCardsListTab} setShowCreateCardsTab={setShowCreateCardsTab} />
            {showCardsListTab &&
                <CardsListTab cards={deck?.Cards} />
            }
            {showCreateCardsTab &&
                <CreateCardsTab cards={deck?.Cards} />
            }
        </div>
    )
}

export default DeckPage;