
const verfiySubscriptionReducer = (state=[],actions)=>{
    switch (actions.type) {
        case 'VERIFY_SUBS':
            return actions.payload;
    
        default:
            return {...state};
    }
}

export default verfiySubscriptionReducer