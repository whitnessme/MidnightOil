from flask import Blueprint
from app.models import Card, db
from vose_sampler import VoseAlias

study_session_routes = Blueprint('study_session_routes', __name__)

# Create Session when first clicked -- Grab random 
