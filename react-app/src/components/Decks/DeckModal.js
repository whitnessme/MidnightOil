import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeckForm from './DeckForm';

function DeckModal({ type, deck }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        {type === "create" ?
          <div onClick={() => setShowModal(true)} className="create-deck-button">
            <i class="fa-solid fa-plus"></i>
            <p>Create</p>
          </div>
          :
          <div onClick={() => setShowModal(true)} className="edit-deck-button">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
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