from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def two_words(form, field):
    full_name = field.data
    if len(full_name.split()) < 2:
        raise ValidationError('Full name must have at least two words')

# def validate_passwords(form, field):
#     print(field.data, form.confirm.data)
#     if field.data != form.confirm.data:
#         raise ValidationError('Passwords must match')
    
class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Please enter a username"), Length(min=3, max=40, message="Username must be 3-40 characters long"), username_exists])
    full_name = StringField(
        'full_name', validators=[DataRequired("Please enter your full name"), Length(min=2, max=40, message="Full name must be 2-40 characters long"), two_words])
    email = StringField('email', validators=[DataRequired("Please enter your email address"), Email(granular_message=True), user_exists, Length(max=40, message="Email must be less than 40 characters")])
    password = StringField('password', validators=[DataRequired("Please enter a password"), Length(min=6, max=50, message="Password must be 6-50 characters long"), EqualTo("confirm", message="Passwords must match")])
    confirm = StringField('confirm', validators=[DataRequired("Please confirm password")])
