from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import desc

class Deck(db.Model):
    __tablename__ = 'decks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    share = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String(50), nullable=False)
    about = db.Column(db.Text)
    last_study_date = db.Column(db.Date)
    size = db.Column(db.Integer, default=0)
    points = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now)
    user = db.relationship("User",  foreign_keys=[user_id], back_populates="deck_user")
    owner = db.relationship("User", foreign_keys=[owner_id], back_populates="deck_owner")
    
    cards = db.relationship("Card", back_populates="deck", order_by="asc(Card.id)", cascade="all, delete")
    # study_sessions = db.relationship("StudySession", back_populates="deck", cascade="all, delete")
    
    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "user_id": self.user_id,
            "share": self.share,
            "name": self.name,
            "about": self.about,
            "last_study_date": self.last_study_date,
            "size": self.size,
            "points": self.points,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "Cards": [card.to_dict() for card in self.cards],
        }