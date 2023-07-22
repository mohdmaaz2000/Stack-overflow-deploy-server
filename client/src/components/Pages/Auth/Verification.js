import React, { useEffect, useState } from 'react'
import './Auth.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendMail, verifyOtp } from '../../../actions/auth';
import { useDispatch } from 'react-redux';


const Verification = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchEmail = searchParams.get('email');
    const returnPage = searchParams.get('returnPage');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [otpSend, setOtpSend] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [time, setTime] = useState(35);
    const [disablebtn, setDisablebtn] = useState(true);
    const handleVerification = (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error("Incorrect Otp", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch(verifyOtp({ email: searchEmail, userotp: otp }, navigate,returnPage));
        }
    }
    const handleSendMail = (e) => {
        e.preventDefault();
        setClicked(true)
        dispatch(sendMail({ email: searchEmail }, setOtpSend));
        setTime(35);
        setDisablebtn(true)
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
          }, 1000);
      
          // Clear the interval when the time reaches 0
          if (time === 0) {
            clearInterval(timer);
            setDisablebtn(false);
          }
      
          // Clean up the interval when the component unmounts
          return () => clearInterval(timer);
    }, [otpSend,time])
    return (
        <section className='auth-section'>
            <div className='auth-container'>

                <form >
                    <p className="p-email">Verify Your Identity</p>
                    {
                        otpSend === true &&
                        <>
                            <label htmlFor="verification">
                                <h4>Enter otp received </h4>
                                <input type="text" id="verification" name="verification" placeholder='Enter 6 digit otp' onChange={(e) => setOtp(e.target.value)} />
                            </label>
                            <button onClick={handleVerification} type="submit" className="auth-btn">Verify otp</button>
                        </>
                    }
                    {
                        otpSend === true ? <> <p style={{marginBottom:'0px',marginTop:'25px'}}>Resend the otp in {time} seconds</p>
                            <button className={`auth-btn ${disablebtn ? 'auth-disabled' : ''}`} onClick={handleSendMail}>Resend otp</button>
                        </> : <>
                            <p style={{ marginBottom: '0px', marginTop: '24px' }}>Send a verification code to </p><p style={{marginTop:'0px'}}>{searchEmail}</p>
                            <button className={`auth-btn ${clicked ? 'auth-disabled' : ''}`} onClick={handleSendMail} >Send otp</button>
                        </>
                    }
                </form>
            </div>
        </section>
    )
}

export default Verification
