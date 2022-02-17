import axios from 'axios';
import {LOGIN} from '../constants/URL';

class AuthService {
    login(formdata) {
        return axios.post(LOGIN, formdata);
    }
}

export default new AuthService();