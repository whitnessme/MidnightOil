import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import CardEditForm from './CardEditForm';
import { deleteACard } from '../../store/cards'

function CardEditModal({ cardId, card }) {
    const [showModal, setShowModal] = useState(false);
    // const [showOptions, setShowOptions] = useState(false);
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteACard(cardId, card))
      }

    return (
        <>
            <div className='single-card-edit-options-container'>
                <div className='pencil-icon'>
                    <i onClick={() => setShowModal(true)} className="fa-solid fa-pencil"></i>
                </div>
                <div className='delete-deck-button' onClick={handleDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CardEditForm cardId={cardId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}

export default CardEditModal;