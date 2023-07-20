import moment from 'moment/moment';
import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { followRequest } from '../../../actions/users';

import Avatar from '../../Avatar/Avatar';

const PeopleDetails = (props) => {
    const { data,showCurrentUser } = props;
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUserReducer);
    const dispatch = useDispatch();
    const location = useLocation();
    const handleRoute = (e) => {
        e.preventDefault();

        if (e.target.tagName.toLowerCase() === 'button') {
            if (currentUser === null) {
                toast.warning("Login first", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
                navigate(`/auth?returnPage=${location.pathname.substring(1)}`);
            }
            else {
                dispatch(followRequest(data?._id, currentUser?.result?._id));
            }
        }
        else {
            navigate(`/users/${data?._id}`)
        }
    }

    const myStyle = {
        display: data._id === currentUser?.result?._id ? 'none':'block'
    }
    return (
        <>
            {
                (showCurrentUser || data._id !== currentUser?.result?._id) &&
                <div className="people-info-container" onClick={handleRoute} >
                    <div className="people-details">
                        {
                            data?.profilePhoto ?
                                <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${data.profilePhoto}`} alt="Friend 1" />
                                :
                                <div style={{ marginRight: '10px' }}>
                                    <Avatar fSize="25px" py="7px" px="10px" bgColor='#009dff' radius='50%' color='white'>{data?.name?.charAt(0).toUpperCase()}</Avatar>
                                </div>
                        }

                        <h3>{data._id === currentUser?.result?._id ?<>You</>:<>{data?.name}</>}</h3>
                    </div>

                    <div className="people-stats">
                        <p>{
                            data?.followers ? <>{data?.followers.length} followers</> :
                                <>0 followers</>
                        }</p>
                        <p>
                            {
                                data?.following ? <>{data?.following.length} following</> :
                                    <>0 following</>
                            }
                        </p>
                    </div>
                    <div className="joining-details">
                        <span>Joined </span><span>{moment(data?.joinedOn).fromNow()}</span>
                    </div>
                    <div className='follow-btn-container'>
                        {
                            data?.followers?.includes(currentUser?.result?._id) ?
                                <button className="follow-button following-btn" >Following</button> :
                                <button className="follow-button" style={myStyle}>Follow</button>
                        }
                    </div>
                </div >
            }
        </>
    )
}

PeopleDetails.propTypes = {
    showCurrentUser: PropTypes.bool,
  };

PeopleDetails.defaultProps = {
    showCurrentUser: false,
  };

export default PeopleDetails
