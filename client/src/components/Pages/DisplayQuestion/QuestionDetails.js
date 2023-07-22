import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './QuestionDetails.css'
import moment from 'moment/moment';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

import sortup from '../../../assets/sort-up-solid.svg'
import sortdown from '../../../assets/sort-down-solid.svg'
import Avatar from '../../Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer';
import { deleteQuestion, postAnswer, updateVote } from '../../../actions/question';

const QuestionDetails = () => {
  const { id } = useParams();
  const [answer, setAnswer] = useState('');
  const questionList = useSelector(state => state.questionReducer);
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleSubmit = (e, ansLength) => {
    e.preventDefault();
    if (User === null) {
      toast.warning("Login to answer the question", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });

      navigate(`/auth?returnPage=${location.pathname.substring(1)}`);
    }
    else {
      if (answer === '') {
        toast.warning("Write something to submit", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored'
        });
      }
      else {
        dispatch(postAnswer({ id, noOfAnswer: ansLength + 1, answerBody: answer, userAnswered: User.result.name, userId: User.result._id, navigate }));
        setAnswer('');
      }
    }
  }

  const handleShare = () => {
    copy(`${process.env.REACT_APP_CLIENT}` + location.pathname);
    toast.success("Link copied to clipboard", {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored'
    });
  }

  const handleDelete = () => {
    const del = window.confirm("Question will be deleted permanently");
    if (del) {
      dispatch(deleteQuestion(id, navigate));
    }
  }

  const handleUpVote = () => {
    if (User === null) {
      navigate('/auth');
      toast.warning("Login to vote the question", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
    }
    else {
      dispatch(updateVote(id, 'upVote', User.result._id, navigate));
    }
  }

  const handleDownVote = () => {
    if (User === null) {
      navigate('/auth');
      toast.warning("Login to vote the question", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
    }
    else {
      dispatch(updateVote(id, 'downVote', User.result._id, navigate));;
    }
  }

  return (
    <div className='question-details-page'>
      {
        questionList.length === 0 ?
          <h3 style={{ textAlign: 'center' }}>Loading...</h3> :
          <>
            {
              questionList.data.filter(question => question._id === id).map(question => (
                <div className='question-details-container-main' key={question._id} >
                  <section className='question-details-container'>
                    <h1>{question.questionTitle}</h1>
                    <div className="question-details-container-2">
                      <div className="question-votes">
                        <img src={sortup} alt="sortup" width={18} className='votes-icon' onClick={handleUpVote} />
                        <p>{question.upVotes.length - question.downVotes.length}</p>
                        <img src={sortdown} alt="sortdown" width={18} className='votes-icon' onClick={handleDownVote} />
                      </div>
                      <div style={{ width: '100%' }}>
                        <p className="question-body">{question.questionBody}</p>
                        <div className="question-details-tags">
                          {
                            question.questionTags.map((element) => (
                              <p key={element}>{element}</p>
                            ))
                          }
                        </div>
                        <div className="question-actions-user">
                          <div>
                            <button type="button" onClick={handleShare}>Share</button>
                            {
                              User?.result?._id === question?.userId &&
                              <button type="button" onClick={handleDelete}>Delete</button>
                            }
                          </div>
                        </div>
                        <p>Asked on {moment(question.askedOn).fromNow()}</p>
                        <Link to={`/users/${question.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                          <Avatar cursor='pointer' bgColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                          <div>{question.userPosted}</div>
                        </Link>
                      </div>
                    </div>
                  </section>
                  {
                    question.noOfAnswer !== 0 && (
                      <section>
                        <h3>{question.noOfAnswer} Answers</h3>
                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                      </section>
                    )
                  }
                  <section className='post-ans-container'>
                    <h3>Your Answer</h3>
                    <form onSubmit={(e) => { handleSubmit(e, question.noOfAnswer) }}>
                      <textarea name="" id="" cols="30" rows="10" value={answer} onChange={(e) => { setAnswer(e.target.value) }}></textarea>
                      <input type="submit" value="Post Your Answer" className='post-ans-btn' />
                    </form>
                    <p>
                      Browse other question tagged{" "}
                      {
                        question.questionTags.map((tag) => (
                          <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                        ))
                      }
                      {" "}or
                      <Link to='/AskQuestion' style={{ textDecoration: 'none', color: '#009dff' }}> ask your own question</Link>
                    </p>
                  </section>
                </div>
              ))
            }
          </>
      }
    </div>
  )
}

export default QuestionDetails
