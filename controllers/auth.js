const users = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/auth');
const generateOTP = require('./OtpConfig');
const sendMail = require('./EmailConfig');

const signup = async (req, res) => {
    const { name, email, password,optin} = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "User already exist" });

        }
        if (password.length < 8) {
            return res.status(400).json({ error: true, message: "Length of password must be 8" });
        }
        const hashedPass = await bcrypt.hash(password, 12);
        const otp = generateOTP();
        const newUser = await users.create({ name, email, password: hashedPass, otp,optForEmail:optin});

        return res.status(200).json({ result: newUser });

    } catch (error) {
        res.status(500).json({ message: "Error occured" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newOtp = generateOTP();
        const existingUser = await user.findOneAndUpdate({ email }, { $set: { otp: newOtp } }, { new: true });
        if (!existingUser) {
            return res.status(400).json({ error: true, message: "User does not exist" });
        }

        const compare = await bcrypt.compare(password, existingUser.password);
        if (!compare) {
            return res.status(401).json({ error: true, message: "Enter valid credentials" });
        }

        return res.status(200).json({ result: existingUser });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error occured" });
    }
}

const resendEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const newOtp = generateOTP();
        const parameter = {
            to: email,
            OTP: newOtp
        }
        await sendMail(parameter);
        const update = await user.findOneAndUpdate({ email }, { $set: { otp: newOtp } }, { new: true });
        if (update === null) {
            return res.status(404).json({ error: true, message: "User not found" });
        }
        res.status(200).json({ message: "Otp Send successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const verifyEmail = async (req, res) => {
    const { email, userotp } = req.body;
    try {
        const userToverify = await user.findOne({ email });
        if (userToverify === null) {
            return res.status(404).json({ error: true, message: "No user found" });
        }
        const date = new Date();
        if(date - userToverify.updatedAt > 10 * 60 * 1000)
        {
            return res.status(401).json({error:true,message:"Otp expired"});
        }
        if (userToverify.otp === userotp) {
            const existingUser = await user.findOneAndUpdate({ email }, { $set: { verified: true, otp: null } }).select('-password');
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
            return res.status(200).json({ result: existingUser, token });
        }
        else {
            return res.status(300).json({ error: true, message: "Otp does't match" });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

module.exports = { signup, login, resendEmail, verifyEmail };