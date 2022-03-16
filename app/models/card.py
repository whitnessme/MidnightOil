from .db import db
from .deck import Deck
from datetime import datetime

class Card(db.Model):
    __tablename__ = 'cards'
    
    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
    front = db.Column(db.Text,  nullable=False)
    back = db.Column(db.Text,  nullable=False)
    seen = db.Column(db.Boolean, nullable=False, default=False)
    curr_rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    deck = db.relationship("Deck", back_populates="cards")
    
    def to_dict(self):
        return {
            "id": self.id,
            "deck_id": self.deck_id,
            "front": self.front,
            "back": self.back,
            "seen": self.seen,
            "curr_rating": self.curr_rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }