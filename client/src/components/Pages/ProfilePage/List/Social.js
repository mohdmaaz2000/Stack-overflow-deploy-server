import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import PeopleDetails from '../../People/PeopleDetails';
import '../../People/People.css'

const Social = (props) => {
  const { profileId, role } = props;
  let AllUser = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (role === "Followers") {
      setUsers(AllUser.filter((element) => element?.following.includes(profileId)))
    }
    else if (role === "Following") { 
      setUsers(AllUser.filter((element) => element?.followers.includes(profileId)));
    } else {
      setUsers(AllUser.filter((element) => element?.followers.includes(profileId) && element?.following.includes(profileId)))
    }
  }, [role,AllUser,profileId]);

  return (
    <div className="people-container">
      <h1 className="people-heading" style={{fontSize:'1.5em',fontWeight:'400'}}>{role}</h1>

      {
        users?.length === 0 ? <div className='no-user'>No user found</div> :
          users?.map((user) => (
            <PeopleDetails key={user._id} data={user} showCurrentUser={true}/>
          ))
      }

    </div>
  )
}

export default Social
