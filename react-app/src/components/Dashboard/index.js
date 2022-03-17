import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DecksList from '../Decks/DecksList';
import UserBar from './UserBar';

import './Dashboard.css'

import { loadUserDecks } from '../../store/decks';

const Dashboard = () => {
    const dispatch = useDispatch()
    const decks = useSelector((state) => Object.values(state.decks?.all))
    const user = useSelector((state) => state.session?.user)

    useEffect(() => {
        dispatch(loadUserDecks(user?.id))
    }, [dispatch, user])

    return (
        <div className='dashboard-container'>
            <h2>Welcome back!</h2>
            <UserBar user={user}/>
            <DecksList decks={decks} />
        </div>
    )
}

export default Dashboard;