import React from 'react';
import CountTo from 'react-count-to'

import { useSelector } from 'react-redux';

function Widget(props) {
    const data = useSelector((state)=> state.roomType.listRoomType)


    return (
        <div className='flex justify-between gap-4 mb-3'>
            <div className="flex flex-col justify-between bg-white p-3 rounded-md w-full shadow-md shadow-slate-200  duration-300 cursor-pointer hover:-translate-y-1">
                <div className='flex items-center h-[55px]'>
                    <img src="../../../public/images/NumberRoomType.svg" alt="" />
                </div>
                <div className='ml-2'>
                    <div className='font-bold text-[24px] mt-2 mb-1'>
                        <CountTo to={12} speed={434}></CountTo>
                    </div>
                    <div className='text-[#959393] text-[13px]'>
                        Số lượng phòng hiện có
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-white p-3 rounded-md w-full shadow-md shadow-slate-200  duration-300 cursor-pointer hover:-translate-y-1">
                <div className='flex items-center h-[55px]'>
                    <img src="../../../public/images/Maskgroup(2).svg" alt="" />
                </div>
                <div className='ml-2'>
                    <div className='font-bold text-[24px] mt-2 mb-1'>
                        <CountTo to={data?.length || 0} speed={434}></CountTo>
                    </div>
                    <div className='text-[#959393] text-[13px]'>
                        Số lượng loại phòng hiện có
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-white p-3 rounded-md w-full shadow-md shadow-slate-200  duration-300 cursor-pointer hover:-translate-y-1">
                <div className='flex items-center mt-[-2px] h-[55px]'>
                    <img src="../../../public/images/Maskgroup(3).svg" alt="" />
                </div>
                <div className='ml-2'>
                    <div className='font-bold text-[24px] mt-2 mb-1'>
                        <CountTo to={12} speed={434}></CountTo>
                    </div>
                    <div className='text-[#959393] text-[13px]'>
                        Số lượng loại phòng đang hoạt động
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-white p-3 rounded-md w-full shadow-md shadow-slate-200  duration-300 cursor-pointer hover:-translate-y-1">
                <div className='flex items-center h-[30px] mt-[8px] p-3 -ml-3'>
                    <img src="../../../public/images/Maskgroup(4).svg" alt="" />
                </div>
                <div className='ml-2'>
                    <div className='font-bold text-[24px] mt-2 mb-1'>
                        <CountTo to={12} speed={434}></CountTo>
                    </div>
                    <div className='text-[#959393] text-[13px]'>
                        Số lượng loại phòng không hoạt động
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Widget;