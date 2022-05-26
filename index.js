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

//middlewere to make public folder visible
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});

const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://your_username:your_password@localhost:5432/your_db_name',
	max: 30,
	ssl:{ rejectUnauthorized : false}
 };
 
 const db = pgp(config);


// const db = pgp(DATABASE_URL);

API(app, db);

const PORT = process.env.PORT || 2205;

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});