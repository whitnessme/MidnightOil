import './DeckPreview.css'

const DeckPreview = ({ deck }) => {
    return (
        <div className="deck-preview-container">
            <h4>{deck.name}</h4>
            <ul>
                <li>
                    <p>{deck.about}</p>
                </li>
                <li>
                    <p>{deck.size}</p>
                </li>
            </ul>
        </div>
    )
}

export default DeckPreview;