from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length
# from app.models import Card

class CardForm(FlaskForm):
    front = TextAreaField("Front", validators=[DataRequired('Please write something for the front of your card.'), Length(max=500, message="Front text must be less than 500 characters")])
    back = TextAreaField("Back", validators=[DataRequired('Please write something for the back of your card.'), Length(max=500, message="Back text must be less than 500 characters")])
    deck_id = IntegerField('Deck Id', validators=[DataRequired()])
    curr_rating = IntegerField("Rating")
  