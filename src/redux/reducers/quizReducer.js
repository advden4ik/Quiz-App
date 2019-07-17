import { FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY } from "../actions/quizActions";

const initialState = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
    error: null
}

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.quiz,
                loading: false
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null
            }
        case QUIZ_RETRY:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
            }
        default:
            return state;
    }
}