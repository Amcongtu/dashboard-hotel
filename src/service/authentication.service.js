
import fetch from "../helpers/fetch"
import {
    API_LOGIN_USER_PWD,
    API_POSITION
} from "../configs/api"



class AuthenticationService {
    static async login(data) {
        const result = await fetch.make().post(API_LOGIN_USER_PWD,data)
        return result
        
    }

    static async getPosition(){
        const result = await fetch.make().get(API_POSITION,{authHeader:true})
        return result
    }
    
}
export default AuthenticationService;