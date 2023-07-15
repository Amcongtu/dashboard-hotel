
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_BOOKING,
    API_CREATE_BOOKING
} from "../configs/api"



class Booking {
    static async getAllBooking(){
        const result = await fetch.make().get(API_GET_ALL_BOOKING, {authHeader:true})
        return result
    }

    static async postBooking(payload){
        const result = await fetch.make().post(API_CREATE_BOOKING, payload, {authHeader:true})
        return result
    }

    
}
export default Booking