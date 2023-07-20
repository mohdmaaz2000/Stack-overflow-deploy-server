import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


import Avatar from '../../Avatar/Avatar'
import { deleteAnswer } from '../../../actions/question'

const DisplayAnswer = (props) => {
    const {question} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.currentUserReducer);
    const handleDeletAnswer = (e,answerId) =>{
        e.preventDefault();
        const del = window.confirm("Are you sure to delete the answer?");
        if(del)
        {
            dispatch(deleteAnswer(question._id,answerId,question.noOfAnswer-1,navigate));
        }
    }
  return (
    <div>
        {
            question.answer.map((ans)=>(
                
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type="submit" onClick={props.handleShare}>Share</button>
                            {
                                
                                User?.result?._id === ans.userId &&
                                <button onClick={(e)=>{handleDeletAnswer(e,ans._id,)}} type="submit">Delete</button>
                            }
                        </div>
                    </div>
                    <p>answered on {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                        <Avatar cursor='pointer' bgColor='green' px='8px' py='5px'>
                            {ans.userAnswered.charAt(0).toUpperCase()}
                            </Avatar>
                        <div>{ans.userAnswered}</div>
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswer
