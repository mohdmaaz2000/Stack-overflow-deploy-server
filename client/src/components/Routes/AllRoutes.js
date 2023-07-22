import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";

import Auth from '../Pages/Auth/Auth'
import Home from '../Pages/Home/Home';
import Questions from '../Pages/Questions/Questions';
import AskQuestion from '../Pages/AskQuestion/AskQuestion';
import DisplayQuestion from '../Pages/DisplayQuestion/DisplayQuestion';
import Tags from '../Pages/Tags/Tags';
import Users from '../Pages/Users/Users';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import ChatBot from '../Pages/Chatbot/ChatBot';
import Verification from '../Pages/Auth/Verification';
import AllPost from '../Pages/Posts/AllPost';
import UploadPost from '../Pages/UploadPost/UploadPost';
import SharePost from '../Pages/SharePost/SharePost';
import People from '../Pages/People/People';
import Subscription from '../Pages/Subscription/Subscription';
import About from '../Pages/About/About';
import NotFound from '../Pages/NotFound/NotFound';


const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/Question' element={<Questions />} />
        <Route exact path='/AskQuestion' element={<AskQuestion />} />
        <Route exact path='/Question/:id' element={<DisplayQuestion />} />
        <Route exact path='/tags' element={<Tags />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/users/:id' element={<ProfilePage />} />
        <Route exact path='/chatbot' element={<ChatBot />} />
        <Route exact path='/auth-verify' element={<Verification />} />
        <Route exact path='/post' element={<AllPost />} />
        <Route exact path='/post/:id' element={<SharePost />} />
        <Route exact path='/uploadPost' element={<UploadPost />} />
        <Route exact path='/people' element={<People />} />
        <Route exact path='/subscription' element={<Subscription/>} />
        <Route exact path='/about' element={<About />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AllRoutes
