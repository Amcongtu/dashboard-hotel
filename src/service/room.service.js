
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_ROOM,
    API_CREATE_ROOM
} from "../configs/api"



class Room {


    static async getAllRoom(){
        const result = await fetch.make().get(API_GET_ALL_ROOM,{authHeader:true})
        return result
    }

    static async postRoom(payload){
        const result = await fetch.make().post(API_CREATE_ROOM, payload,{authHeader:true})
        return result
    }
    
}
export default Room