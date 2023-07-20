const users = require('../models/auth');
const mongoose = require('mongoose');
const openai = require('./AIConfig');

const askQuestion = async (req, res) => {
    const { userId, question } = req.body;
    if(!mongoose.Types.ObjectId.isValid(userId))
    {
        return res.status(404).json({message:"User not found"});
    }
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 2048,
            temperature: 1
        });
        const answer = response.data.choices[0].text;
        const finalAnswer = answer.replace(/^\n+/, "")
        const updatedData = await users.findByIdAndUpdate(userId,{$addToSet:{'chatbot':[{question:question,answer:finalAnswer}]}},{new:true});
        return res.status(200).json(updatedData);

    } catch (err) {
        return res.status(409).json({ message: "Internal server error" });
    }
}
const deleteQuestions = async(req,res)=>{
    const {userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(userId))
    {
        return res.status(404).json({message:"User not found"});
    }

    try {
        await users.findByIdAndUpdate(userId,{$set:{'chatbot' : []}});
        res.status(200).json({message:"Messages cleared"});
    } catch (error) {
        res.status(409).json({message:"Internal server error"});
    }
}

module.exports = { askQuestion ,deleteQuestions};