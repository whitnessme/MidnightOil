import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
import { editACard } from '../../store/cards';
import { loadCard } from '../../store/cards';

const CardForm = ({ setShowModal, cardId }) => {
  const [errors, setErrors] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const card = useSelector((state) => state.cards?.one)
  const deckId = useSelector((state) => state.cards?.one?.deck_id)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCard(cardId))
    }, [dispatch, cardId])

  useEffect(() => {
      if (card) {
          setFront(card.front)
          setBack(card.back)
      }
  }, [])

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const data = await dispatch(editACard(deck.id, {front, back, deck_id: +deckId}))
        if (data.errors) {
            setErrors(data)
        } else {
            setShowModal(false)
        }
    }

    return (
        <>
            <h2 className='modal-header'>Edit Card</h2>
            <form className='create-deck-form' onSubmit={handleSubmit}>
                <div>
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
                <button type='submit'>Continue</button>
            </form>
        </>
    )
}

export default CardForm;