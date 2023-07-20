import React from 'react'
import { useNavigate } from 'react-router-dom';
import QuestionsList from '../../../MainHomePage/QuestionsList';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../../../MainHomePage/MainHomePage.css'
import './UserQuestion.css'

const UserQuestion = (props) => {
    const { currentProfile } = props;
    const navigate = useNavigate();
    let questions = useSelector(state => state.questionReducer);
    let user = useSelector((state) => state.currentUserReducer);

    const questionList= questions?.data?.filter((question) => question.userId === currentProfile?._id)

    const handleClick = () => {
        if (user === null) {
            toast.warning("Please Login first", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            navigate('/auth')
        }
        else {
            navigate('/AskQuestion');
        }
    }

    return (
        <div className=' people-container'>
            <div className="post-container-header">
                {
                    currentProfile?._id === user?.result?._id &&
                    <button onClick={handleClick} className='profile-ask-btn'>Ask Question</button>
                }
                <h1> Questions </h1>
            </div>
            <div>
                {
                    questionList?.length === 0 ?
                        <p className='no-user'>No questions found</p> :
                        <>
                            <p>{questionList?.length} questions </p>
                            <>
                                {
                                    questionList?.toReversed().map((element) => (
                                        <QuestionsList question={element} key={element._id} />
                                    ))
                                }
                            </>
                        </>
                }
            </div>
        </div>
    )
}

export default UserQuestion
