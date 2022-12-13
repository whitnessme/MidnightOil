# from .db import db
# from .deck import Deck
# from datetime import datetime
# from app.models import Card, db
# from vose_sampler import VoseAlias


# class StudySession(db.Model):
#     __tablename__ = 'study_sessions'
    
#     id = db.Column(db.Integer, primary_key=True)
#     deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
#     card_one = db.Column(db.Integer, default=0)
#     card_two = db.Column(db.Integer, default=0)
#     card_three = db.Column(db.Integer, default=0)
#     card_four = db.Column(db.Integer, default=0)
#     card_five = db.Column(db.Integer, default=0)
#     card_six = db.Column(db.Integer, default=0)
#     card_seven = db.Column(db.Integer, default=0)
#     card_eight = db.Column(db.Integer, default=0)
#     card_nine = db.Column(db.Integer, default=0)
#     card_ten = db.Column(db.Integer, default=0)
#     one_count = db.Column(db.Integer, nullable=False, default=0)
#     two_count = db.Column(db.Integer, nullable=False, default=0)
#     three_count = db.Column(db.Integer, nullable=False, default=0)
#     four_count = db.Column(db.Integer, nullable=False, default=0)
#     five_count = db.Column(db.Integer, nullable=False, default=0)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
#     updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

#     deck = db.relationship("Deck", back_populates="study_sessions")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "deck_id": self.deck_id,
#             "card_one": self.one,
#             "card_two": self.two,
#             "card_three": self.three,
#             "card_four": self.four,
#             "card_five": self.five,
#             "card_six": self.six,
#             "card_seven": self.seven,
#             "card_eight": self.eight,
#             "card_nine": self.nine,
#             "card_ten": self.ten,
#             "one_count": self.one_count,
#             "two_count": self.two_count,
#             "three_count": self.three_count,
#             "four_count": self.four_count,
#             "five_count": self.five_count,
#             "created_at": self.created_at,
#             "updated_at": self.updated_at,
#             "Deck": self.deck.to_dict()
#         }
