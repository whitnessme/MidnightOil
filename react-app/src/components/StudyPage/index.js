import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadDeck } from "../../store/decks";


const StudyPage = () => {
    const dispatch = useDispatch();
    const { deckId, studyId } = useParams();
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

    if (deck && currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }

    return (
        null
    )
}

export default StudyPage;