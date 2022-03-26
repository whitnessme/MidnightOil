import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
            <UserBar user={user}/>
            <DecksList decks={decks} />
        </div>
    )
}

export default Dashboard;