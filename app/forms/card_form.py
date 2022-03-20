from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from app.models import Card

class CardForm(FlaskForm):
    front = StringField("Front", validators=[DataRequired('Please write something for the front of your card.')])
    back = StringField("Back", validators=[DataRequired('Please write something for the back of your card.')])
    deck_id = IntegerField('Deck Id', validators=[DataRequired()])
    curr_rating = IntegerField("Rating")
  