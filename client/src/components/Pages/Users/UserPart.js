import React from 'react'
import UserList from './UserList'
import { useSelector } from 'react-redux'


const UserPart = () => {
    const users = useSelector((state) => state.userReducer);
    return (
        <>
            <h1 className="users-h1">Users</h1>
            <div className="user-list-container">
                {
                    users.map((user) => (
                        <UserList user={user} key={user._id} />
                    ))
                }
            </div>
        </>
    )
}

export default UserPart
