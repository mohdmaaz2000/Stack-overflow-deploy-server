import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
const QuestionsList = (props) => {
  return (
    <div className='display-question-container'>
      <div className="display-votes-ans">
        <p>{props.question.upVotes.length + props.question.downVotes.length}</p>
        <p>Votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{props.question.noOfAnswer}</p>
        <p>Answers</p>
      </div>
      <div className="display-question-detail" style={{width:'100%'}}>
      <Link to={`/Question/${props.question._id}`} className='question-title-link'>{props.question.questionTitle}</Link>

      <div className="display-tags-time">
        <div className="display-tags">
          {
            props.question.questionTags.map((element)=>(
              <p key={element}>{element}</p>
            ))
          }
        </div>
        <div className="display-time">
          <p>Asked {moment(props.question.askedOn).fromNow()} by {props.question.userPosted}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default QuestionsList

