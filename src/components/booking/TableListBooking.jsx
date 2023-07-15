import { Table } from 'antd'
import { useEffect, useState } from 'react'

import Booking from '../../service/booking.service'


const TableListService = (props) => {



    const [data, setData] = useState()

    const getListRoomType = async () => {
        try {
            const response = await Booking.getAllBooking    ()
            const temp =  await response

            console.log(temp)

            const result = await response?.data?.map((item) => {
                return {
                    key: item._id,
                    code: item._id,
                    name: item.name,
                    room: item.room?.name,
                    price: item.price?.toLocaleString('vn'),
                    checkInDate: item.checkInDate,
                    checkOutDate: item.checkOutDate,
                    phone: item.phone,
                    price: item.price.toLocaleString('vn')+'đ',
                    stage: item.stage=='waitConfirm' ? 'Chờ xác nhận' 
                        : item.stage == 'confirmed' ? 'Đã xác nhận' 
                        : item.stage == 'cancelled' ? 'Đã hủy' 
                        : item.stage == 'checkedIn' ? 'Đã nhận phòng' 
                        : 'Đã trả phòng',
                    status: item.status == 'notPaidFull' ? "Chưa thanh toán đủ" : "Đã thanh toán"
                }
            }
            ) || []
            setData(result)

            // dispatch(setListRoomType(temp?.data))
            return data

        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getListRoomType()


    }, [])




    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
        },
        {
            title: 'Tên phòng',
            dataIndex: 'room',
        },
        {
            title: 'Ngày nhận phòng',
            dataIndex: 'checkInDate',
        },
        {
            title: 'Ngày trả phòng',
            dataIndex: 'checkOutDate',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Gía tiền',
            dataIndex: 'price',
        },
        {
            title: "Hiện trạng phòng",
            dataIndex:'stage',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
    ];


    return <Table pagination={{ pageSize: 5, bottomRight: ["bottomRight"] }}  columns={columns} dataSource={data} />;
};
export default TableListService ;