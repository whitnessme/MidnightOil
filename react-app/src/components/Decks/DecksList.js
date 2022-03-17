import DeckPreview from "./DeckPreview"

const DecksList = ({ decks }) => {
    return (
        <div>
            <p>Decks List:</p>
            <div>
                <i class="fa-solid fa-plus"></i>
                <p>Create</p>
            </div>
            {decks?.map((deck) => (
                <DeckPreview key={`deck-${deck.id}`}deck={deck} />
            ))}
        </div>
    )
}

export default DecksList;