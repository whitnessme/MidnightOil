import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadDeck } from "../../store/decks";
import { loadStudyCards } from '../../store/studyCards';
import FlipCard from './FlipCard';
import ProgressBar from './ProgressBar';
import "./StudyPage.css"


const StudyPage = () => {
    const dispatch = useDispatch();
    const { deckId } = useParams();
    const history = useHistory();

    const deck = useSelector((state) => state.decks?.one[deckId])
    const currUser = useSelector((state) => state.session?.user)

    useEffect( () => {
        (async () => {
            await dispatch(loadDeck(deckId)).then((res) => {
                if (res.errors) history.push('/unauthorized')
            })
        })()
    }, [dispatch, deckId, history])

    useEffect(() => {
        (async () => {
            await dispatch(loadStudyCards(deckId)).then((res) => {
                if (res.errors) console.log(res)
            })
        })()
    })

    if (deck && currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }

    return (
        <div className='study-page-div'>
            <ProgressBar />
            <FlipCard />
        </div>
    )
}

export default StudyPage;