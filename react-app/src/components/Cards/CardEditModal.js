import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import CardEditForm from './CardEditForm';

function CardEditModal({ cardId }) {
    const [showModal, setShowModal] = useState(false);
    // const [showOptions, setShowOptions] = useState(false);
    const dispatch = useDispatch()

    return (
        <>
            <div onClick={() => setShowModal(true)} className="edit-card-button">
                <p>Edit</p>
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