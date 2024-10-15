const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // for working in mongoDB
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // for creating tokens

router.post('/signup', async (req, res) => {
    res.json({ mssg: "POST a new user" });
});

router.get('/:id', async (req, res) => {
    res.json({ mssg: "Get a user" });
});

router.post('/signup', async (req, res) => {
    res.json({ mssg: "POST a new user" });
});

router.post('/login', async (req, res) => {
    res.json({ mssg: "Login a user" });
});

router.post('/logout', async (req, res) => {
    res.json({ mssg: "Login a user" });
});


module.exports = router;
