from .db import db, environment, SCHEMA, add_prefix_for_prod
from .deck import Deck
from datetime import datetime

class Card(db.Model):
    __tablename__ = 'cards'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), nullable=False)
    front = db.Column(db.Text,  nullable=False)
    back = db.Column(db.Text,  nullable=False)
    seen = db.Column(db.Boolean, nullable=False, default=False)
    curr_rating = db.Column(db.Integer, nullable=False, default=0)
    numFivesInRow = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now)
    
    deck = db.relationship("Deck", back_populates="cards")
    
    def to_dict(self):
        return {
            "id": self.id,
            "deck_id": self.deck_id,
            "front": self.front,
            "back": self.back,
            "seen": self.seen,
            "curr_rating": self.curr_rating,
            "numFivesInRow": self.numFivesInRow,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }