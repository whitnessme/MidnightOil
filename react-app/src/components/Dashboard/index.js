import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DecksList from '../Decks/DecksList';
import UserBar from './UserBar';

const Dashboard = () => {
    user = useParams
    return (
        <div>
            <h2>Welcome back!</h2>
            <UserBar />
            <DecksList />
        </div>
    )
}

export default Dashboard;