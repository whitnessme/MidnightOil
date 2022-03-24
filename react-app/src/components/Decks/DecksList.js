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
            {decks?.map((deck, i) => (
                <DeckPreview key={`deck-${deck.id}`} idx={i} deck={deck} />
            ))}
        </div>
    )
}

export default DecksList;