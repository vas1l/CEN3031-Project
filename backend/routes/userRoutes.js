const express = require('express');
const router = express.Router();


router.post('/signup', (req, res) => {
    res.json({ mssg: "POST a new user" });
});

router.get('/:id', (req, res) => {
    res.json({ mssg: "Get a user" });
});

router.post('/signup', (req, res) => {
    res.json({ mssg: "POST a new user" });
});

router.post('/login', (req, res) => {
    res.json({ mssg: "Login a user" });
});

router.post('/logout', (req, res) => {
    res.json({ mssg: "Login a user" });
});


module.exports = router;
