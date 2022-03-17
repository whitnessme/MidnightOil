import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className='landing-page-container'>
            <h2 className='welcome-msg'>Ready to burn some midnight oil?</h2>
        </div>
    )
}

export default LandingPage;