from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', full_name="Doug Demodome", email='demo@aa.io', password='password')
    whit = User(
        username='spudders', full_name="Whit Minson", email='whit@aa.io', password='password')
    ty = User(
        username='tykman', full_name="Ty Wilkerson", email='ty@aa.io', password='password')

    db.session.add(demo)
    db.session.add(whit)
    db.session.add(ty)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
