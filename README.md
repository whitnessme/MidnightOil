# MidnightOil

MidnightOil, a loose clone of Anki/Brainscape and based off the phrase "burning the midnight oil", is a flashcard making application with the theme of fantasy/medieval adventures as you progress!

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
