import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
import { createACard, editACard } from '../../store/cards';
import { loadCard } from '../../store/cards';

const CardForm = ({ setShowModal, cardId }) => {
  const [errors, setErrors] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const card = useSelector((state) => state.cards?.one)
  const deckId = useSelector((state) => state.cards?.one?.deck_id)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCard(cardId))
}, [dispatch, cardId])

  useEffect(() => {
      if (card) {
          setFront(card.front)
          setBack(card.back)
      }
  }, [])

const handleSubmit = async (e) => {
    e?.preventDefault();
    const data = await dispatch(editADeck(deck.id, {front, back, deck_id: +deckId}))
    if (data.errors) {
        setErrors(data)
    } else {
        setShowModal(false)
    }
}