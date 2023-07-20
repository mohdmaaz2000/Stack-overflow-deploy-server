import React from 'react'

const ChatBotQA = (props) => {
    const { data } = props;

    const qtext = data.question.split("\n");
    const atext = data.answer.split("\n");
    return (
        <>
            <div className='message user-message'>
                <p>
                    {qtext.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index !== qtext.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
            </div>
                <div className="message bot-message">
                    <p>
                        {atext.map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index !== atext.length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                </div>

        </>
    )
}

export default ChatBotQA
