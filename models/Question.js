const mongoose = require('mongoose');

const {Schema} = mongoose;

const QuestionSchema = new Schema({
    questionTitle:{
        type:String,
        required:"Question must have a title"
    },
    questionBody:{
        type:String,
        required:"Qusetion must have a body"
    },
    questionTags:{
        type:[String],
        required:"Question must have a tags"
    },
    noOfAnswer:{
        type:Number,
        default:0
    },
    upVotes:{
        type:[String],
        default:[]
    },
    downVotes:{
        type:[String],
        default:[]
    },
    userPosted:{
        type:String,
        required:"Question must have a author"
    },
    userId:{
        type:String
    },
    askedOn:{
        type:Date,
        default:Date.now
    },
    answer:[{
        answerBody:String,
        userAnswered:String,
        answeredOn:{type:Date,default:Date.now},
        userId:{type:String}
    }]
});

const question = mongoose.model("Question",QuestionSchema)
module.exports = question;