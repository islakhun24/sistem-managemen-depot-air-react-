class ServiceStorage {
    PARAMS_USER = 'user'
    PARAMS_ACCESSTOKEN = 'accessToken';
    
    saveUserStorage(data){
        localStorage.setItem(this.PARAMS_USER, data)
    }

    getUser(){
        return localStorage.getItem(this.PARAMS_USER)
    }

    saveTokenStorage(data){
        localStorage.setItem(this.PARAMS_ACCESSTOKEN, data)
    }

    getToken(){
        return localStorage.getItem(this.PARAMS_ACCESSTOKEN)
    }
}

export default new ServiceStorage();