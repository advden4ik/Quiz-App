import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-app-12345.firebaseio.com/'
});