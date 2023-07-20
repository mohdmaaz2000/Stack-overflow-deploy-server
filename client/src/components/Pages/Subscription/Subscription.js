import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { orderSubscription } from '../../../actions/subscription'


import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import TermsAndCondition from './TermsAndCondition'
import './Subscription.css'

const Subscription = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUserReducer);
    const [user, setUser] = useState(null);
    const users = useSelector((state) => state.userReducer);

    useEffect(() => {
        setUser(users.filter((u) => u._id === currentUser?.result?._id)[0]);
    }, [users,currentUser]);
    // const user = users.filter((u) => u._id === currentUser?.result?._id)[0];
    const navigate = useNavigate();


    const handleSubscription = (e, planAmount, plantype) => {
        e.preventDefault();
        if (currentUser === null) {
            toast.warning("Login first", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            navigate('/auth?returnPage=subscription');
        }
        else if (user?.plan === 'gold' && plantype === 'silver')  {
            toast.warning("You are already using Gold Subscription",{
                position:toast.POSITION.TOP_CENTER,
                theme:'colored'
            });
        }
        else {
            dispatch(orderSubscription({ amount: planAmount, type: plantype }, currentUser, dispatch, navigate));
        }
    }

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">

                <h1 className='subscription-heading'>Stackoverflow Subscription</h1>
                <div className="subscription-container">
                    <div className="subscription">
                        <div className="subscription-info">
                            <h1 className='subscription-type'>Silver Plan</h1>
                            <div className="subscription-price">&#8377; 99/month</div>
                            <p className='subsciption-para'>With the Silver subscription, you get access to our community of developers and can ask 5 questions per day.</p>
                            <button disabled={user?.plan === 'silver'} className={`subscription-btn ${user?.plan === 'silver' ? 'subscription-disable':''}`} onClick={(e) => { handleSubscription(e, 99, 'silver') }}>{
                                user?.plan === 'silver' ? <>Subscribed</> :
                                    <>Subscribe</>
                            }
                            </button>
                        </div>
                    </div>
                    <div className="subscription">
                        <div className="subscription-info">
                            <h1 className='subscription-type'>Gold plan</h1>
                            <div className="subscription-price">&#8377; 999/month</div>
                            <p className='subsciption-para'>With the Gold subscription, you get access to our community of developers and can ask infinite questions per day.</p>
                            <button disabled={user?.plan === 'gold'} className={`subscription-btn ${user?.plan === 'gold' ? 'subscription-disable' : ''}`} onClick={(e) => {
                                handleSubscription(e, 999, 'gold')
                            }}>{user?.plan === 'gold' ? <>Subscribed</>
                                :
                                <>Subscribe</>
                                }</button>
                        </div>
                    </div>
                </div>
                <TermsAndCondition />
            </div>
        </div>
    )
}

export default Subscription
