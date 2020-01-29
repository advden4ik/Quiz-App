import axios from 'axios';
import { API_KEY } from '../../axios/api-key';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authSuccess = token => ({type: AUTH_SUCCESS, token});
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
};

export const auth = (email, password, isLogin) => async dispatch => {
    const authData = {
        email,
        password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;

    if (isLogin) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
}

const autoLogout = time => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, time * 1000);
}

export const autoLogin = () => async dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
            dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
