const express = require('express');
const post = require('../controllers/Post');


const route = express.Router();

route.post('/post/:id',post.postData);
route.get('/allPost',post.getAllPost);
route.delete('/deletePost/:id',post.deletePost);
route.patch('/comment/:id',post.comment);
route.patch('/deleteComment/:id',post.deleteComment);
route.patch('/like/:id',post.likePost);

module.exports = route;