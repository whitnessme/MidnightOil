import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
import { createADeck, editADeck } from '../../store/decks';

const DeckForm = ({ setShowModal, type, deck }) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const userId = useSelector((state) => state.session?.user.id)

  const dispatch = useDispatch();

  useEffect(() => {
      if (deck) {
          setName(deck.name)
          setAbout(deck.about)
      }
  }, [])

  const handleSubmit = async (e) => {
      if (type === "create") {
          e?.preventDefault();
          const data = await dispatch(createADeck({name, about, user_id: +userId}))
          if (data.errors) {
              console.log(errors)
            setErrors(data.errors)
          } else {
              console.log("hello?")
              setShowModal(false)
          }
        } else {
          e?.preventDefault();
          const data = await dispatch(editADeck(deck.id, {name, about, user_id: +userId}))
          if (data.errors) {
              setErrors(data.errors)
          } else {
            setShowModal(false)
        }
      }
  }

    return (
        <>
            <h2 className='modal-header'>{type === "create" ? "Create New Deck" : "Edit Deck"}</h2>
            <form className='create-deck-form' onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='input-label-div'>
                    <label>{type === "create" ? "Enter the name of your new deck:" : "Name:"}</label>
                    <input
                    type='text'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    ></input>
                    <span className='required-icon'>
                        <i className="fa-solid fa-asterisk"></i>
                    </span>
                </div>
                <div className='input-label-div'>
                    <label>{type === "create" ? "Write any details you want here:" : "About:"}</label>
                    <textarea
                    type='text'
                    name='about'
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    ></textarea>
                </div>
                <div className='button-container'>
                <button className="dark-buttons" type='submit'>Continue</button>
                </div>
            </form>
        </>
    )
}

export default DeckForm;