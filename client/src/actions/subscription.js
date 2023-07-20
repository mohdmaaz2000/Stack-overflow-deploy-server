import { toast } from 'react-toastify';
import * as api from '../api';
import { verfiySubscription } from './verifySubscription';
import logo from '../assets/favicon.png'
import { fetchAllUsers } from './users';

export const orderSubscription = (subscriptionDetails,currentUser,myDispatch,navigate) => async (dispatch) => {
    try {
        const { data } = await api.orderSubscription(subscriptionDetails);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else{
            dispatch({type:'ORDER_SUBS',payload:data});
            handleOpenRazorpay(data,subscriptionDetails,currentUser,myDispatch,navigate);
        }
    } catch (error) {
        console.log(error);
    }

}

const handleOpenRazorpay = (data,subscriptionDetails,currentUser,myDispatch,navigate) =>{
    const options = {
        key:process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount:data?.data?.amount,
        currency:data?.data?.currency,
        name:'Stack Overflow',
        description:'Subscribe to Stack-overflow plan',
        image: logo,
        order_id:data?.data?.id,
        handler: function (response){
            myDispatch(verfiySubscription({response,plan:subscriptionDetails?.type,userId:currentUser?.result._id},navigate));
            myDispatch(fetchAllUsers());
        },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
}
