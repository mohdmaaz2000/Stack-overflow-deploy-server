const express = require('express')

const route = express.Router();
const {uploadProfile} = require('../middleware/PostConfig');
const auth = require('../controllers/auth');
const users = require('../controllers/fetchUsers');

route.post('/signup',auth.signup);
route.post('/login',auth.login);
route.post('/resendMail',auth.resendEmail);
route.post('/verifyEmail',auth.verifyEmail);

route.get('/allUsers',users.fetchAllUsers);
route.patch('/updateUser/:id',users.updateUser);
route.patch('/updateProfile/:id',uploadProfile.single('image'),users.updateProfile);
route.patch('/removeProfile/:id',users.deleteProfile);

route.patch('/follow/:id',users.follow);


module.exports = route