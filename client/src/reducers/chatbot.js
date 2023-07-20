const chatbotReducer = (state=[],actions) =>{
    switch (actions.type) {
        case 'ASK_BOT':
            return {...state,data: actions.payload};
        
        case 'DEL_BOT_CON':
            return {...state};
        default:
            return {...state};
    }
}

export default chatbotReducer;