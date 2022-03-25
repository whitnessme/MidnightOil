import DeckModal from './DeckModal';
import { Link, useHistory } from 'react-router-dom';
import './DeckPreview.css'

const DeckPreview = ({ deck, idx }) => {
    const history = useHistory();

    const handleMainClick = () => {
        history.push(`/decks/${deck?.id}`)
    }

    let imgs = [
        "oil-lamp-2.png",
        "oil-lamp-3.png",
        "oil-lamp-4.png",
        "oil-lamp-5.png",
        "oil-lamp-1.png"
    ]

    let img = imgs[idx % imgs.length]

    return (
        <div onClick={handleMainClick} className="deck-preview-container">
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
                    <p>{deck.Cards.length}</p>
                </li>
            </ul>
            <ul className='right-side-preview'>
                <li className='li-button'>
                    <div className='hover-right-li'>
                        <DeckModal deck={deck} type="edit" deleteDeck={false} />
                    </div>
                </li>
                <li className='li-button hover-li'>
                    <div className='info-bubble'>
                        <p>View deck</p>
                        <div className='down-triangle'></div>
                    </div>
                    <Link className='deck-details-button' to={`/decks/${deck?.id}`}>
                        <i className="fas fa-chevron-right"></i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default DeckPreview;