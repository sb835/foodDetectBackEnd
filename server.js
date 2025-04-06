import express from 'express';
import argon2 from 'argon2';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileId from './controllers/profileId.js';
import handleImage from './controllers/image.js';
import handleAnalyze from './controllers/analyze.js';

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         port: 5432,
//         user: 'postgres',
//         password: 'test',
//         database: 'app',
//     },
// });

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'https://sb835.github.io',
        credentials: true,
    })
);

// Returns the info necessary to detect the food from the clarifai API
app.get('/', (req, res) => {
    res.send('Server runs!');
});

app.post('/analyze', (req, res) => {
    handleAnalyze(req, res);
});

app.post('/signin', (req, res) => {
    handleSignIn(req, res, db, argon2);
});

app.post('/register', (req, res) => {
    handleRegister(req, res, db, argon2);
});

app.get('/profile/:id', (req, res) => {
    handleProfileId(req, res, db);
});

app.put('/image', (req, res) => {
    handleImage(req, res, db);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`runs an port ${PORT}`);
});
