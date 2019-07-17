import axios from "../../axios/axios-quiz";

export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const FETCH_QUIZ_ERROR = 'FETCH_QUIZ_ERROR';
export const QUIZ_SET_STATE = 'QUIZ_SET_STATE';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const QUIZ_NEXT_QUESTION = 'QUIZ_NEXT_QUESTION';
export const QUIZ_RETRY = 'QUIZ_RETRY';

export const fetchQuizSuccess = quiz => ({ type: FETCH_QUIZ_SUCCESS, quiz });
export const fetchQuizError = error => ({ type: FETCH_QUIZ_ERROR, error });
export const quizSetState = (answerState, results) => ({ type: QUIZ_SET_STATE, answerState, results });
export const finishQuiz = () => ({ type: FINISH_QUIZ });
export const quizNextQuestion = activeQuestion => ({ type: QUIZ_NEXT_QUESTION, activeQuestion });
export const retryQuiz = () => ({ type: QUIZ_RETRY });

export const fetchQuizById = quizId => async dispatch => {
    try {
        const response = await axios.get(`/quizes/${quizId}.json`);
        const quiz = response.data;

        dispatch(fetchQuizSuccess(quiz));

    } catch (error) {
        dispatch(fetchQuizError(error));
    }
}

export const quizAnswerClick = answerId => (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
        const key = Object.keys(state.answerState)[0];
        if (state.answerState[key] === 'success') {
            return;
        }
    }

    const question = state.quiz[state.activeQuestion];
    const results = {...state.results};
    
    if (question.rightAnswerId === answerId) {

        if(!results[question.id]) {
            results[question.id] = 'success'
        }

        dispatch(quizSetState({[answerId]: 'success'}, results));

        const timeout = window.setTimeout(() => {
            if (isQuizFinished(state)) {
                dispatch(finishQuiz());
            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1));
            }

            window.clearTimeout(timeout);
        }, 1000);
    } else {
        results[question.id] = 'error';
        dispatch(quizSetState({[answerId]: 'error'}, results));
    }
}

const isQuizFinished = (state) => state.activeQuestion + 1 === state.quiz.length;