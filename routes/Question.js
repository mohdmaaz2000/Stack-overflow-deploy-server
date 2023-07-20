const express = require('express');
const question = require('../controllers/Questions');
const route = express.Router();
// const auth = require('../middleware/auth');

route.post('/Ask',question.askQuestion);
route.get('/getQuestions',question.getAllQuestion);
route.delete('/delete/:id',question.deleteQuestion);
route.patch('/vote/:id',question.updateVote);
module.exports = route;