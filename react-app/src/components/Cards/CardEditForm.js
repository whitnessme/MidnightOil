import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
import { editACard } from '../../store/cards';
import { loadCard } from '../../store/cards';

import './CardEditForm.css'

const CardEditForm = ({ setShowModal, cardId }) => {
  const [errors, setErrors] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [rating, setRating] = useState();

  const card = useSelector((state) => state.cards?.one[cardId])
  const deckId = useSelector((state) => state.cards?.one[cardId]?.deck_id)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCard(cardId))
    }, [dispatch, cardId])

  useEffect(() => {
      if (card) {
          setFront(card.front)
          setBack(card.back)
          if (card.curr_rating) setRating(card.curr_rating)
      }
    }, [card])
    

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const data = await dispatch(editACard(card?.id, {front, back, curr_rating: rating, deck_id: +deckId}))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowModal(false)
        }
    }

    return (
        <>
            <h2 className='modal-header'>Edit Card</h2>
            <form className='create-deck-form' onSubmit={handleSubmit}>
                <div className='errors-div'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>

                <div className='input-label-div'>
                    <label>Front</label>
                    <textarea
                    type='text'
                    name='front'
                    onChange={(e) => setFront(e.target.value)}
                    value={front}
                    ></textarea>
                </div>
                <div className='input-label-div'>
                    <label>Back</label>
                    <textarea
                    type='text'
                    name='back'
                    onChange={(e) => setBack(e.target.value)}
                    value={back}
                    ></textarea>
                </div>
                <div className='input-label-div select-div'>
                    <label>Set Confidence Level</label>
                    <ul name="rating" className='select-confidence-ul'>
                        <li className={(rating === 1 ? " selected-rating" : '') + ' rating-option rating-1' } onClick={() => setRating(1)}>1</li>
                        <li className={(rating === 2 ? " selected-rating" : '') + ' rating-option rating-2' } onClick={() => setRating(2)}>2</li>
                        <li className={(rating === 3 ? " selected-rating" : '') + ' rating-option rating-3' } onClick={() => setRating(3)}>3</li>
                        <li className={(rating === 4 ? " selected-rating" : '') + ' rating-option rating-4' } onClick={() => setRating(4)}>4</li>
                        <li className={(rating === 5 ? " selected-rating" : '') + ' rating-option rating-5' } onClick={() => setRating(5)}>5</li>
                    </ul>
                </div>
                <div className='button-container'>
                    <button className="dark-buttons" type='submit'>Continue</button>
                </div>
            </form>
        </>
    )
}

export default CardEditForm;