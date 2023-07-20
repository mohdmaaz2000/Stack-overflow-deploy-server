import React from 'react'
import './Terms.css'
import { Link } from 'react-router-dom'

const TermsAndCondition = () => {
    return (
        <div className="terms-container">
            <h1 className='terms-heading'>Terms and Conditions</h1>
            <p className='subscription-para'>Please read these terms and conditions carefully before subscribing to our website.</p>
            <ul className='terms-list'>
                <li>By subscribing to our website, you agree to be bound by these terms and conditions.</li>
                <li>We reserve the right to modify these terms and conditions at any time without prior notice. Your continued use of our website after any such modifications constitutes your acceptance of the revised terms and conditions.</li>
                <li>You must be at least 15 years old to subscribe to our website.</li>
                <li>We may terminate your subscription if found any illegal activity</li>
                <li>You are responsible for maintaining the confidentiality of your subscription and login information.</li>
                <li>We do not guarantee that our website will be error-free or uninterrupted, and we are not responsible for any losses or damages resulting from your use of our website.</li>

                <li>These terms and conditions are governed by the laws </li>
            </ul>
            <p>If you have any questions about these terms and conditions, please contact us at <Link className='terms-email' to="mailto:mohdmaaz20bcs044@gmail.com">mohdmaaz20bcs044@gmail.com</Link></p>
        </div>
    )
}

export default TermsAndCondition
