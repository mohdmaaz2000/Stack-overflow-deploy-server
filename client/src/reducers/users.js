const userReducer = (states = [], action) => {
    switch (action.type) {
        case 'ALL_USERS':
            return action.payload;

        case 'UPDATE_USER':
            return states.map((state) => state._id === action.payload._id ? action.payload : state)
        case 'UPDATE_PROFILE':
            return states.map((state) => state._id === action.payload._id ? action.payload : state);
        case 'DELETE_PROFILE':
            return states.map((state) => state._id === action.payload._id ? action.payload : state);
        case 'FOLLOW_REQUEST':
            return states.map((state) => state._id === action.payload._id ? action.payload : state);
        default:
            return states;
    }
}

export default userReducer;