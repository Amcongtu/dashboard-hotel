import { Table } from 'antd'
import { useEffect, useState } from 'react'
import Room from '../../service/room.service'

import { setListRoomType } from '../../store/RoomType/roomType.reducer'
import { useDispatch } from 'react-redux'




const TableListRoomType = (props) => {

    const dispatch = useDispatch()


    const [data, setData] = useState()

    const getListRoomType = async () => {
        try {
            const response = await Room.getAllRoom()
            const temp =  await response

            console.log(temp)

            const result = await response?.data?.map((item) => {
                return {
                    key: item._id,
                    name: item.name,
                    roomType: item.roomType.name,
                    code: item.roomNumber,
                    capacity: item.capacity,
                    price: item.price?.toLocaleString('vn'),
                    description: item.description,
                    status: item.status == 'published' ? "Công khai" : "Nháp"
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
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Phòng',
            dataIndex: 'name',
        },
        {
            title: 'Loại',
            dataIndex: 'roomType',
        },
        {
            title: 'Sức chứa',
            dataIndex: 'capacity',
            sorter: (a, b) => a.capacity - b.capacity,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
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
export default TableListRoomType;