const mongoose = require('mongoose');
const posts = require('../models/userpost');
const users = require('../models/auth');
const fs = require('fs');

const getAllPost = async (req, res) => {
    try {
        const allPost = await posts.find({}).sort({ postedOn: -1 });
        res.status(200).json(allPost);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const postData = async (req, res) => {
    const { id: _id } = req.params;
    const { content, userPosted } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }
    const currentuser = await users.findById(_id);
    if (!currentuser) {
        return res.status(404).json({ error: true, message: "Use not found" });
    }
    try {

        const post = new posts({
            userPostedId: _id,
            userPosted,
            content,
            fileContent: req.file
        });

        const postData = await post.save();
        res.status(200).json(postData);;
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }
    try {
        const data = await posts.findByIdAndDelete(_id);
        if (data.fileContent) {
            fs.unlinkSync(`./public/UserPost/${data.fileContent.filename}`);
        }
        return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "internal server error" });
    }
}

const comment = async (req, res) => {
    const { id: _id } = req.params;
    const { userCommented, commentContent } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Post not found" });
    }

    const user = await users.findById(userCommented);
    if (user === null) {
        return res.status(404).json({ error: true, message: "User not found" });
    }

    try {
        const post = await posts.findByIdAndUpdate(_id, { $addToSet: { 'comments': [{ Comment: commentContent, userCommented }] } }, { new: true });
        if (post === null) {
            return res.status(404).json({ error: true, message: "Post deleted by the user" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const deleteComment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Post not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: true, message: "Comment not found" });
    }
    try {

        const post = await posts.findByIdAndUpdate(_id, { $pull: { 'comments': { _id: commentId } } });
        if (post === null) {
            return res.status(404).json({ error: true, message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const likePost = async (req, res) => {
    const { id: _id } = req.params;
    const { userLiked } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Post not found" });
    }

    try {
        const post = await posts.findById(_id);
        if (post === null) {
            return res.status(404).json({ error: true, message: "Post deleted by user user" });
        }
        if (post.likes.includes(userLiked)) {
            await posts.findByIdAndUpdate(_id, { $pull: { 'likes': userLiked } });
        }
        else {
            await posts.findByIdAndUpdate(_id, { $push: { 'likes': userLiked } });
        }
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

module.exports = { postData, getAllPost, deletePost, comment, deleteComment, likePost };