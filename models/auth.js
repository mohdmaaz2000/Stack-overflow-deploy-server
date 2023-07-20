const { mongoose } = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    about: { type: String },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now },
    chatbot: [{
        question: String,
        answer: String
    }],
    optForEmail:{
        type:Boolean,
        default:false
    },
    otp: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    profilePhoto: {
        type: String
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    plan:{
        type:String,
        enum:['free','silver','gold'],
        default:'free'
    },
    expirationDate:{
        type: Date
    },
    questionsAskedToday:{
        type:Number,
        default:0
    },
    lastQuestionDate:{
        type:Date
    }
}, { timestamps: true })

const user = mongoose.model("User", userSchema);

setInterval(async () => {
    try {
      const today = new Date();
  
      await user.updateMany(
        { plan: {$in : ['silver','gold']}, expirationDate: { $lt: today } },
        { $set: { plan: 'free' } },{new:true}
      );
    } catch (err) {
      console.error(err);
    }
  },  60* 60 * 1000); 
module.exports = user;