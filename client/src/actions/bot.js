import { toast } from 'react-toastify';
import * as api from '../api';
import {fetchAllUsers} from './users'
export const askchatbot = (userId,question) => async(dispatch) =>{
    try {
        const {data} = await api.askchatbot(userId,question);
        dispatch({type:'ASK_BOT',payload:data});
        dispatch(fetchAllUsers());
    } catch (error) {
        console.log(error)
    }
}

export const deleteConversation = (userId) =>async(dispatch)=>{
    try {
        const {data} = await api.deletebotQuestion(userId);
        dispatch({type:'DEL_BOT_CON',payload:data});
        dispatch(fetchAllUsers());
        toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            theme:'colored'
          });
    } catch (error) {
        console.log(error);
    }
}