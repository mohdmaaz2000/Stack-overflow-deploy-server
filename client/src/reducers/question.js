const questionReducer = (state = [], action) => {
    switch (action.type) {
        case 'ASK_QUESTION':
            return { ...state, data: action.payload };

        case 'GET_ALL_QUESTIONS':
            return { ...state, data: action.payload };
        case 'POST_ANSWER':
            return { ...state };
        case 'DELETE_QUESTION':
            return { ...state };
        case 'DELETE_ANSWER':
            return { ...state };
        case 'VOTE':
            return { ...state };
        default:
            return state;
    }
}

export default questionReducer;