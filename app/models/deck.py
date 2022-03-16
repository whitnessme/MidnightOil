from .db import db
from datetime import datetime

class Deck(db.Model):
    __tablename__ = 'decks'
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    share = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.Text)
    last_study_date = db.Column(db.Date)
    size = db.Column(db.Integer, default=0)
    points = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    owner = db.relationship("User", back_populates="decks")
    user = db.relationship("User", back_populates="decks")
    
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
        }