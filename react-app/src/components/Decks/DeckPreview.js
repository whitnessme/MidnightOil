import DeckModal from './DeckModal';
import { Link } from 'react-router-dom';
import './DeckPreview.css'

const DeckPreview = ({ deck, idx }) => {

    let imgs = [
        "oil-lamp-2.png",
        "oil-lamp-3.png",
        "oil-lamp-4.png",
        "oil-lamp-5.png",
        "oil-lamp-1.png"
    ]

    let img = imgs[idx % imgs.length]

    return (
        <div className="deck-preview-container">
            <ul className='left-side-preview'>
                <li className='deck-image'>
                    <div>
                        <img alt="oil lamp drawing" src={`../../../../static/${img}`}></img>
                    </div>
                </li>
                <li className='li-info'>
                    <h4>{deck.name}</h4>
                    {/* <p>{deck.about}</p> */}
                </li>
                <li className='li-info'>
                    <p>{deck.size}</p>
                </li>
            </ul>
            <ul className='right-side-preview'>
                <li className='li-button'>
                    <DeckModal deck={deck} type="edit" deleteDeck={false} />
                </li>
                <li className='li-button'>
                    <Link className='deck-details-button' to={`/decks/${deck?.id}`}>
                        <i className="fas fa-chevron-right"></i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default DeckPreview;