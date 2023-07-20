const express = require('express');
const route = express.Router();
const chatbot = require('../controllers/ChatBot');

route.post('/askQuestion',chatbot.askQuestion);
route.patch('/deleteQuestions',chatbot.deleteQuestions);

module.exports = route;