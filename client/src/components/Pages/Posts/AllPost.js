import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import '../ProfilePage/UserPost.css'
import './AllPost.css'
import Post from './Post'

const AllPost = () => {

  const User = useSelector((state)=>state.currentUserReducer);
  const users = useSelector((state)=>state.userReducer);
  const userposts = useSelector(state=>state.postReducer);
  const navigate = useNavigate();
  const [posts,setPosts] = useState([]);
  const currentUser = users.filter((user) => user?._id === User?.result._id)[0];

  useEffect(()=>{
    if(User === null)
    {
      setPosts(userposts?.data);
    }
    else{
      setPosts(userposts?.data?.filter((post) =>  currentUser?.followers.includes(post.userPostedId) || currentUser?.following.includes(post.userPostedId) || post.userPostedId === currentUser?._id));
    }
  },[User,userposts,currentUser])

  const handlePost = (e)=>{
    e.preventDefault();
    if(currentUser === null)
    {
      toast.warning("Please Login first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
    });
      navigate('/auth?returnPage=uploadPost');
    }
    else{
      navigate('/uploadPost');
    }
  }
  return (
    <div style={{ marginTop: '60px' }}>

      
        <div className="post-container">

          <div className="post-container-header">
            <div className='upload-post-div'>
              <button onClick={handlePost} className='user-submit-btn'>Upload a post</button>
            </div>
            <h1>Recent Posts</h1>
          </div>
          {
            posts?.length === 0 && <p>No post found. Start following others to see the post</p>
          }
          {
            posts && posts?.map((element) => (
              <Post key={element._id} data={element} />
            ))
          }
        </div>
    </div>
  )
}

export default AllPost

