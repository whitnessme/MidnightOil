from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Deck, Card, db
from app.forms.deck_form import DeckForm
from app.api.auth_routes import validation_errors_to_error_messages

deck_routes = Blueprint('deck_routes', __name__)

# GET all decks by user
@deck_routes.route('/all/users/<int:id>')
@login_required
def user_decks(id):
    user_decks = Deck.query.filter(Deck.user_id == id).all()
    return {"user_decks": [deck.to_dict() for deck in user_decks]}

# GET one deck by deck.id
@deck_routes.route('/<int:id>')
@login_required
def one_deck(id):
    one_deck = Deck.query.get(id)
    if one_deck is not None:
        return {"one_deck": one_deck.to_dict()}
    else:
        return {'errors': ['Unauthorized']}, 401
    
@deck_routes.route('/<int:id>/points')
@login_required
def deck_points(id):
    deck = Deck.query.get(id)
    deck_cards = Card.query.filter(Card.deck_id == id).all()
    
    total_points = len(deck_cards) * 5
    current_points = 0
    
    for card in deck_cards:
        current_points += card.curr_rating
        
    proficiency_percent = (current_points / total_points) * 100
    deck.points = proficiency_percent
    db.session.commit()
    return deck.to_dict()
    

# POST
@deck_routes.route('/', methods=["POST"])
@login_required
def create_deck():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        deck = Deck(
            user_id=data['user_id'],
            owner_id=data['owner_id'],
            share=data['share'],
            name=data['name'],
            about=data['about']
        )
        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT
@deck_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_deck(id):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        deck = Deck.query.get(id)
        
        deck.user_id=data['user_id']
        deck.owner_id=data['owner_id']
        deck.share=data['share']
        deck.name=data['name']
        deck.about=data['about']
      
        db.session.commit()
        return deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE
@deck_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_deck(id):
  deck = Deck.query.get(id)
  deleted_deck = deck.to_dict()
  
  db.session.delete(deck)
  db.session.commit()
  
  return deleted_deck

@deck_routes.errorhandler(500)
def internal_server_error(e):
    return {"errors": ["Internal Server Error: Decks"]}, 500