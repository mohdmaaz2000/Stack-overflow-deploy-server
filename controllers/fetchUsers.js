const mongoose = require('mongoose');
const user = require('../models/auth');
const fs = require('fs');

const fetchAllUsers = async (req, res) => {
    try {
        const data = await user.find().select('-password');
        // let userData = [];
        // data.forEach(d => {
        //     userData.push({ _id: d._id, name: d.name, about: d.about, joinedOn: d.joinedOn, tags: d.tags, chatbot: d.chatbot, image: d.profilePhoto,followers:d.followers,following:d.following, })
        // });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}
const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }
    try {
        const updatedData = await user.findByIdAndUpdate(_id, { $set: { "name": name, "about": about, "tags": tags } }, { new: true });
        if (updatedData === null) {
            return res.status(404).json({ error: true, message: "Account not found" });
        }
        const dataToSend = [{ _id: updatedData._id, name: updatedData.name, about: updatedData.about, tags: updatedData.tags, joinedOn: updatedData.joinedOn }];
        res.status(200).json(dataToSend);
    } catch (error) {
        res.status(405).json({ message: "Internal Server error" });
    }

}

const updateProfile = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }

    try {
        const photo = req.file.filename;
        const data = await user.findById(_id);
        if (data === null) {
            return res.status(404).json({ error: true, message: "Account not found" })
        }
        if (data.profilePhoto) {
            fs.unlinkSync(`./public/Profilephoto/${data.profilePhoto}`);
        }
        const updatedata = await user.findByIdAndUpdate(_id, { $set: { 'profilePhoto': photo } }, { new: true });
        return res.status(200).json(updatedata);
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
};

const deleteProfile = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }

    try {
        const CurrUser = await user.findById(_id);
        if (CurrUser === null) {
            return res.status(404).json({ error: true, message: "Account not found" });
        }
        const data = await user.findByIdAndUpdate(_id, { $set: { 'profilePhoto': null } }, { new: true });
        fs.unlinkSync(`./public/Profilephoto/${CurrUser.profilePhoto}`);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server error" });
    }
}

const follow = async (req, res) => {
    const { id: _id } = req.params;
    const { userFollowed } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }
    if (!mongoose.Types.ObjectId.isValid(userFollowed)) {
        return res.status(404).json({ error: true, message: "Not a valid user" });
    }
    if (_id === userFollowed) {
        return res.status(401).json({ error: true, message: "Action not allowed" });
    }
    try {
        const user1 = await user.findById(_id);
        const user2 = await user.findById(userFollowed);
        if (user1 === null) {
            return res.status(404).json({ error: true, message: "Not a valid user" });
        }
        if (user2 === null) {
            return res.status(404).json({ error: true, message: "Not a valid user" });
        }
        if (user1?.followers.includes(userFollowed)) {
            user1.followers = user1.followers.filter((id) => id !== String(userFollowed));
            user2.following = user2.following.filter((id) => id !== String(_id));
        }
        else {
            user1.followers.push(userFollowed);
            user2.following.push(_id);
        }
        await user.findByIdAndUpdate(_id, user1);
        await user.findByIdAndUpdate(userFollowed, user2);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

module.exports = { fetchAllUsers, updateUser, updateProfile, deleteProfile, follow };