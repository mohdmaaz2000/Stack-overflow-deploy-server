import React from 'react'
import './QuestionNotice.css'
const QuestionNotice = () => {
  return (
    <div className='notice-container'>
      <div className="notice-container-1">
        <div className="notice">
        <h2 className="notice-title">Writing a good question</h2>
        <p className="notice-para-1 notice-para">
                You’re ready to a programming-related question and this form will help guide you through the process.
            </p>
            <p className="notice-para-2 notice-para">
                Looking to ask a non-programming question? See <a href="https://stackexchange.com/sites#technology-traffic">the topics here</a> to find a relevant site.
            </p>
            <h5 className="notice-steps-h">Steps</h5>
            <ul className="notice-steps">
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>Describe what you tried and what you expected to happen.</li>
                <li>Add “tags” which help surface your question to members of the community.</li>
                <li>Review your question and post it to the site.</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default QuestionNotice
