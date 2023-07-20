import * as api from '../api'
import { toast } from 'react-toastify';
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate,returnPage) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch({ type: 'AUTH', data });
            // dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
            navigate(`/auth-verify?email=${authData.email}&returnPage=${returnPage}`);
            toast.success("Verify your email", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const login = (authData, navigate,returnPage) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        } else {
            dispatch({ type: 'AUTH', data });
            // dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
            navigate(`/auth-verify?email=${authData.email}&returnPage=${returnPage}`);
            toast.success("Verify your email", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = (verifyData, navigate,returnPage) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp(verifyData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch({ type: 'VERIFY_EMAIL', data });
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
            if(returnPage === null || returnPage === 'null')
            {
                navigate('/');
            }
            else{
                navigate(`/${returnPage}`);
            }
            toast.success("Logged in Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }

    } catch (error) {
        console.log(error);
    }
}

export const sendMail = (mailData,setOtpSend) => async (dispatch) => {
    try {
        const { data } = await api.sendMail(mailData);
        if (data.error === true) {
            toast.error(data.error, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch({ type: 'SEND_MAIL', payload: data });
            toast.success("Otp send successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            setOtpSend(true);
        }

    } catch (error) {
        console.log(error);
    }
}