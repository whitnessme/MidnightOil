from app.models import db, Card
from app.seeds.cards_data import order_of_operations_cards, html_cards, hiragana_cards

def seed_cards():
    for card in hiragana_cards:
        x = Card(
                    deck_id=card.get("deck_id"),
                    front=card.get("front"),
                    back=card.get("back")
        )
        db.session.add(x)
    for card in html_cards:
        x = Card(
                    deck_id=card.get("deck_id"),
                    front=card.get("front"),
                    back=card.get("back")
        )
        db.session.add(x)
    for card in order_of_operations_cards:
        x = Card(
                    deck_id=card.get("deck_id"),
                    front=card.get("front"),
                    back=card.get("back")
        )
        db.session.add(x)
    
    db.session.commit()
    
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()