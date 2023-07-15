
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_CUSTOMER,
    API_CREATE_CUSTOMER
} from "../configs/api"



class CustomerService {
    static async createCustomer(data) {
        const result = await fetch.make().post(API_CREATE_CUSTOMER,data,{authHeader:true})
        return result   
    }

    static async getAllCustomer(){
        const result = await fetch.make().get(API_GET_ALL_CUSTOMER,{authHeader:true})
        return result
    }
    
}
export default CustomerService;