import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createACard, editACard, loadCard } from '../../store/cards';
import './CreateCardForm.css'

const CreateCardForm = ({cardId, selectedNum, type, deckId, setSelectedId, setShowCreate, setShowEdit}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    // const [rating, setRating] = useState();

    const [saved, setSaved] = useState("Save")

    const card = useSelector((state) => state.cards?.one[cardId])

    const frontRef = useRef();
    useEffect(() => {
        frontRef.current.focus();
    }, [])

    useEffect(() => {
        if(cardId) {
            dispatch(loadCard(cardId))
        }
        }, [dispatch, cardId])
    
        useEffect(() => {
            if (card) {
                setFront(card.front)
                setBack(card.back)
            //   if (card.curr_rating) setRating(card.curr_rating)
          }
        }, [card])

        useEffect(() => {
            if (card) {
                if (card?.front !== front || card?.back !== back) {
                    setSaved("Save")
                }
            }
        }, [front, back, card])        

        const handleSubmit = async (e) => {
        if (type === "create") {
            e?.preventDefault();
            const data = await dispatch(createACard({front, back, deck_id: +deckId}))
            if (data.errors) {
                setErrors(data.errors)
            } else {
                setSelectedId(data.id)
                setShowCreate(false)
                setShowEdit(true)
                setSaved("Saved")
            }
        } else {
            e?.preventDefault();
            const data = await dispatch(editACard(card?.id, {front, back, deck_id: +deckId}))
            if (data.errors) {
                setErrors(data.errors)
            } else {
                setSaved("Saved")
            }
        }
    }

    return (
        <div className="create-card-form-container">
            <div>
                <p className='card-num'>Card {selectedNum}</p>
            <div className='errors-div edit-card-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
            </div>
            <form onSubmit={handleSubmit} className="q-a-cards-container">
                <div className="sides-card q-front">
                <textarea
                    ref={frontRef}
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
                <button id='save-create-button' type='submit'>{saved}</button>
            </form>
        </div>
    )
}

export default CreateCardForm;