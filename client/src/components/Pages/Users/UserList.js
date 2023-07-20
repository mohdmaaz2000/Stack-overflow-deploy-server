import React from 'react'
import { Link } from 'react-router-dom';
import './User.css'

const UserList = (props) => {
    const {user} = props;
  return (
    <Link to={`/users/${user._id}`} className='user-profile-link'>
      {
        user.profilePhoto ? <>
            <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${user.profilePhoto}`} alt="userPic" className='user-profile-link-img'/>
          </>:
        <h3>{user.name.charAt(0).toUpperCase()}</h3>
      }
        <h5>{user.name}</h5>
    </Link>
  )
}

export default UserList
