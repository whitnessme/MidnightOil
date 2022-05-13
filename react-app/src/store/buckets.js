const LOAD_BUCKETS = 'buckets/LOAD_BUCKETS';

const load_all = (buckets) => ({
    type: LOAD_BUCKETS,
    buckets,
});

export const loadConfidenceBuckets = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/buckets/decks/${deckId}`);
    if (res.ok) {
        const buckets = await res.json();
        dispatch(load_all(buckets.buckets));
        return buckets.buckets;
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
        case LOAD_BUCKETS:
            newState = {...state};
            action.buckets.forEach((bucket) => {
                newState[bucket.name] = bucket;
            });
            return newState;
    }
}