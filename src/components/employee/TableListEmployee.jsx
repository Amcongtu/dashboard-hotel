import { Table } from 'antd'
import { useEffect, useState } from 'react'
import Room from '../../service/room.service'

import { setListRoomType } from '../../store/RoomType/roomType.reducer'
import { useDispatch } from 'react-redux'
import EmployeeService from '../../service/employee.service'




const TableListEmployee = (props) => {

    const dispatch = useDispatch()


    const [data, setData] = useState()

    const getListRoomType = async () => {
        try {
            const response = await EmployeeService.getAllEmployee()
            const temp =  await response


            const result = await response?.data?.map((item) => {
            console.log(item)

                return {
                    key: item._id,
                    ID: item.idEmployee,
                    name: item.name,
                    username: item.username,
                    position: item.position,
                    salary: item.salary.toLocaleString('vn')+"đ",
                    hireDate: item.hireDate,
                    status: item.status == 'inActive' ? "Đã nghỉ" : "Đang hoạt động"
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

    console.log(data)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };


    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'ID',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            // sorter: (a, b) => a.capacity - b.capacity,
        },
        {
            title: 'Lương',
            dataIndex: 'salary',
        },
        {
            title: 'Ngày thuê',
            dataIndex: 'hireDate',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    return <Table pagination={{ pageSize: 5, bottomRight: ["bottomRight"] }} rowSelection={rowSelection} columns={columns} dataSource={data} />;
};
export default TableListEmployee;