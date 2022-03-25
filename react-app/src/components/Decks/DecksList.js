import { useState } from "react";
import DeckModal from "./DeckModal";
import DeckPreview from "./DeckPreview"

const DecksList = ({ decks }) => {
    const [showCreateModal, setShowCreateModal] = useState();

    return (
        <div>
            <div className="decks-list-header">
                <div className="view-decks-button">
                    <p id="decks-button">Decks</p>
                </div>
                <DeckModal type='create' />
            </div>
            {decks?.length ?
            <>
                {decks?.map((deck, i) => (
                    <DeckPreview key={`deck-${deck.id}`} idx={i} deck={deck} />
                    ))}
            </>
            :
            <div className="no-decks-div">
                <img className="no-decks-img" alt="1840s painting reading by candlelight" src="../../../../static/1840s-petrus-van-schendel-reading-by-candlelight-date-unknown-1.jpg" ></img>
                <p className="no-thing-text">You don't have any decks!</p>
                <p>Press + above to create a deck!</p>
            </div>
            }
        </div>
    )
}

export default DecksList;