import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../Avatar/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteComment } from '../../../actions/post';


const Comment = (props) => {
    const { data, postId } = props;
    const users = useSelector((state) => state.userReducer);
    const commentUser = users.filter((user) => data.userCommented === user._id)[0];
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUserReducer);

    const handleDeleteComment = (e) => {
        e.preventDefault();
        const del = window.confirm("Are you sure to delete the comment");
        if (del) {
            dispatch(deleteComment(postId, data._id));
        }
    }
    return (
        <li >
            {
                commentUser?.profilePhoto ?
                    <Link to={`/users/${data?.userCommented}`}>
                        <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${commentUser.profilePhoto}`} alt="User Profile" />
                    </Link>
                    :
                    <div style={{ marginRight: '15px' }}>
                        <Link to={`/users/${data?.userCommented}`} style={{ textDecoration: 'none', color: 'white' }}>
                            <Avatar py="13px" px="16px" bgColor='#009dff' radius='48%' color='white' >

                                {commentUser?.name.charAt(0).toUpperCase()}

                            </Avatar>
                        </Link>
                    </div>
            }

            <div className="comment-details">
                <h4>{commentUser?.name}</h4>
                <p>{data?.Comment}</p>
                <div style={{ display: 'flex', gap: "15px" }}>
                    <span className='comment-time'>commented {moment(data?.commentedOn).fromNow()}</span>
                    {
                        currentUser?.result._id === data.userCommented &&
                        <span style={{ cursor: 'pointer' }} className='comment-time' onClick={handleDeleteComment}>Delete Comment</span>
                    }
                </div>
            </div>
        </li>
    )
}

export default Comment
