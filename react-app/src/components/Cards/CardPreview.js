import { useEffect, useState } from 'react';
import CardEditModal from './CardEditModal'
import './CardPreview.css'

const CardPreview = ({ card, idx }) => {
    const [borderColor, setBorderColor] = useState('#CCCCCC');

    useEffect(() => {
        if (card?.curr_rating) {
            setBorderColor(ratingColors[card.curr_rating])
        }
    }, [card])

    const ratingColors = {
        1: "#CA0081",
        2: "#ffa500",
        3: "#FFDA00",
        4: "#60B024",
        5: "#00A9DB",
    }

    return (
        <div className="single-card-preview large-preview">
            <div className='card-number-preview-container'>
                <p className='card-number-label'>{idx}</p>
            </div>
            <div className='front-back-together' style={{ "borderBottom": `5px solid ${borderColor}`}}>
                <div className="card-front">
                    <p>{card?.front}</p>
                </div>
                <div className="card-back">
                    <p>{card?.back}</p>
                </div>
            </div>
            <CardEditModal cardId={card?.id} />
        </div>
    )
}

export default CardPreview;