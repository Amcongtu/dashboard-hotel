
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_STATUS_ROOM,
    API_CREATE_STATUS_ROOM
} from "../configs/api"



class StatusRoomService {
    static async createStatusRoom(data) {
        const result = await fetch.make().post(API_CREATE_STATUS_ROOM,data, {authHeader:true})
        return result
        
    }

    static async getAllStatusRoom(){
        const result = await fetch.make().get(API_GET_ALL_STATUS_ROOM,{authHeader:true})
        return result
    }
    
}
export default StatusRoomService;