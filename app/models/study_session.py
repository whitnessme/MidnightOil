from .db import db

class StudySession(db.Model):
    __tablename__ = 'study_sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)
    round_count = db.Column(db.Integer, nullable=False, default=0)
    flips_count = db.Column(db.Integer, nullable=False, default=0)
    one_count = db.Column(db.Integer, nullable=False, default=0)
    two_count = db.Column(db.Integer, nullable=False, default=0)
    three_count = db.Column(db.Integer, nullable=False, default=0)
    four_count = db.Column(db.Integer, nullable=False, default=0)
    five_count = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    deck = db.relationship("Deck", back_populates="cards")

    def to_dict(self):
        return {
            "id": self.id,
            "deck_id": self.deck_id,
            "round_count": self.round_count,
            "flips_count": self.flips_count,
            "one_count": self.one_count,
            "two_count": self.two_count,
            "three_count": self.three_count,
            "four_count": self.four_count,
            "five_count": self.five_count,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
