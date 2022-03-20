import DeckModal from './DeckModal';
import { Link } from 'react-router-dom';
import './DeckPreview.css'

const DeckPreview = ({ deck }) => {

    return (
        <div className="deck-preview-container">
            <h4>{deck.name}</h4>
            <ul className='left-side-preview'>
                <li>
                    <p>{deck.about}</p>
                </li>
                <li>
                    <p>{deck.size}</p>
                </li>
            </ul>
            <ul className='right-side-preview'>
                <li>
                    <DeckModal deck={deck} type="edit" />
                </li>
                <li>
                    <Link to={`/decks/${deck?.id}`}>
                        <i className="fas fa-chevron-right"></i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default DeckPreview;