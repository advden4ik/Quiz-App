import axios from "../../axios/axios-quiz";

export const CREATE_QUIZ_QUESTION = 'CREATE_QUIZ_QUESTION';
export const RESET_QUIZ_CREATION = 'RESET_QUIZ_CREATION';

export const createQuizQuestion = questionItem => ({type: CREATE_QUIZ_QUESTION, questionItem});
export const resetQuizCreation = () => ({type: RESET_QUIZ_CREATION});

export const finishCreateQuiz = quiz => dispatch => {
    axios.post('/quizes.json', quiz);
    dispatch(resetQuizCreation());
}
