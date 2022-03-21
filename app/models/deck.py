from .db import db
from datetime import datetime
from sqlalchemy import desc

class Deck(db.Model):
    __tablename__ = 'decks'
    
    id = db.Column(db.Integer, primary_key=True)
    # owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    share = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.Text)
    last_study_date = db.Column(db.Date)
    size = db.Column(db.Integer, default=0)
    points = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    user = db.relationship("User", back_populates="deck", foreign_keys=[user_id])
    # owner = db.relationship("User", back_populates="deck_owner", foreign_keys=[owner_id])
    cards = db.relationship("Card", back_populates="deck", order_by="asc(Card.id)", cascade="all, delete")
    study_sessions = db.relationship("StudySession", back_populates="deck", cascade="all, delete")
    
    def to_dict(self):
        return {
            "id": self.id,
            # "owner_id": self.owner_id,
            "user_id": self.user_id,
            "share": self.share,
            "name": self.name,
            "about": self.about,
            "last_study_date": self.last_study_date,
            "size": self.size,
            "points": self.points,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            # "User": self.user.to_dict(),
            # "Owner": self.owner.to_dict(),
            "Cards": [card.to_dict() for card in self.cards],
            # "Study_Sessions": [session.to_dict() for session in self.study_sessions]
        }