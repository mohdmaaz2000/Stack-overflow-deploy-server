import { combineReducers } from "redux";
import authReducer from './auth'
import currentUserReducer from "./currentUser";
import questionReducer from "./question";
import userReducer from "./users";
import chatbotReducer from "./chatbot";
import postReducer from "./post";
import subscriptionReducer from "./subscription";
import verfiySubscriptionReducer from "./verifySubsctiption";

export default combineReducers({
    authReducer,currentUserReducer,questionReducer,userReducer,chatbotReducer,postReducer,subscriptionReducer,verfiySubscriptionReducer
})