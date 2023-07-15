
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_ROOM_TYPE,
    API_CREATE_ROOM_TYPE,
    API_GET_LIST_ROOM_TYPE_PUBLISHED
} from "../configs/api"



class RoomTypeService {


    static async getAllRoomType(){
        const result = await fetch.make().get(API_GET_ALL_ROOM_TYPE, {authHeader:true})
        return result
    }

    static async postRoomType(payload){
        const result = await fetch.make().post(API_CREATE_ROOM_TYPE, payload, {authHeader:true})
        return result
    }

    static async getRoomTypePublish(){
            const result = await fetch.make().get(API_GET_LIST_ROOM_TYPE_PUBLISHED, {authHeader: false})
            return result
        }
    
}
export default RoomTypeService