from flask import Blueprint
from app.models import Card, db

bucket_routes = Blueprint('bucket_routes', __name__)

# GET confidence buckets filled with cards

@bucket_routes.route('/decks/<int:deckId>')
def buckets(deckId):
    not_at_all_cards = Card.query.filter(Card.deck_id == deckId and (Card.curr_rating == 0 or Card.curr_rating == 1)).all()
    hard_cards = Card.query.filter(Card.deck_id == deckId and (Card.curr_rating == 2 or Card.curr_rating == 3)).all()
    easy_cards = Card.query.filter(Card.deck_id == deckId and Card.curr_rating == 4).all()
    perfect_cards = Card.query.filter(Card.deck_id == deckId and Card.curr_rating == 5).all()
    # extra_perfect_cards = Card.query.filter(Card.deck_id == deckId and Card.curr_rating == 5 and Card.numFivesInRow == 3).all()
    
    not_at_all = {"name": "not_at_all", "cards": [card.to_dict() for card in not_at_all_cards]}
    hard = {"name": "hard", "cards": [card.to_dict() for card in hard_cards]}
    easy = {"name": "easy", "cards": [card.to_dict() for card in easy_cards]}
    perfect = {"name": "perfect", "cards": [card.to_dict() for card in perfect_cards]}
    # extra_perfect = {"name": "extra_perfect", "cards": [card.to_dict() for card in extra_perfect_cards]}
    
    # ------ ADD extra_perfect to the return!! ------ 
    return {"buckets": [not_at_all, hard, easy, perfect]}