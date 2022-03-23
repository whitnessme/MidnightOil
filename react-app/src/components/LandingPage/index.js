import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LandingPage.css'

const LandingPage = () => {
    const user = useSelector(state => state.session?.user);

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    const msg = "Ready to burn \nsome midnight oil?"

    return (
        <div className='landing-page-container'>
            <pre className='welcome-msg'>{msg}</pre>
            <h4 className='slogan'>Flashcards for adventurers!</h4>
        </div>
    )
}

export default LandingPage;