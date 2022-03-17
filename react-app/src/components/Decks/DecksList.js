import DeckPreview from "./DeckPreview"

const DecksList = ({ decks }) => {
    return (
        <div>
            <div className="decks-list-header">
                <div className="view-decks-button">
                    <p>Decks</p>
                </div>
                <div className="create-deck-button">
                    <i class="fa-solid fa-plus"></i>
                    <p>Create</p>
                </div>
            </div>
            {decks?.map((deck) => (
                <DeckPreview key={`deck-${deck.id}`}deck={deck} />
            ))}
        </div>
    )
}

export default DecksList;