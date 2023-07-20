import React from 'react'
import LeftSidebar from '../../LeftSidebar/LeftSidebar';
import UserPart from './UserPart';
import './User.css';

const Users = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <UserPart />
      </div>
    </div>
  )
}

export default Users
