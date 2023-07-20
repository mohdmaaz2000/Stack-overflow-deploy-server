const mongoose = require('mongoose');
const question = require('../models/Question');
const users = require('../models/auth');

const askQuestion = async (req, res) => {
    const questionData = req.body;
    const { userId } = req.body
    try {
        var user = await users.findById(userId)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let userLastQuestionDate = user.lastQuestionDate;
        if (!userLastQuestionDate) {
            userLastQuestionDate = currentDate;
        }
        userLastQuestionDate.setHours(0, 0, 0, 0);


        if (currentDate.getTime() !== userLastQuestionDate.getTime()) {
            user = await users.findByIdAndUpdate(userId, { $set: { questionsAskedToday: 0, lastQuestionDate: currentDate } }, { new: true });
        }
        if (user.plan === 'silver' && user.questionsAskedToday >= 5) {
            return res.status(401).json({ error: true, message: "Question limit reached" });
        }
        else if (user.plan === 'free' && user.questionsAskedToday >= 1) {
            return res.status(401).json({ error: true, message: "Question limit reached" });
        }
        uploadQuestion(questionData, userId, currentDate);
        res.status(200).json({ message: "Question posted successfully" });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const uploadQuestion = async (questionData, userId, currentDate) => {
    const postQuestion = new question({ ...questionData });
    await postQuestion.save();
    await users.findByIdAndUpdate(userId, { $set: { lastQuestionDate: currentDate }, $inc: { questionsAskedToday: 1 } });
}

const getAllQuestion = async (req, res) => {
    try {
        const questions = await question.find();
        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Question not found" });
    }

    try {
        await question.findByIdAndDelete(_id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const updateVote = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: true, message: "Question not found" });
    }

    try {
        const Question = await question.findById(_id);
        if (Question === null) {
            return res.status(404).json({ error: true, message: "Question deleted by the user" });
        }

        var upIndex = -1;
        var downIndex = -1;
        if (Question.upVotes.length !== 0) {
            upIndex = Question.upVotes.findIndex((id) => id === String(userId));

        }
        if (Question.downVotes.length !== 0) {
            downIndex = Question.downVotes.findIndex((id) => id === String(userId));
        }

        if (value === 'upVote') {
            if (downIndex !== -1) {
                Question.downVotes = Question.downVotes.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                Question.upVotes.push(userId);
            }
            else {
                Question.upVotes = Question.downVotes.filter((id) => id !== String(userId));
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1) {
                Question.upVotes = Question.upVotes.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                Question.downVotes.push(userId);
            }
            else {
                Question.downVotes = Question.downVotes.filter((id) => id !== String(userId));
            }
        }
        await question.findByIdAndUpdate(_id, Question);
        res.status(200).json({ message: "Voted Successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

module.exports = { askQuestion, getAllQuestion, deleteQuestion, updateVote };