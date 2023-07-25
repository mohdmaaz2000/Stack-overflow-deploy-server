const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const users = require('../models/auth');

dotenv.config();

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

var instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });

const orders = async (req, res) => {
    try {
        const { amount, type } = req.body;
        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                return res.status(500).json({ error: true, message: "Internal Server error" });
            }
            return res.status(200).json({ message: "order created", data: order, type });
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server error" });
    }
}

const updateUserData = async (plan, userId) => {
    let dt = new Date();
    dt.setDate(dt.getDate() + 30);
    await users.findByIdAndUpdate(userId, { $set: { plan, expirationDate: dt,questionsAskedToday:0} });
}

const verify = async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
        const { plan, userId } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id
        let generated_signature = crypto.createHmac('sha256', KEY_SECRET)
            .update(body)
            .digest('hex');
        if (generated_signature == razorpay_signature) {
            updateUserData(plan, userId);
            return res.status(200).json({ message: "Subscription added" });
        }
        else {
            return res.status(401).json({ error: true, message: "Payment id does not match" });
        }
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }

}

module.exports = { orders, verify };