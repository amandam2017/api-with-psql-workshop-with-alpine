const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const pg = require("pg");
const Pool = pg.Pool;

const API = require('../api-with-psql-workshop-with-alpine/api');
const { default: axios } = require("axios");

const app = express();

// added cores
// THE CORES ARE ADDED FOR HEROKU AND THEY ARE USED ON ALL MY ROUTES
const cors = require('cors');
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "https://api-creation-workshop-ma.herokuapp.com/");
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
  });

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
// cores code ends here

//middlewere to make public folder visible
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});

const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://amanda:@262632@localhost:5432/garments_app',
	max: 30,
	ssl:{ rejectUnauthorized : false}
 };
 
 const db = pgp(config);


// const db = pgp(DATABASE_URL);

API(app, db);

// token business starts

const jwt = require('jsonwebtoken');
const adminUser = { username: 'amandam2017' }
// add a login route below:
app.post('/api/login', cors(), function (req, res, next) {

	// get the username using ES6 constructor
	const { username } = req.body;
	console.log(username);
	// const username = req.body.username;

	if (username === adminUser.username) {

		const key = generateAccessToken({username});

		res.json({key})
	}
	else {
		res.json({
			message: 'User not allowed to login',
			status: 401
		})
	}


})

const authanticateToken = (req, res, next) => {
	// inside this function we want to get the token that is generated/sent to us and to verify if this is the correct user.
	const authHeader = req.headers['authorization']
	// console.log({authHeader});
	const token = authHeader && authHeader.split(" ")[1]
	// if theres no token tell me
	if (token === null) return res.sendStatus(401)
	// if there is then verify if its the correct user using id if not return the error
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		// console.log(err);
		if (err) return res.sendStatus(403)
		console.log('show error' + err);

		req.user = user
		console.log(user);
		next()
	})

}

const generateAccessToken = (user) => {
	return jwt.sign(user, 'secretKey', { expiresIn: '24h' });
}

// API routes to be added here
app.get('/api/posts', authanticateToken, function (req, res) {
	res.json({ garmants: garments })
})

const PORT = process.env.PORT || 2205;

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});