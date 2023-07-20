const express = require('express');
const answer = require('../controllers/Answers');
const route = express.Router();
// const auth = require('../middleware/auth');

route.patch('/post/:id',answer.postAnswer);
route.patch('/delete/:id',answer.deleteAnswer);
module.exports = route;