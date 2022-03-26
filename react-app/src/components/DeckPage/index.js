import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadDeck } from "../../store/decks";

import DeckHeader from './DeckHeader'
import CardsButtons from "../Cards/CardsButtons";
import CardsListTab from "./CardsListTab";
import CreateCardsTab from "./CreateCardsTab";
import DeckModal from "../Decks/DeckModal";

import './DeckPage.css'

const DeckPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { deckId } = useParams();

    const deck = useSelector((state) => state.decks?.one[deckId])
    const currUser = useSelector((state) => state.session?.user)

    const [showCardsListTab, setShowCardsListTab] = useState(true);
    const [showCreateCardsTab, setShowCreateCardsTab] = useState(false);
    // const [hideOverflow, setHideOverflow] = useState("auto");
    const [selected, setSelected] = useState("preview");
    
    useEffect( () => {
        (async () => {
            await dispatch(loadDeck(deckId)).then((res) => {
                if (!res) history.push('/unauthorized')
            })
        })()
    }, [dispatch, deckId, history])

    
    
    if (deck && currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }

    // Only user's who own the deck can access the deck's page:

    return (
        <div className="deck-page-container">
            <DeckHeader deck={deck} />
            <CardsButtons selected={selected} setSelected={setSelected} setShowCardsListTab={setShowCardsListTab} setShowCreateCardsTab={setShowCreateCardsTab} />
            {!showCardsListTab && !showCreateCardsTab &&
                <div className="deck-page-details-tab">
                    <div className="details-about-title-div">
                        <p className="small-header">About</p>
                        <div className="deck-modal-edit">
                        <DeckModal deck={deck} type="edit" deleteDeck={true} />
                        </div>
                    </div>
                    <div className="details-about-info-div">
                        {deck?.about &&
                        <>
                            <pre className="about-pre">{deck?.about}</pre>
                        </>
                        }
                    </div>
                </div>
            }
            {showCardsListTab &&
                <CardsListTab setSelected={setSelected} setShowCardsListTab={setShowCardsListTab} setShowCreateCardsTab={setShowCreateCardsTab} />
            }
            {showCreateCardsTab &&
                <CreateCardsTab />
            }
        </div>
    )
}

export default DeckPage;