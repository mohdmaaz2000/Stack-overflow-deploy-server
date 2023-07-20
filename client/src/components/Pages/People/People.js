import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import search from '../../../assets/search.svg';
import './People.css'
import PeopleDetails from './PeopleDetails';

const People = () => {
    const [searchInp, setSearchInp] = useState('');
    // const currentUser = useSelector((state) => state.currentUserReducer);
    let AllUser = useSelector((state) => state.userReducer);
    // AllUser = AllUser.filter((element) => element._id !== currentUser?.result._id);
    
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        setUsers(AllUser)
    },[AllUser]) // eslint-disable-line react-hooks/exhaustive-deps 

    const handleSearch = (e) => {
        e.preventDefault();
        setUsers(AllUser.filter((element) => element.name.includes(searchInp)));
    }

    return (
        <div className="people-container">
            <h1 className="people-heading">People</h1>
            <form className="people-search" onSubmit={handleSearch}>
                <img src={search} alt="search" width={18} />
                <input type="text" placeholder="Search..." onChange={(e) => setSearchInp(e.target.value)} />
            </form>

            {
                users?.length === 0 ? <div className='no-user'>No user found</div> :
                    users?.map((user) => (
                        <PeopleDetails key={user._id} data={user} />
                    ))
            }

        </div>
    )
}

export default People
