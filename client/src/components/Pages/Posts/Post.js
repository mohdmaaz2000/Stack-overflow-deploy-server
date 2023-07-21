import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';


import { deletePost, likePost } from '../../../actions/post';
import Avatar from '../../Avatar/Avatar';
import PostComment from './PostComment';
import like from '../../../assets/like.svg'
import liked from '../../../assets/like-solid.svg'
import comment from '../../../assets/comment-post.svg'
import share from '../../../assets/share.svg'
import deleteImg from '../../../assets/trash-solid.svg'
import './PostComment.css'

const Post = (props) => {
    const { data } = props;
    const users = useSelector((state) => state.userReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const userLiked = data.likes.includes(currentUser?.result?._id);
    const currentProfile = users?.filter((user) => data.userPostedId === user._id)[0];
    const fileUrl = data?.fileContent?.secure_url;
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(props?.showComment === true)
        {
            setShowComment(!showComment);
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps 
    const handleClickRoute = (e) => {
        e.preventDefault();
        setShowComment(!showComment);
    }

    const handleDeletePost = (e) => {
        e.preventDefault();
        const del = window.confirm("Are you sure want to delete the post");
        if (del) {
            dispatch(deletePost(data._id));
        }
    }

    const handleLikePost = (e) => {
        e.preventDefault();
        if (currentUser === null) {
            toast.warning("Login to like the post", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            navigate(`/auth?returnPage=${location.pathname.substring(1)}`);
        }
        else {
            dispatch((likePost(data._id, currentUser?.result._id)));
        }
    }

    const handleShare = () => {
        copy(`${process.env.REACT_APP_CLIENT}` + location.pathname +`/` + data._id);
        toast.success("Link copied to clipboard", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored'
        });
    }
    const divStyle = {
        background: `url('${fileUrl}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    }
    return (
        <>
            <div className="post-container-content">
                <div className="user-post-info">
                    {
                        currentProfile?.profilePhoto ?
                            <>
                                <Link to={`/users/${currentProfile._id}`}>
                                    <img src={currentProfile?.profilePhoto.secure_url} alt="user profile" />
                                </Link>
                            </>
                            :
                            <div className='user-avatar'>
                                <Link to={`/users/${currentProfile?._id}`} style={{ textDecoration: "none" }}>
                                    <Avatar py="16px" px="20px" bgColor='#009dff' radius='48%' color='white' fSize='20px'>
                                        {currentProfile?.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Link>
                            </div>
                    }
                    <div className="user-post-details">
                        <h2>{data?.userPosted}</h2>
                        <p>Posted {moment(data.postedOn).fromNow()}</p>
                    </div>
                </div>
                <div className="post">
                    {data?.content?.length !== 0 &&
                        <p>{data.content}</p>
                    }
                    {
                        data?.fileContent && data?.fileContent?.resource_type === 'image' &&
                        <div className='post-image' style={divStyle} > </div>
                    }
                    {
                        data?.fileContent && data?.fileContent?.resource_type === 'video' &&
                        <div className='post-video'>
                            <video src={data?.fileContent?.secure_url} width="100%" height="100%" controls></video>
                        </div>
                    }
                </div>
                <div className="like-comment" >
                    <div className="like-section" onClick={handleLikePost}>
                        {
                            userLiked === true ?
                                <img src={liked} alt="like" className='like-image-ico' />
                                :
                                <img src={like} alt="like" className='like-image-ico' />
                        }

                        <span>{data?.likes.length}{" "}
                            {
                                data.likes.length <= 1 ? <>like</> : <>likes</>
                            }
                        </span>
                    </div>
                    <div className="comment-section" onClick={handleClickRoute}>
                        <img src={comment} alt="comment" className='like-image-ico' />

                        <span>{data?.comments.length}{" "}
                            {
                                data.comments.length <= 1 ? <>comment</> : <>comments</>
                            }
                        </span>
                    </div>
                    <div className='share-section' onClick={handleShare}>
                        <img src={share} alt="share" className='like-image-ico' />
                        <span>Share</span>

                    </div>
                    <div className='delete-section' onClick={handleDeletePost}>
                        {
                            currentUser?.result?._id === data.userPostedId && <>
                                <img src={deleteImg} alt="Delete" className='delete-image-ico' />
                                <span className='delete-post-btn' >Delete Post</span>
                            </>
                        }
                    </div>
                </div>

                {
                    showComment === true && <PostComment post={data} />
                }
            </div>
            <br />
            <hr />
        </>
    )
}

export default Post
