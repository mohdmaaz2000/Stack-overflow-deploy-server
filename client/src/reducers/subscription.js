const subscriptionReducer = (state = null ,actions) =>{
    switch (actions.type) {
        case 'ORDER_SUBS':
            return actions.payload;
    
        default:
            return {...state};
    }
}

export default subscriptionReducer;