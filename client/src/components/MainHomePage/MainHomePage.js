import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Questions from './QuestionsList';
import './MainHomePage.css'
import search from '../../assets/search.svg';


const MainHomePage = () => {
  // const {profileId} = props;
  let user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const location = useLocation();
  let Allquestions = useSelector(state => state.questionReducer);

  const [width, setWidth] = useState(window.innerWidth);
  const [questionList, setQuestionList] = useState([]);
  const [searchInp, setSearchInp] = useState('');

  // for search question
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    if (searchTerm === null) {
      setQuestionList(Allquestions?.data);
    }
    else {
      setQuestionList(Allquestions?.data?.filter((question) => question.questionTitle.includes(searchTerm)));
    }
  }, [searchTerm, Allquestions])

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const handleClick = () => {
    if (user === null) {
      toast.warning("Please Login first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      navigate('/auth?returnPage=AskQuestion')
    }
    else {
      navigate('/AskQuestion');
    }
  }

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    navigate(`/Question?search=${searchInp}`)
  }

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          searchTerm !== null ? <h1>Search Results</h1>
            : location.pathname === '/' ? <h1>Top Questions </h1> : <h1>All Questions</h1>
        }

        <button onClick={handleClick} className='ask-btn'>Ask Question</button>
      </div>
      {
        width < 600 && <div className='question-search'>
          <form onSubmit={handleGlobalSearch}>
            <img src={search} alt="Search" width={18} className='search-question-icon'  />
            <input type="text" placeholder='Search...' onChange={(e) => setSearchInp(e.target.value)}></input>
          </form>

        </div>
      }
      <div>
        {
          questionList?.length === 0 ?
            <h3 style={{ textAlign: 'center' }}>{ searchTerm === null ? <>Loading...</>:
            <>0 Results found</>
            }</h3> :
            <>
              <p>{questionList?.length} questions </p>
              <>
                {
                  questionList?.toReversed().map((element) => (
                    <Questions question={element} key={element._id} />
                  ))
                }
              </>
            </>
        }
      </div>
    </div>
  )
}

export default MainHomePage
