from flask import Blueprint
from app.models import Card, db
from vose_sampler import VoseAlias

study_cards_routes = Blueprint('study_cards_routes', __name__)

# GET confidence buckets filled with cards

@study_cards_routes.route('/decks/<int:deckId>')
def study_cards(deckId):
    not_at_all_cards = Card.query.filter(Card.deck_id == deckId and (Card.curr_rating == 0 or Card.curr_rating == 1)).all()
    hard_cards = Card.query.filter(Card.deck_id == deckId and (Card.curr_rating == 2 or Card.curr_rating == 3)).all()
    easy_cards = Card.query.filter(Card.deck_id == deckId and Card.curr_rating == 4).all()
    perfect_cards = Card.query.filter(Card.deck_id == deckId and Card.curr_rating == 5).all()
    extra_perfect_cards = Card.query.filter(Card.deck_id == deckId and Card.curr_rating == 5 and Card.numFivesInRow == 3).all()
    
    d_not_at_all = {card: 0.55 for card in not_at_all_cards}
    d_hard = {card: 0.23 for card in hard_cards}
    d_easy = {card: 0.15 for card in easy_cards}
    d_perfect = {card: 0.05 for card in perfect_cards}
    d_extra_perfect = {card: 0.05 for card in extra_perfect_cards}
    
    d = {**d_not_at_all, **d_hard, **d_easy, **d_perfect, **d_extra_perfect}
    
    va = VoseAlias(d)
    
    study_cards = set()
    
    while len(study_cards) < 10:
        study_cards.add(va.sample_n(size=1))

    return study_cards
    
    # not_at_all = {"name": "not_at_all", "cards": [card.to_dict() for card in not_at_all_cards]}
    # hard = {"name": "hard", "cards": [card.to_dict() for card in hard_cards]}
    # easy = {"name": "easy", "cards": [card.to_dict() for card in easy_cards]}
    # perfect = {"name": "perfect", "cards": [card.to_dict() for card in perfect_cards]}
    # extra_perfect = {"name": "extra_perfect", "cards": [card.to_dict() for card in extra_perfect_cards]}
    
    # ------ ADD extra_perfect to the return!! ------ 
    # return {"buckets": [not_at_all, hard, easy, perfect]}