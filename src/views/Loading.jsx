import React, { useEffect } from 'react';
import { setUser } from "../store/auth/auth.reducer"
import {useDispatch,useSelector } from 'react-redux'
import AuthenticationService from '../service/authentication.service';
import { useNavigate } from 'react-router-dom';
import alert from '../helpers/alert';

function Loading({onGetPosition}) {
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.auth.isLogin)

    const route = useNavigate()
    useEffect(()=>{
        const getPosition = async()=>{

            try {
                const res = await AuthenticationService.getPosition()
                if(res.status == 200){
                    dispatch(setUser(res.data))
                    onGetPosition( JSON.stringify( res.data))
                    route("/home")
                    
                    return
                }
                
                if(res.status == 403)
                {
                    alert.getAlert("Bạn không có quyền truy cập vào trong.","error", 2700, false)
                    new Promise((resolveInner) => {
                        setTimeout(route("/login"), 2700);
                    })
                }
            } catch (error) {
                alert.getAlert("Server đang bảo trì.","error", 2700, false)
                new Promise((resolveInner) => {
                    setTimeout(route("/login"), 2700);
                })
                
                return
            }
          
        }

   
        getPosition()
   
        
    }, [isLogin])
    return (
        <div className='flex justify-center h-screen align-middle items-center bg-slate-100 brightness-100'>

            <div className='border-solid rounded-full animate-spin border-b-[5px] border-r-[5px] border-black w-[40px] h-[40px]'></div>
        </div>
    );
}

export default Loading;