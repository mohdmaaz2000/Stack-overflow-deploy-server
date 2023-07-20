import * as api from '../api';
import { toast } from "react-toastify";
import { fetchAllUsers } from './users';

export const verfiySubscription = (verifyDetails,navigate) => async(dispatch) =>{
    try {
        const {data} = await api.verfiySubscription(verifyDetails);
        if(data.error === true)
        {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else{
            dispatch({type:'VERIFY_SUBS',payload:data});
            dispatch(fetchAllUsers());
            toast.success("Subscription Added",{
                position:toast.POSITION.TOP_CENTER,
                theme:'colored'
            });
            navigate('/');
        }
    } catch (error) {
        console.log(error);
    }
}