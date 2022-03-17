import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DecksList from '../Decks/DecksList';
import UserBar from './UserBar';

import { loadUserDecks } from '../../store/decks';

const Dashboard = () => {
    const dispatch = useDispatch()
    const decks = useSelector((state) => state.decks?.all)
    const userId = useSelector((state) => state.session?.user.id)
    console.log(decks)

    useEffect(() => {
        dispatch(loadUserDecks(userId))
    }, [dispatch, userId])

    return (
        <div>
            <h2>Welcome back!</h2>
            <UserBar />
            <DecksList />
        </div>
    )
}

export default Dashboard;