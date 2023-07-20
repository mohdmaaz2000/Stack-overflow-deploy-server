import React, { useState } from 'react'

import UserPost from './UserPost';
import Social from './List/Social';
import './ProfileList.css'
import UserQuestion from './List/UserQuestion';


const ProfileList = (props) => {
    const {currentUser,currentProfile} = props
    const [activeSection, setActiveSection] = useState('questions');

    const handleButtonClick = (section) => {
        setActiveSection(section);
    };

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'questions':
                return <UserQuestion currentProfile={currentProfile}/>;
            case 'posts':
                return <UserPost currentUser={currentUser} currentProfile={currentProfile}/>;
            case 'followers':
                return <Social profileId={currentProfile._id} role={"Followers"}/>;
            case 'following':
                return <Social profileId={currentProfile._id} role={"Following"}/>;
            case 'friends':
                return <Social profileId={currentProfile._id} role={"Friends"}/>;
            default:
                return null;
        }
    };

    return (
        <div className="profile-list-container">
            <div className="profile-button-group">
                <button
                    onClick={() => handleButtonClick('questions')}
                    className={activeSection === 'questions' ? 'active' : ''}
                >
                    Questions
                </button>
                <button
                    onClick={() => handleButtonClick('posts')}
                    className={activeSection === 'posts' ? 'active' : ''}
                >
                    Posts
                </button>
                <button
                    onClick={() => handleButtonClick('followers')}
                    className={activeSection === 'followers' ? 'active' : ''}
                >
                    Followers
                </button>
                <button
                    onClick={() => handleButtonClick('following')}
                    className={activeSection === 'following' ? 'active' : ''}
                >
                    Following
                </button>
                <button
                    onClick={() => handleButtonClick('friends')}
                    className={activeSection === 'friends' ? 'active' : ''}
                >
                    Friends
                </button>
            </div>
            {renderActiveSection()}
        </div>
    );
};

export default ProfileList
