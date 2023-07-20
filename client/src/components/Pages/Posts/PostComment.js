import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


import '../ProfilePage/UserPost.css'
import './PostComment.css'
import Comment from './Comment'
import { useLocation, useNavigate } from 'react-router-dom'
import { commentOnPost } from '../../../actions/post'

const PostComment = (props) => {
    const { post } = props;
    const currentUser = useSelector((state) => state.currentUserReducer);
    const [commentContent, setCommentContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handlePostComment = (e) => {
        e.preventDefault();
        if (currentUser === null) {
            toast.warning("Login to comment", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            navigate(`/auth?returnPage=${location.pathname.substring(1)}`);
        }
        else if(commentContent === '')
        {
            toast.warning("Comment can't be empty", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch(commentOnPost(post._id, { userCommented: currentUser?.result._id, commentContent }));
            setCommentContent('');
        }
    }

    return (

        <div className="comment">
            <h3>Comments</h3>
            <ul>
                {
                    post?.comments.length === 0 ? <div className='no-comment'>
                        No Comments Yet
                    </div>
                        :
                        post?.comments.map((data) => (
                            <Comment key={data._id} data={data} postId={post._id}/>
                        ))
                }
            </ul>
            <form>
                <input type="text" value={commentContent} placeholder="Write a comment..." onChange={(e) => setCommentContent(e.target.value)} />
                <button type="submit" onClick={handlePostComment}>Comment</button>
            </form>
        </div>

    )
}

export default PostComment
