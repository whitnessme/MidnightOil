const LOAD_DECKS_BY_USER = 'decks/LOAD_DECKS_BY_USER';
const LOAD_DECK = 'decks/LOAD_DECK';
const CREATE_DECK = "decks/CREATE_DECK";
const EDIT_DECK = "decks/EDIT_DECK";
const DELETE_DECK = "decks/DELETE_DECK";


const load_all = (decks) => ({
    type: LOAD_DECKS_BY_USER,
    decks
});

const load_one = (deck) => ({
    type: LOAD_DECK,
    deck
});

const create = (newDeck) => ({
	type: CREATE_DECK,
	newDeck,
});

const edit = (editDeck) => ({
	type: EDIT_DECK,
	editDeck,
});

const remove = (deleteDeck) => ({
	type: DELETE_DECK,
	deleteDeck
});

export const loadUserDecks = (userId) => async (dispatch) => {
    const res = await fetch(`/api/decks/all/users/${userId}`);
    if (res.ok) {
        const decks = await res.json();
        dispatch(load_all(decks.user_decks));
        return decks.user_decks;
    } else {
        const errors = await res.json();
		// console.log(errors.errors);
    }
};

export const loadDeck = (id) => async (dispatch) => {
    const res = await fetch(`/api/decks/${id}`);
    if (res.ok) {
        const deck = await res.json();
        dispatch(load_one(deck.one_deck));
        return deck.one_deck;
    } else {
        const errors = await res.json();
		// console.log(errors.errors);
    }
};

export const createADeck = (deck) => async (dispatch) => {
	const res = await fetch('/api/decks/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(deck),
	});
	if (res.ok) {
		const newDeck = await res.json();
		dispatch(create(newDeck));
		return newDeck;
	} else {
		const errors = await res.json();
		return errors;
	}
};

export const editADeck = (deckId, deck) => async (dispatch) => {
	const res = await fetch(`/api/decks/${deckId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(deck),
	});
	if (res.ok) {
		const editDeck = await res.json();
		dispatch(edit(editDeck));
		return editDeck;
	} else {
		const errors = await res.json();
		return errors;
	}
};

export const deleteADeck = (deckId, deck) => async (dispatch) => {
	const response = await fetch(`/api/decks/${deckId}`, {
		method: 'DELETE',
		body: JSON.stringify(deck),
	});
	if (response.ok) {
		const deleteDeck = await response.json();
		dispatch(remove(deleteDeck));
		return deleteDeck;
	} else {
		const errors = await response.json();
		// console.log(errors.errors);
	}
};

let initialState = {"all":{}, "one":{}};

const decksReducer = (state = initialState, action) => {
	let newState;
    let all;
    let one;
	switch (action.type) {
        case LOAD_DECKS_BY_USER:
            newState = {...state};
            all = {}
            action.decks.forEach((deck) => {
                all[deck.id] = deck;
            });
            newState.all = all;
            return newState;

        case LOAD_DECK:
            newState = {...state};
            one = {}
            one[action.deck.id] = action.deck;
            newState.one = one;
            return newState;
            
        case CREATE_DECK:
            newState = {...state};
            newState.all = { ...state.all, [action.newDeck.id]: action.newDeck };
            newState.one = { [action.newDeck.id]: action.newDeck };
            return newState;

        case EDIT_DECK:
            newState = {...state};
            all = {...state.all};
            one = {...state.one};
            all[action.editDeck.id] = action.editDeck;
            one[action.editDeck.id] = action.editDeck;
            newState.all = all;
            newState.one = one;
            return newState;

        case DELETE_DECK:
            newState = {...state};
            delete newState.all[action.deleteDeck.id];
            delete newState.one[action.deleteDeck.id];
            return newState;

        default:
            return state;
    }
};

export default decksReducer;