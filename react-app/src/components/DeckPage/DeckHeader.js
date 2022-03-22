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
                <img alt="feather in ink jar" className='little-icon' src='https://icon-library.com/images/feather-icon-png/feather-icon-png-15.jpg'></img>
                <p className='deck-name'>{deck?.name}</p>
                {/* <div className='deck-about-div'>
                    <p>{deck?.about}</p>
                </div> */}
            </div>
        </div>
    )
}

export default DeckHeader;