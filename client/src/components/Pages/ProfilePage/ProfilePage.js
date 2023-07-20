import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';
import { followRequest } from '../../../actions/users';
import { toast } from 'react-toastify';

import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import Avatar from '../../Avatar/Avatar';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';

import './Profile.css'
import ProfileList from './ProfileList';

const ProfilePage = () => {

    const { id } = useParams();
    const users = useSelector((state) => state.userReducer);
    const currentProfile = users?.filter((user) => user._id === id)[0];
    const currentUser = useSelector((state) => state.currentUserReducer);
    const currentUserData = users?.filter((user) => user._id === currentUser?.result?._id)[0];
    const [Switch, setSwitch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleFollow = (e) => {
        e.preventDefault();
        if (currentUser === null) {
            toast.warning("Log in first", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            navigate(`/auth?returnPage=${location.pathname.substring(1)}`);

        }
        else {
            dispatch(followRequest(id, currentUser?.result._id));
        }
    }
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            {currentProfile?.profilePhoto ? <>
                                <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${currentProfile.profilePhoto}`} alt="prifile" className='user-details-img' />
                            </> :
                                <Avatar bgColor={'purple'} color={'white'} fSize={'50px'} px={'40px'} py={'30px'}>{currentProfile?.name?.charAt(0).toUpperCase()}
                                </Avatar>

                            }
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type="submit" onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    {
                        currentUser?.result._id === id ? <></> :
                            currentProfile?.followers.includes(currentUser?.result._id) ?
                                <>
                                    <button className="follow-button-profile following-btn-profile" onClick={handleFollow}>Following</button></>
                                :
                                <><button className="follow-button-profile" onClick={handleFollow}>Follow</button> </>
                    }
                    <>
                        <hr />
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUserData} setSwitch={setSwitch} />
                            ) : (<>
                                <ProfileBio currentProfile={currentProfile} />
                                <ProfileList currentUser={currentUser} currentProfile={currentProfile} />
                                {/* <UserPost currentUser={currentUser} currentProfile={currentProfile}/> */}
                            </>
                            )
                        }
                    </>
                </section>

            </div>
        </div>
    )
}

export default ProfilePage
