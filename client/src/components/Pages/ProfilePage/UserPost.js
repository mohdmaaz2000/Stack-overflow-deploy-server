import React from 'react'
import './UserPost.css'
import Post from '../Posts/Post';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserPost = (props) => {

    const { currentUser, currentProfile } = props;
    const navigate = useNavigate();
    const userposts = useSelector((state) => state.postReducer);
    const posts = userposts?.data?.filter((post) => post?.userPostedId === currentProfile?._id);
    const handlePost = (e) => {
        e.preventDefault();
        navigate('/uploadPost');
    }

    return (
        <>
            <div className="post-container">
                <div className="post-container-header">
                    <>{currentUser?.result?._id === currentProfile?._id ?
                        (<>
                            <div className='upload-post-div'>
                                <button onClick={handlePost} className='user-submit-btn'>Upload a post</button>
                            </div>
                            <h1 style={{fontWeight:'400'}}>Your Posts</h1>
                        </>) :
                        (<h1 style={{fontWeight:'400'}}>{currentProfile?.name} Posts</h1>)
                    }</>
                    {
                        posts?.length === 0 && (<div style={{fontSize:'17px',textAlign:'left'}}>No post found</div>)
                    }
                </div>
                {
                    posts?.map((element) => (
                        <Post key={element._id} data={element} />
                    ))
                }
            </div>
        </>
    )
}

export default UserPost
