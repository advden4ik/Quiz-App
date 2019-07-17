import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from "../actions/quizListActions";

const initialState = {
    quizes: [],
    loading: false,
    error: null
}

export const quizListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZES_SUCCESS:
                return {
                    ...state,
                    quizes: action.quizes,
                    loading: false
                }
        case FETCH_QUIZES_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                }
        default:
            return state;
    }
}