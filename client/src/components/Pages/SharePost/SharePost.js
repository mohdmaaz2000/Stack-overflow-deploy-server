import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import '../ProfilePage//UserPost.css'
import '../Posts/AllPost.css'
import Post from '../Posts/Post';

const SharePost = () => {
    const id = useParams().id;
    const userposts = useSelector(state => state.postReducer);
    const post = userposts?.data?.filter((data) => data._id === id)[0];


    return (
        <div style={{ marginTop: '60px' }}>
            {
                post ? <div className="post-container">
                    <div className="post-container-header">
                        <h1>Shared Post</h1>
                    </div>
                    <Post data={post} showComment={true}/>
                </div>
                    :
                    <div className="post-container">
                        <h2  style={{textAlign:'center'}}>Post not found</h2>
                    </div>
            }
        </div>
    )
}

export default SharePost
