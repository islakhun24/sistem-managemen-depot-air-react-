class ServiceStorage {
     PARAMS_USER = 'user'

     saveUserStorage(data){
         localStorage.setItem(this.PARAMS_USER, data)
     }

     getUser(){
         return localStorage.getItem(this.PARAMS_USER)
     }
}

export default new ServiceStorage();