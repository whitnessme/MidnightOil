import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadDeck } from "../../store/decks";

const DeckPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { deckId } = useParams();

    const deck = useSelector((state) => state.decks?.one[deckId])
    const currUser = useSelector((state) => state.session?.user)
    // console.log(deck, currUser)
    
    useEffect( async () => {
        await dispatch(loadDeck(deckId))
    }, [])
    
    if (currUser?.id !== deck?.user_id) {
        history.push('/unauthorized')
    }
    // Only user's who own the deck can access the deck's page:

    return (
        <h1>Deck Page!</h1>
    )
}

export default DeckPage;