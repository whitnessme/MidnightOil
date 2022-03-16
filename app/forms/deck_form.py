from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField
from wtforms.validators import DataRequired
from app.models import Deck

class DeckForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired('Please enter a name for your deck.')])
    about = TextAreaField('About')
    #share = BooleanField("Share?")
    