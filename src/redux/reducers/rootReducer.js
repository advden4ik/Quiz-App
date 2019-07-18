import { combineReducers } from 'redux';
import { quizListReducer } from './quizListReducer';
import { quizReducer } from './quizReducer';
import { quizCreateReducer } from './quizCreatorReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    quizList: quizListReducer,
    quiz: quizReducer,
    quizCreate: quizCreateReducer,
    auth: authReducer,
});