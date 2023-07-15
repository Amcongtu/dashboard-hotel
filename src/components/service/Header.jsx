import React from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;

function Header(props) {
    return (
        <div className='bg-white mb-2 rounded-md p-3 shadow-md shadow-slate-200 flex justify-between items-center'>
            <div className='font-bold text-[18px] text-[#2c2b2e]'>
                Quản lý đơn đặt phòng
            </div>
            <div className='flex items-center gap-2'>
                <div className="">
                <Search className='bg-[rgb(14,45,73)] rounded-lg border-none' onSearch={()=>{console.log("heheh")}} 
                placeholder="Nhập đơn đặt phòng..." enterButton="Search" 
                size="large"/>
                </div>
                <Link 
                    to="/service/add"
                    className="bg-[rgb(14,45,73)] text-white 
                    select-none hover:scale-105 active:scale-100 cursor-pointer
                    px-3 py-2 rounded font-[500] text-[16px] shadow-md shadow-slate-600"
                >Thêm đơn đặt phòng</Link>
            </div>
        </div>
    );
}

export default Header;