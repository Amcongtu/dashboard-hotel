
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_SERVICE,
    API_CREATE_SERVICE,
    API_GET_LIST_SERVICE_PUBLISHED
} from "../configs/api"



class Service {
    static async getAllService(){
        const result = await fetch.make().get(API_GET_ALL_SERVICE, {authHeader:true})
        return result
    }

    static async postService(payload){
        const result = await fetch.make().post(API_CREATE_SERVICE, payload, {authHeader:true})
        return result
    }

    static async getServicePublish(){
            const result = await fetch.make().get(API_GET_LIST_SERVICE_PUBLISHED, {authHeader: false})
            return result
        }
    
}
export default Service