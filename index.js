const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('../api-with-psql-workshop-with-alpine/api');
const { default: axios } = require('axios');

const app = express();

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

//middlewere to make public folder visible
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

API(app, db);

const PORT = process.env.PORT || 2205;

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});