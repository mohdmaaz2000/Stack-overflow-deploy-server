const authReducer = (state = [], actions) => {
    switch (actions.type) {
        case 'AUTH':
            // localStorage.setItem('Profile', JSON.stringify({ ...actions?.data }));
            return { ...state };

        case 'LOGOUT':
            localStorage.removeItem('Profile');
            return { ...state, data: null };

        case 'VERIFY_EMAIL':
            localStorage.setItem('Profile', JSON.stringify({ ...actions?.data }));
            return { ...state, data: actions?.data };

        case 'SEND_MAIL':
            return { ...state };

        default:
            return state;
    }
}

export default authReducer;