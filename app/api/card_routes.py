from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Card, db
from app.forms.card_form import CardForm
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy import desc

card_routes = Blueprint('card_routes', __name__)

# GET all cards by deck
@card_routes.route('/all/decks/<int:id>')
@login_required
def deck_cards(id):
    deck_cards = Card.query.filter(Card.deck_id == id).all()
    return {"deck_cards": [card.to_dict() for card in deck_cards]}

# GET one card by card.id
@card_routes.route('/<int:id>')
@login_required
def one_card(id):
    one_card = Card.query.get(id)
    return {"one_card": one_card.to_dict()}

# POST
@card_routes.route('/', methods=["POST"])
@login_required
def create_card():
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        card = card(
            deck_id=data['deck_id'],
            front=data['front'],
            back=data['back'],
            curr_rating=""
        )
        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT
@card_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_card(id):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        card = Card.query.get(id)
        
        card.deck_id=data['deck_id']
        card.front=data['front']
        card.back=data['back']
        card.curr_rating=data["curr_rating"]
      
        db.session.commit()
        return card.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE
@card_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_card(id):
  card = Card.query.get(id)
  deleted_card = card.to_dict()
  
  db.session.delete(card)
  db.session.commit()
  
  return deleted_card