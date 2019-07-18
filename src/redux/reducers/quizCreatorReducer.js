import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "../actions/quizCreatorActions";

const initialState = {
    quiz: []
}

export const quizCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [
                    ...state.quiz,
                    action.questionItem
                ]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: []
            }
        default:
            return state;
    }
}