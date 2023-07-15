
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_EMPLOYEE,
    API_CREATE_EMPLOYEE
} from "../configs/api"



class EmployeeService {
    static async getAllEmployee(data) {
        const result = await fetch.make().post(API_CREATE_EMPLOYEE,data,{authHeader:true})
        return result   
    }

    static async getAllEmployee(){
        const result = await fetch.make().get(API_GET_ALL_EMPLOYEE,{authHeader:true})
        return result
    }
    
}
export default EmployeeService;