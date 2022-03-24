import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createACard, editACard, loadCard } from '../../store/cards';
import './CreateCardForm.css'

const CreateCardForm = ({cardId, selectedNum, type, deckId}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [rating, setRating] = useState();

    const card = useSelector((state) => state.cards?.one[cardId])
  
    useEffect(() => {
        if(cardId) {
            dispatch(loadCard(cardId))
        }
        }, [dispatch, cardId])
    
      useEffect(() => {
          if (card) {
              setFront(card.front)
              setBack(card.back)
              if (card.curr_rating) setRating(card.curr_rating)
          }
        }, [card])

    const handleSubmit = async (e) => {
        if (type === "create") {
            e?.preventDefault();
            const data = await dispatch(createACard({front, back, deck_id: +deckId}))
            if (data.errors) {
                setErrors(data.errors)
            } 
        } else {
            e?.preventDefault();
            const data = await dispatch(editACard(card?.id, {front, back, deck_id: +deckId}))
            if (data.errors) {
              setErrors(data.errors)
            }
        }
    }

    return (
        <div className="create-card-form-container">
            <div>
                <p>Card {selectedNum}</p>
            </div>
            <form onSubmit={handleSubmit} className="q-a-cards-container">
                <div className="sides-card q-front">
                <textarea
                    id="front-textarea"
                    placeholder='Start typing here'
                    type='text'
                    name='front'
                    onChange={(e) => setFront(e.target.value)}
                    value={front}
                    ></textarea>
                </div>
                <div className="sides-card q-back">
                    <textarea
                        id="back-textarea"
                        placeholder='Start typing here'
                        type='text'
                        name='back'
                        onChange={(e) => setBack(e.target.value)}
                        value={back}
                    ></textarea>
                </div>
                <button id='save-create-button' type='submit'>Save</button>
            </form>
        </div>
    )
}

export default CreateCardForm;