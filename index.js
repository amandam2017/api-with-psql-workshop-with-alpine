const supertest = require('supertest');
const PgPromise = require("pg-promise");
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()
const API = require('../api-with-psql-workshop-with-alpine/api');
const { default: axios } = require('axios');

const app = express();

const {ConnectionString} = require('connection-string');

const { DATABASE_URL } = process.env;
const cs = new ConnectionString(DATABASE_URL);
// console.log(cs);

 
function get_PostgreSQL_connection() {
   return {
       host: cs.hostname,
       port: cs.port,
       database: cs.path?.[0],
       user: cs.user,
       password: cs.password,
       ssl: DATABASE_URL.includes('localhost') ? false : {rejectUnauthorized: false},
       application_name: cs.params?.application_name
   };
}

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
 
const pgp = PgPromise({});
 console.log(get_PostgreSQL_connection());
const db = pgp(get_PostgreSQL_connection());



//middlewere to make public folder visible
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const DATABASE_URL = process.env.DATABASE_URL;
// const pgp = PgPromise({});
// const db = pgp(DATABASE_URL);

API(app, db);

const PORT = process.env.PORT || 2205;

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});