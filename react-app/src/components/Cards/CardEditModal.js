import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';

function CardModal({ type, deck }) {
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
                <CardForm type={type} deck={deck} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}