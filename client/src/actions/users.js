import * as api from '../api'
import { toast } from 'react-toastify';

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers();
        dispatch({ type: 'ALL_USERS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, userData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, userData);
        if (data.error) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            if (data.message === "Account not found") {
                navigate('/');
            }
        }
        else {
            dispatch({ type: 'UPDATE_USER', payload: data });
            dispatch(fetchAllUsers());
            toast.success("Profile updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
              });
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (id, formData,navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, formData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
              });
              if(data.message === "Account not found")
              {
                navigate('/');
              }
        }
        else {
            dispatch({ type: 'UPDATE_PROFILE', payload: data });
            dispatch(fetchAllUsers());
            toast.success("Updated Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
              });
        }

    } catch (error) {
        console.log(error);
    }
}

export const deleteProfile = (id,navigate) => async (dispatch) => {
    try {
        const { data } = await api.deleteProfile(id);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
              });
              if(data.message === "Account not found")
              {
                navigate('/');
              }
        }
        else {
            dispatch({ type: 'DELETE_PROFILE', payload: data });
            dispatch(fetchAllUsers());
            toast.success("Deleted Profile photo", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
              });
        }
    } catch (error) {
        console.log(error);
    }
}

export const followRequest = (id,userFollowed) => async(dispatch)=>{
    try {
        const {data} = await api.followRequest(id,userFollowed);
        if(data.error === true)
        {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
              });
        }
        else{
            dispatch({type:'FOLLOW_REQUEST',payload:data});
            dispatch(fetchAllUsers());
        }
    } catch (error) {
        console.log(error);
    }
}