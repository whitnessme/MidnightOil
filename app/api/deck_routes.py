from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Deck, db
# import form once done
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
    return {"one_deck": one_deck.to_dict()}

# POST
@deck_routes.route('/', methods=["POST"])
@login_required



# PUT

# DELETE