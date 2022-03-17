import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from '../auth/SignUpForm';


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='signup'
        onClick={() => setShowModal(true)}>Get Started</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
