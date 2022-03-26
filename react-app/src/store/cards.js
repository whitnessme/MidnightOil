const LOAD_CARDS_BY_USER = "cards/LOAD_CARDS_BY_USER";
const LOAD_CARD = "cards/LOAD_CARD";
const CREATE_CARD = "cards/CREATE_CARD";
const EDIT_CARD = "cards/EDIT_CARD";
const DELETE_CARD = "cards/DELETE_CARD";

const load_all = (cards) => ({
  type: LOAD_CARDS_BY_USER,
  cards,
});

const load_one = (card) => ({
  type: LOAD_CARD,
  card,
});

const create = (newCard) => ({
  type: CREATE_CARD,
  newCard,
});

const edit = (editCard) => ({
  type: EDIT_CARD,
  editCard,
});

const remove = (deleteCard) => ({
  type: DELETE_CARD,
  deleteCard,
});

export const loadDeckCards = (deckId) => async (dispatch) => {
  const res = await fetch(`/api/cards/all/decks/${deckId}`);
  if (res.ok) {
    const cards = await res.json();
    dispatch(load_all(cards.deck_cards));
    return cards.deck_cards;
  } else {
    const errors = await res.json();
    return errors
    // console.log(errors.errors);
  }
};

export const loadCard = (id) => async (dispatch) => {
  const res = await fetch(`/api/cards/${id}`);
  if (res.ok) {
    const card = await res.json();
    dispatch(load_one(card.one_card));
    return card.one_card;
  } else {
    const errors = await res.json();
    return errors
    // console.log(errors.errors);
  }
};

export const createACard = (card) => async (dispatch) => {
  const res = await fetch("/api/cards/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
  if (res.ok) {
    const newCard = await res.json();
    dispatch(create(newCard));
    return newCard;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editACard = (cardId, card) => async (dispatch) => {
  const res = await fetch(`/api/cards/${cardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
  if (res.ok) {
    const editCard = await res.json();
    dispatch(edit(editCard));
    return editCard;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteACard = (cardId, card) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
    body: JSON.stringify(card),
  });
  if (response.ok) {
    const deleteCard = await response.json();
    dispatch(remove(deleteCard));
    return deleteCard;
  } else {
    const errors = await response.json();
    return errors
    // console.log(errors.errors);
  }
};

let initialState = { all: {}, one: {} };

const cardsReducer = (state = initialState, action) => {
  let newState;
  let all;
  let one;
  switch (action.type) {
    case LOAD_CARDS_BY_USER:
      newState = { ...state };
      all = {};
      action.cards.forEach((card) => {
        all[card.id] = card;
      });
      newState.all = all;
      return newState;

    case LOAD_CARD:
      newState = { ...state };
      one = {};
      one[action.card.id] = action.card;
      newState.one = one;
      return newState;

    case CREATE_CARD:
      newState = { ...state };
      newState.all = { ...state.all, [action.newCard.id]: action.newCard };
      newState.one = { [action.newCard.id]: action.newCard };
      return newState;

    case EDIT_CARD:
      newState = { ...state };
      all = { ...state.all };
      one = { ...state.one };
      all[action.editCard.id] = action.editCard;
      one[action.editCard.id] = action.editCard;
      newState.all = all;
      newState.one = one;
      return newState;

    case DELETE_CARD:
      newState = { ...state };
      delete newState.all[action.deleteCard.id];
      delete newState.one[action.deleteCard.id];
      return newState;

    default:
      return state;
  }
};

export default cardsReducer;
