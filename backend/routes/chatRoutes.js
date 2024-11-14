const express = require('express');
const { chatCompletion } = require('../controllers/chatController');

const router = express.Router();

router.post('/', chatCompletion);

module.exports = router;
