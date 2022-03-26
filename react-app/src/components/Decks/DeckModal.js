import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteADeck } from '../../store/decks';
import DeckForm from './DeckForm';

import './DeckModal.css'

function DeckModal({ type, deck, deleteDeck }) {
  const [showModal, setShowModal] = useState(false);
  // const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteADeck(deck.id, deck))
  }

  const options = (
    <>
    <div className='options-container'>
        <div className='triangle'></div>
        <div onClick={() => setShowModal(true)} className="edit-deck-button">
          <i className="fa-solid fa-pencil bubble-icon"></i>
        </div>
        <div className='delete-deck-button' onClick={handleDelete}>
          <i className="fa-solid fa-trash-can bubble-icon"></i>
        </div>
    </div>
    </>
  )

  return (
    <>
        {type === "create" ?
          <div onClick={() => setShowModal(true)} className="create-deck-button">
            <p id='create-button'>Create</p>
            <i className="fa-solid fa-plus plus-deck"></i>
          </div>
          :
          <>
            {deleteDeck &&
              <div onClick={() => setShowModal(true)} className="edit-deck-button">
                <i className="fa-solid fa-pencil single-pencil"></i>
              </div>
             }
             {!deleteDeck &&
               <>
               <div className='more-options'>
               <i className="fa-solid fa-ellipsis"></i>
               </div>
               {options}
               </>
              }
          </>
            }

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeckForm type={type} deck={deck} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeckModal;