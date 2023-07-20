import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import AllRoutes from './components/Routes/AllRoutes';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { allPost } from './actions/post';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(allPost());
  }, [dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <AllRoutes />
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;