import { useState } from "react";
import DeckModal from "./DeckModal";
import DeckPreview from "./DeckPreview"

const DecksList = ({ decks }) => {
    const [showCreateModal, setShowCreateModal] = useState();
    

    return (
        <div>
            <div className="decks-list-header">
                <div className="view-decks-button">
                    <p>Decks</p>
                </div>
                <DeckModal type='create' />
            </div>
            {decks?.map((deck) => (
                <DeckPreview key={`deck-${deck.id}`} deck={deck} />
            ))}
        </div>
    )
}

export default DecksList;