from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from app.models import Deck

class DeckForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired('Please enter a name for your deck.')])
    about = TextAreaField("About")
    user_id = IntegerField('User Id', validators=[DataRequired()])
    #share = BooleanField("Share?")
    