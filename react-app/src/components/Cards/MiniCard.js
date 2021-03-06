import './MiniCard.css'

const MiniCard = ({ card }) => {

    return (
        <div className="mini-card">
            <div className='mini-faces top-mini'>
                {card ?
                    <p className='mini-info'>{card?.front}</p>
                    :
                    <p className='mini-info'>New Card</p>
                }
            </div>
            <div className='mini-faces bottom-mini'>
                <p className='mini-info'>{card?.back}</p>
            </div>
        </div>
    )
}

export default MiniCard;