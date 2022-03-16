from app.models import db, Deck

def seed_decks():
    hiragana = Deck(owner_id=1, user_id=1, name='Hiragana Basics', about='The Japanese hirgana beginning characters. Only has the basics. Probably best to practice writing the characters before you flip the card', size=46)
    javascript = Deck(owner_id=1, user_id=1, name='Beginner JavaScript Commands', about='Memorize! Memorize!', size=15)
    arithmetic = Deck(owner_id=1, user_id=1, name='Math Grade 1', about='', size=10)
    
    db.session.add(hiragana)
    db.session.add(javascript)
    db.session.add(arithmetic)
    
    db.session.commit()
    
    def undo_pet_types():
        db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
        db.session.commit()