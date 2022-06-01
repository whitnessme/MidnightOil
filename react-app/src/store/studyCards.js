
const LOAD_STUDY_CARDS = 'studyCards/LOAD_STUDY_CARDS';

const load_all = (studyCards) => ({
    type: LOAD_STUDY_CARDS,
    studyCards,
});

export const loadStudyCards = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/studyCards/decks/${deckId}`);
    if (res.ok) {
        const study_cards = await res.json();
        dispatch(load_all(study_cards.study_cards));
        return study_cards.study_cards
    } else {
        const errors = await res.json();
        return errors;
    }
}

// Reducer

let initialState = {};

const studyCardsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_STUDY_CARDS:
            newState = action.studyCards        
            return newState;

        default:
            return state;
    }
}

export default studyCardsReducer;