import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import search from '../../assets/search.svg'
import logo2 from '../../assets/favicon.png'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify'


const Navbar = () => {

  const dispatch = useDispatch();

  let User = useSelector((state) => (state.currentUserReducer));
  const users = useSelector((state) => state.userReducer);
  const [currentProfile, setCurrentProfile] = useState(null);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [searchInp,setSearchInp] = useState('');

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
     // subscribe to window resize event "onComponentDidMount"
     window.addEventListener("resize", handleResizeWindow);
     return () => {
       // unsubscribe "onComponentDestroy"
       window.removeEventListener("resize", handleResizeWindow);
     };
   }, []);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
    dispatch(setCurrentUser(null));
    toast.success("Logged out successfully", {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored'
    });
  }
  useEffect(() => {
    if (User !== null) {
      setCurrentProfile(users?.filter((user) => user._id === User.result._id)[0]);
    }
  }, [User, users]);

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps 

  const handleClick = (e) => {
    e.preventDefault();
    if (User === null) {
      toast.warning("Please Login first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      navigate('/auth?returnPage=chatbot');
    }
    else {
      navigate('/chatbot');
    }
  }

  const handleClickPost = (e) => {
    e.preventDefault();
    if (User === null) {
      toast.warning("Please Login first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      navigate('/auth?returnPage=post');
    }
    else {
      navigate('/post');
    }
  }

  const handleGlobalSearch = (e)=>{
    e.preventDefault();
    navigate(`/Question?search=${searchInp}`)
  }

  return (
    <nav className='main-nav'>
      <div className="navbar">
        <Link to="/" className='nav-item nav-logo'>
          {width > 800 ? (<img src={logo} alt="logo" width={150}/>)
           :
           (<img src={logo2} alt="logo" />)
          }
          
        </Link>
        <Link to="/chatbot" className='nav-item nav-btn' onClick={handleClick}>Chatbot</Link>
        <Link to="/post" className='nav-item nav-btn' onClick={handleClickPost}>Posts</Link>
        <Link to="/people" className='nav-item nav-btn'>People</Link>

        <form onSubmit={handleGlobalSearch}>
          <input type="text" placeholder='Search...' onChange={(e)=>setSearchInp(e.target.value)}/>
          <img src={search} alt="Search" width={18} className='search-icon' />
        </form>

        {User === null ?
          <Link to='/auth' className='nav-item nav-links'>Login</Link>
          :
          <>
            {
              currentProfile?.profilePhoto ? <>
                <Link to={`/users/${User?.result?._id}`} >
                  <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${currentProfile.profilePhoto}`} className='profilePic' alt='img' />
                </Link>
              </> :
                <div className='nav-avatar'>
                  <Avatar py="7px" px="10px" bgColor='#009dff' radius='48%' color='white'><Link to={`/users/${User?.result?._id}`} style={{ textDecoration: 'none', color: 'white' }}>{User?.result?.name.charAt(0).toUpperCase()}</Link></Avatar>
                </div>
            }
            <button className='nav-item nav-links' onClick={handleLogOut}>Log Out</button>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar
