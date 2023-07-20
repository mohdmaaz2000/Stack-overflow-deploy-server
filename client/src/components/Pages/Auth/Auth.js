import React, { useState } from 'react'
import './Auth.css'
import logo from '../../../assets/favicon.png'
import AboutAuth from './AboutAuth'
import { login, signup } from '../../../actions/auth'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Auth = () => {

  const [isSignup, setIsSighnup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [optin,setOptin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const returnPage = searchParams.get('returnPage');

  const handleClick = () => {
    setIsSighnup(!isSignup);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      toast.warning("Enter email and password", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      return;
    }
    if (isSignup) {
      if (!name) {
        toast.warning("Enter the name", {
          position: toast.POSITION.TOP_CENTER,
          theme:'colored'
        });
      }
      else {
        // navigate(`/auth-verify?email=${email}`);
        dispatch(signup({ name, email, password,optin }, navigate,returnPage));
      }

    }
    else {
      // navigate(`/auth-verify?email=${email}`);
      dispatch(login({ email, password }, navigate,returnPage));
    }
  }
  return (
    <section className='auth-section'>
      {isSignup && <AboutAuth />}
      <div className="auth-container">
        {!isSignup && <img src={logo} alt='stack overflow' className='login-logo' width={30} />}

        <form onSubmit={handleSubmit}>
          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type='text' placeholder='Enter your name' id='name' name='name' onChange={(e) => setName(e.target.value)} />
              </label>
            )
          }
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" placeholder='Enter your email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>Password</h4>
              {!isSignup && <p style={{ color: '#007ac6', fontSize: '13px' }}>Forgot Password?</p>}
            </div>
            <input type="password" placeholder='Enter your password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} />
          </label>
          {
            isSignup && (
              <p style={{ color: '#666767', fontSize: '13px' }}>
                Password must contain atleast eight <br />
                character including atleast 1 letter and 1 <br />
                number
              </p>
            )
          }
          {
            isSignup &&
            (
              <label htmlFor='check' className='checkflex'>
                <input type="checkbox" id='check' name='check' onChange={()=>setOptin(!optin)}/>
                <p style={{ color: '#666767', fontSize: '13px' }}>Opt-in to recieve occasional, <br />product updates, user research invitations, <br />
                  company announcement and digest</p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{!isSignup ? "Login" : "Signup"}</button>
        </form>
        {
          isSignup && (
            <p style={{ color: '#666767', fontSize: '13px' }}>
              By clicking "Sign up" you agree to our
              <span style={{ color: '#007ac6' }}> terms of <br /> service</span>,
              <span style={{ color: '#007ac6' }}> privacy policy </span> and
              <span style={{ color: '#007ac6' }}> cookie policy</span>
            </p>
          )
        }
        <p>
          {isSignup ? "Already have an account" : "Don't have an acount"}
          <button type='button' onClick={handleClick} className='handle-switch-btn'>{isSignup ? "Login" : "Signup"}</button>
        </p>

      </div>

    </section>
  )
}

export default Auth
