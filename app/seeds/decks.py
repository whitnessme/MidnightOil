from app.models import db, Deck

def seed_decks():
    hiragana = Deck(user_id=1, owner_id=1, name='Hiragana Basics', about='The Japanese hirgana beginning characters. Only has the basics. Probably best to practice writing the characters before you flip the card', size=46)
    beginner_html = Deck(user_id=1, owner_id=1, name='Beginner HTML', about='Memorize! Memorize!', size=15)
    order_of_operations = Deck(user_id=1, owner_id=1, name='Math Grade 1', about='', size=10)
    
    db.session.add(hiragana)
    db.session.add(beginner_html)
    db.session.add(order_of_operations)
    
    db.session.commit()
    
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()