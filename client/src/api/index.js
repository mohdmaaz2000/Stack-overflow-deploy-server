import axios from "axios";

const API = axios.create({
    baseURL: '',
    timeout: 1000 * 30,
    validateStatus: (status) => {
        return status >= 200 && status <= 505
    }
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).result.token}`
    }
    return req;
});

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);
export const verifyOtp = (verifyData) => API.post('/user/verifyEmail', verifyData);
export const sendMail = (MailData) => API.post('/user/resendMail',MailData);

export const fetchAllUsers = () => API.get('/user/allUsers');
export const updateUser = (id, userData) => API.patch(`/user/updateUser/${id}`, userData);
export const updateProfile = (id, formData) => API.patch(`/user/updateProfile/${id}`, formData);
export const deleteProfile = (id) => API.patch(`/user/removeProfile/${id}`);
export const followRequest = (id, userFollowed) => API.patch(`/user/follow/${id}`, { userFollowed });

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const allQuestion = () => API.get('/questions/getQuestions');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const updateVote = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId });


export const postAnswer = (id, noOfAnswer, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { id, noOfAnswer, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswer) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswer });


export const askchatbot = (userId, question) => API.post('/chatbot/askQuestion', { userId, question });
export const deletebotQuestion = (userId) => API.patch('/chatbot/deleteQuestions', { userId });


export const newPost = (userId, postData) => API.post(`/posts/post/${userId}`, postData);
export const allPost = () => API.get('/posts/allPost');
export const deletePost = (id) => API.delete(`/posts/deletePost/${id}`);
export const commentOnPost = (postId, commentdata) => API.patch(`/posts/comment/${postId}`, commentdata);
export const deleteComment = (postId, commentId) => API.patch(`/posts/deleteComment/${postId}`, { commentId });
export const likePost = (postId, userId) => API.patch(`/posts/like/${postId}`, { userLiked: userId });

export const orderSubscription = (subscriptionDetals) => API.post('/subscription/orders',subscriptionDetals);
export const verfiySubscription = (verfiyDetails) => API.post('/subscription/verify',verfiyDetails);