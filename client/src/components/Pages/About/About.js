import React from 'react'
import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import './About.css'
import { useSelector } from 'react-redux'


const About = () => {
    const users = useSelector((state) => state.userReducer);
    const questions = useSelector((state) => state.questionReducer);

    return (

        <div className="home-container-1">
            <LeftSidebar />

            <div class="home-container-2">
                <div class="about-col">
                    <h1 className='about-heading'>About Us</h1>
                    <p className='about-para'>Stack Overflow is the largest, most trusted online community for developers to learn, share their knowledge, and build their careers.</p>
                    <p className='about-para'>Founded in 2023, Stack Overflow has grown into a platform that serves millions of developers every month and has become a go-to resource for coders of all levels.</p>
                    <p className='about-para'>Our mission is to help developers write better code, faster, by providing a platform for learning, sharing knowledge, and connecting with peers.</p>
                    <ul className='about-list'>
                        <li>Over {users?.length * 10} visits every month</li>
                        <li>Over {users?.length} registered users</li>
                        <li>Over {questions?.data?.length} questions asked</li>
                    </ul>
                </div>

            </div>
        </div>

    )
}

export default About