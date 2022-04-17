import axios from 'axios';
import authHeader from './auth-header.service';
import {CHANGE_PASSWORD, CHANGE_PASSWORD_AND_USERNAME, DETAIL_PROFILE, UPDATE_PROFILE} from '../constants/URL';

class UserService {
    changePassword(formdata){
        return axios.post(CHANGE_PASSWORD, formdata, {headers: authHeader()})
    }

    changePasswordAndUsername(formdata){
        return axios.post(CHANGE_PASSWORD_AND_USERNAME, formdata, {headers: authHeader()})
    }

    updateProfile(formdata){
        return axios.post(UPDATE_PROFILE, formdata, {headers: authHeader()})
    }

    detailProfile(){
        return axios.get(DETAIL_PROFILE, {headers: authHeader()})
    }
}

export default new UserService()