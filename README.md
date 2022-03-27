# MidnightOil

[MidnightOil](https://burn-midnight-oil.herokuapp.com/), a clone of [Brainscape](https://www.brainscape.com/) and [Anki](https://apps.ankiweb.net/), is based off the phrase "burning the midnight oil", meaning to study late into the night. It is a flashcard making and studying application with the theme of late Renaissance battle adventures as you progress your mastery level of the decks/cards you make (*The study feature itself is still in progress*). The phrase originated in the 1630s, at the very end of the Renaissance and entering a transitioning time into the Modern era, so the app tries to tie in the past with it's graphics--depictions of oil lamps and Baroque-style paintings of reading by candlelight--and with Modern design elements. 

## [Wiki](https://github.com/whitnessme/MidnightOil/wiki) Links

 -  [MVP Feature List](https://github.com/whitnessme/MidnightOil/wiki/MVP-Feature-List)
 - [React Components](https://github.com/whitnessme/MidnightOil/wiki/React-Components)
 - [Database Schema](https://github.com/whitnessme/MidnightOil/wiki/Database-Schema)
 - [User Stories](https://github.com/whitnessme/MidnightOil/wiki/User-Stories)

## Technologies

 - **Backend:** Python, Flask, WTForms
 - **Frontend:** JavaScript, React/Redux, AJAX
 - **Database:** SQLAlchemy
 - **Design and Styling:** HTML/CSS

## Features

 - Landing Page
 ![Landing Page](https://user-images.githubusercontent.com/89945390/160303192-652f894a-7515-427d-8d1e-563e12128bdb.png)
 -----------------------------
 - User Sign-up and Log in
![Login Modal](https://user-images.githubusercontent.com/89945390/160303251-006cfe61-73e8-4436-bb10-45d140cfa5f7.png)
 -----------------------------
 - Decks
     - *Brief walkthrough:*
![dashboard gif](https://user-images.githubusercontent.com/89945390/160302939-ad41b6dd-9728-437b-99cf-b8adc15bacdd.gif)
    - *Screenshots:*
    ![Screenshot 2022-03-27 154915](https://user-images.githubusercontent.com/89945390/160304572-bf099694-9880-40c6-912d-01a11b59534c.png)
    ![Screenshot 2022-03-27 155101](https://user-images.githubusercontent.com/89945390/160304516-9c2838bf-b068-4e30-9d56-95c6fc5584bb.png)
   ![Screenshot 2022-03-27 155007](https://user-images.githubusercontent.com/89945390/160304535-0a837654-0950-4949-b2cd-74dad0443dd1.png) ![Screenshot 2022-03-27 155025](https://user-images.githubusercontent.com/89945390/160304551-b552d68e-485e-47ed-bda8-81f97890c003.png)    
-----------------------------
 - Cards
     - *Brief walkthrough:*
![cards_gif](https://user-images.githubusercontent.com/89945390/160303601-6c84bd3d-867e-49db-83c8-18a87b1865b2.gif)
    - *Screenshots:*
 ![Screenshot 2022-03-27 154447](https://user-images.githubusercontent.com/89945390/160304701-5f8fdef0-edf4-4158-b6b2-7f1a582b37a2.png)
![Screenshot 2022-03-27 154707](https://user-images.githubusercontent.com/89945390/160304646-6fd20ee1-1e7e-414b-900c-e62bde48fb79.png)
![Screenshot 2022-03-27 154643](https://user-images.githubusercontent.com/89945390/160304641-f83db6da-97dc-4b8d-a9c9-47a6044ef58d.png)![Screenshot 2022-03-27 154515](https://user-images.githubusercontent.com/89945390/160304674-d6a294f8-d49e-445b-8db1-802dba8c98b9.png)

-----------------------------
## Future Features
- **Study Sessions**
    -   Users can start a study session that will go through 10 cards, rating how well they did on each card from 1-5.
    -   Users can see their progress bar go up 1/10th with each 2-5 rating, users will redo every 1 rated card in the session.
    -   Users can see the checkpoint/results after finishing the session, how many of each rating they did and the current mastery percentage for the deck.
- **Shared Decks**
    -   Users can see a list of decks made by other users and make a copy of them for their account to study
    -   Users can chose to allow their decks to be shared, either on creation or when editing a deck.


## Install Instructions

 1. Clone this repo
	 - `git clone`
 2. Install dependencies for backend 
	 - `pipenv install`
 3. Install dependencies for frontend
	 - `cd react-app`
	 - `npm install`
 4. Create PostgreSQL user
	 - `CREATE USER midnight_oil_dev WITH CREATEDB PASSWORD '<password>'`
 5. Create PostgreSQL database
	 - `CREATE DATABASE midnight_oil_db WITH OWNER midnight_oil_dev`
6. Create a `.env` file in the root directory based on the `.env.example` file
7. In `.env` file:
	- Replace 'password' in DATABASE_URL with your chosen password
	- Enter a secure combination of characters for you SECRET_KEY
8. Flask Migrate and Seed your database in root directory
	- `pipenv shell`
	- `flask db upgrade` 
	- `flask seed all`
9. Start backend server in root directory
	- `flask run`  
10. Start frontend server in `react-app` directory
	- `npm start`
11. In your browser go to `localhost:3000`
12. You may use the Demo user or create a new user by clicking on the  `Log In` button. Then you can search, look at products, leave reviews, add items to cart, purchase items, etc..
