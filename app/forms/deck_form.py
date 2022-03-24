from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Deck

def deck_exists(form, field): 
    name = field.data
    decks = Deck.query.filter(Deck.name == name).all()
    for deck in decks:
        if deck.user_id == form.user_id.data:
            raise ValidationError("You already have a deck with this name")
   

class DeckForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired('Please enter a name for your deck.'), Length(min=2, max=50, message="Deck names must be between 2-50 characters")])
    about = TextAreaField("About", validators=[Length(max=1000, message="Deck description must be less than 1000 characters")])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    #share = BooleanField("Share?")
    