import { Link } from 'react-router-dom';
import './DeckHeader.css'

const DeckHeader = ({ deck }) => {

    return (
        <div className="deck-header-container">
            <div className="back-to-decks-div">
                <div className="back-button-div">
                    <Link className='back-link' to="/dashboard" >
                        <i className="fas fa-chevron-left"></i>
                        <p> Back to all decks</p>
                    </Link>
                </div>
            </div>
            <div className='deck-info-container'>
                <img alt="oil lamp" className='little-icon' src='../../../../static/oil-lamp-3.png'></img>
                <p className='deck-name'>{deck?.name}</p>
                {/* <div className='deck-about-div'>
                    <p>{deck?.about}</p>
                </div> */}
            </div>
        </div>
    )
}

export default DeckHeader;