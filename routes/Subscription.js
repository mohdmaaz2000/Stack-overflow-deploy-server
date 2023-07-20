const express = require('express');
const subscription = require('../controllers/Subscription');
const route = express.Router();

route.post('/orders',subscription.orders);
route.post('/verify',subscription.verify);

module.exports = route;