import * as api from '../api'
import { toast } from 'react-toastify';

export const postNewPost = (userId, postData) => async (dispatch) => {
    try {
        const { data } = await api.newPost(userId, postData,);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch({ type: 'POST_NEW_POST', payload: data });
            dispatch(allPost());
            toast.success("Posted Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const allPost = () => async (dispatch) => {
    try {
        const { data } = await api.allPost();
        dispatch({ type: 'FETCH_ALL_POST', payload: data });

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch({ type: 'DELETE_POST', payload: data });
            dispatch(allPost());
            toast.success("Deleted Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme:'colored'
              });
        }
    } catch (error) {
        console.log(error);
    }
}

export const commentOnPost = (postId, commentData) => async (dispatch) => {
    try {
        const { data } = await api.commentOnPost(postId, commentData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            if (data.message === "Post deleted by the user") {
                dispatch(allPost());
            }
        }
        else {
            dispatch({ type: 'POST_ON_COMMENT', payload: data });
            dispatch(allPost());
            toast.success("Commented Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(postId, commentId);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            if (data.message === "Post not found") {
                dispatch(allPost());
            }
        }
        else {
            dispatch({ type: 'DELETE_COMMENT', payload: data });
            dispatch(allPost());
            toast.success("Comment Deleted Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (postId, userId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId, userId);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            if (data.message === "Post deleted by user user") {
                dispatch(allPost());
            }
        }
        else {
            dispatch({ type: 'LIKE_POST', payload: data });
            dispatch(allPost());
        }
    }
    catch (error) {
        console.log(error);
    }
}