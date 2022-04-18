import axios from 'axios';
import authHeader from './auth-header.service';
import {CHANGE_PASSWORD, CHANGE_PASSWORD_AND_USERNAME, CHANGE_PHOTO, DETAIL_PROFILE, UPDATE_PROFILE} from '../constants/URL';

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
    async changePhoto(formdata){
        
        try {
          const res = await axios.post(
            CHANGE_PHOTO,
            formdata,
            {headers: authHeader()}
          );
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
    }
}

export default new UserService()