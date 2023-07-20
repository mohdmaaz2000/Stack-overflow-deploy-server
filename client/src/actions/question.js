import { toast } from 'react-toastify';
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    if (data.error === true) {
      if (data.message === 'Question limit reached') {
        toast.error(data.message + " Subscribe to get more access",{
          position:toast.POSITION.TOP_CENTER,
          theme:'colored'
        });
        navigate('/subscription')
      }
      else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored'
        });
      }
    }
    else {
      dispatch({ type: "POST_QUESTION", payload: data });
      dispatch(fetchAllQuestions());
      toast.success("Qusetion posted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.allQuestion();
    dispatch({ type: 'GET_ALL_QUESTIONS', payload: data });
  } catch (error) {
    console.log(error)
  }
}

export const postAnswer = (ansData) => async (dispatch) => {
  try {
    const { id, noOfAnswer, answerBody, userAnswered, userId, navigate } = ansData;
    const { data } = await api.postAnswer(id, noOfAnswer, answerBody, userAnswered, userId);
    if (data.error === true) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      if (data.message === "Question deleted by the user") {
        navigate('/');
      }
    }
    else {
      dispatch({ type: 'POST_ANSWER', payload: data });
      dispatch(fetchAllQuestions());
      toast.success("Answer Submitted", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deleteQuestion(id);
    if (data.error === true) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
    }
    else {
      dispatch({ type: 'DELETE_QUESTION', payload: data });
      dispatch(fetchAllQuestions());
      toast.success("Question Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
}


export const deleteAnswer = (id, answerId, noOfAnswer, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deleteAnswer(id, answerId, noOfAnswer);
    if (data.error) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      if (data.message === "Question deleted by the user") {
        navigate('/');
      }
    }
    else {
      dispatch({ type: "DELETE_ANSWER", payload: data });
      dispatch(fetchAllQuestions());
      toast.success("Answer Deleted", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateVote = (id, value, userId, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateVote(id, value, userId);
    if (data.error) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
      if (data.message === "Question deleted by the user") {
        navigate('/');
      }
    }
    else {
      dispatch({ type: "VOTE", payload: data });
      dispatch(fetchAllQuestions());
      toast.success("Voted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored'
      });
    }
  } catch (error) {
    console.log(error);
  }
}