const LOAD_STUDY_CARDS = 'buckets/LOAD_STUDY_CARDS';

const load_all = (buckets) => ({
    type: LOAD_STUDY_CARDS,
    buckets,
});

export const loadStudyCards = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/buckets/decks/${deckId}`);
    if (res.ok) {
        const study_cards = await res.json();
        dispatch(load_all(study_cards));
        return study_cards
    } else {
        const errors = await res.json();
        return errors;
    }
}

// Reducer

let initialState = {};

const bucketReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_STUDY_CARDS:
            newState = {...state};
            action.buckets.forEach((bucket) => {
                newState[bucket.name] = bucket;
            });
            return newState;
    }
}