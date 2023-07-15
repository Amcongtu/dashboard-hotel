import React, { useEffect, useState } from 'react';
import "../assets/scss/login.scss"
import AuthLayout from '../layouts/AuthLayout';
import { FaUser } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import AuthenticationService from '../service/authentication.service';
import alert from '../helpers/alert';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from "../store/auth/auth.reducer"
import {useDispatch } from 'react-redux'

function Login(props) {
    const dispatch = useDispatch()
    const handleLogin = (token) => {
        localStorage.setItem('access_token', token)
        dispatch(setIsLogin(true))
    };

    const [isLoading, setIsLoading] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const route = useNavigate()

    useEffect(()=>{
        if (localStorage.length > 0) 
        {
            // Xóa toàn bộ dữ liệu trong local storage
            localStorage.clear();
        }


    }, [])
    
    const onSubmit = async (data) => {
        setIsLoading(false)
        // Kiểm tra và xử lý đăng nhập tại đây
        const res = await AuthenticationService.login(data)
        setIsLoading(true)
        if(res.status == 200){
            alert.getAlert("Đăng nhập thành công.","success", 2700, false)
            setTimeout(()=>
            {
                handleLogin(res.data.token)
                route('/')

            }, 2500)
            return
        }
        
        if(res.status == 400){
            alert.getAlert("Sai tên đăng nhập hoặc mật khẩu.","error", 2500, false)
            return
        }

        alert.getAlert("Đăng nhập thất bại","error", 2500, false)
        return
        
    };

    return (
        <AuthLayout>
            <div>
                <div className='flex flex-col items-center justify-center h-screen'>
                    <div className='text-white text-[42px] font-bold uppercase tracking-[2.5px]'>Đăng nhập</div>
                    <form
                        className='mt-[40px] w-[300px] md:w-[400px] text-[18px] md:text-[22px] flex flex-col gap-1 md:gap-5'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='flex border-b-[1px] border-solid border-b-white pb-2 gap-2'>
                            <label htmlFor="username" className='cursor-pointer'><FaUser className='text-white' /></label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                {...register("username", {
                                    required: "Tài khoản không được bỏ trống",
                                    minLength: {
                                        value: 5,
                                        message: "Tài khoản phải có ít nhất 5 ký tự"
                                    }
                                })}
                                className='ml-3 bg-transparent text-white outline-none w-full'
                                placeholder='Nhập tài khoản...'
                            />
                        </div>
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}

                        <div className='flex border-b-[1px] border-solid border-b-white pb-2 gap-1 mt-6'>
                            <label htmlFor="password" className=' cursor-pointer '><MdPassword className='text-white' /></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                {...register("password", {
                                    required: "Mật khẩu không được bỏ trống",
                                    minLength: {
                                        value: 8,
                                        message: "Mật khẩu phải có ít nhất 8 ký tự"
                                    }
                                })}
                                className='ml-3 bg-transparent text-white outline-none w-full'
                                placeholder='Nhập mật khẩu...'
                            />
                        </div>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        {isLoading && 
                            <button
                                type="submit"
                                className="bg-[#ff3366] rounded-md shadow-rose-600 
                                    shadow-sm text-white py-2 mt-8 md:mt-6 select-none cursor-pointer 
                                    hover:scale-[101%] active:scale-100 font-[500]"
                            >
                            Đăng nhập
                        </button>}
                        {!isLoading && 
                            <button
                                type="submit"
                                className="bg-[#ff3366] flex justify-center items-center rounded-md
                                    shadow-rose-600 shadow-sm text-white py-2 mt-8 md:mt-6 select-none 
                                    cursor-not-allowed font-[500]"
                            >
                            <div className=' animate-spin w-[20px] h-[20px] border-solid rounded-full border-white border-t-[2px] border-r-[2px]'></div>
                        </button>}
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login;
