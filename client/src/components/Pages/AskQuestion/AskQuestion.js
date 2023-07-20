import React, { useState } from 'react'
import { askQuestion } from '../../../actions/question'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './AskQuestion.css'
import QuestionNotice from './QuestionNotice';
const AskQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => (state.currentUserReducer))
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestinBody] = useState('');
    const [questionTags, setQuestionTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const questionTagarray = questionTags.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        if (User === null) {
            navigate('/auth');
            toast.warning("Login to post the question", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch(askQuestion({ questionTitle, questionBody, questionTags:questionTagarray, userPosted: User.result.name, userId: User.result._id }, navigate));
        }
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestinBody(questionBody + "\n");
        }
    }
    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <QuestionNotice />
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be Specific and imagine you are asking a question to another human</p>
                            <input type="text" placeholder='e.g. Is there an R function for finding index of an  element in vector' id='ask-ques-title' name='q-title' onChange={(e) => { setQuestionTitle(e.target.value) }} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea name="q-body" id="ask-ques-body" cols="30" rows="10" onChange={(e) => setQuestinBody(e.target.value)} onKeyPress={handleEnter}></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add upto 5 tags to describe what your question is about</p>
                            <input type="text" placeholder='e.g. (c++,java,javascript)' id='ask-ques-tags' name='q-tags' onChange={(e) => setQuestionTags(e.target.value)} />
                        </label>
                    </div>
                    <input type="submit" value="Review your question" className='review-btn' />
                </form>
            </div>

        </div>
    )
}

export default AskQuestion
