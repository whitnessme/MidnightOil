import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LandingPage.css'

const LandingPage = () => {
    const user = useSelector(state => state.session?.user);

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='landing-page-container'>
            <h2 className='welcome-msg'>Ready to burn some midnight oil?</h2>
        </div>
    )
}

export default LandingPage;