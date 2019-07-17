import axios from "../../axios/axios-quiz";

export const FETCH_QUIZES_START = 'FETCH_QUIZES_START';
export const FETCH_QUIZES_SUCCESS = 'FETCH_QUIZES_SUCCESS';
export const FETCH_QUIZES_ERROR = 'FETCH_QUIZES_ERROR';

export const fetchQuizesStart = () => ({ type: FETCH_QUIZES_START });
export const fetchQuizesSuccess = (quizes) => ({ type: FETCH_QUIZES_SUCCESS, quizes });
export const fetchQuizesError = (error) => ({ type: FETCH_QUIZES_ERROR, error });

export const fetchQuizes = () => async dispatch => {
    dispatch(fetchQuizesStart());
    try {
        const response = await axios.get('/quizes.json');

        const quizes = [];
        Object.keys(response.data).forEach((key, index) => {
            quizes.push({
                id: key,
                name: `Тест №${index + 1}`
            });
        });

        dispatch(fetchQuizesSuccess(quizes));

    } catch (error) {
        dispatch(fetchQuizesError(error));
    }
}