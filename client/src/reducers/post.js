const postReducer = (state = [],action)=>{
    switch(action.type)
    {
        case 'POST_NEW_POST':
            return action.payload;
        case 'FETCH_ALL_POST':
            return {...state,data:action.payload};
        case 'DELETE_POST':
            return {...state};
        case 'POST_ON_COMMENT':
            return {...state};
        case 'DELETE_COMMENT':
            return {...state};
        case 'LIKE_POST':
            return {...state};
        default:
            return state;
    }
}

export default postReducer;