import { Table } from 'antd'
import { useEffect, useState } from 'react'
import Room from '../../service/room.service'

import { setListRoomType } from '../../store/RoomType/roomType.reducer'
import { useDispatch } from 'react-redux'
import Service from '../../service/service.service'




const TableListService = (props) => {

    const dispatch = useDispatch()


    const [data, setData] = useState()

    const getListRoomType = async () => {
        try {
            const response = await Service.getAllService()
            const temp =  await response

            console.log(temp)

            const result = await response?.data?.map((item) => {
                return {
                    key: item._id,
                    code: item._id, 
                    name: item.name,
                    price: item.price?.toLocaleString('vn'),
                    description: item.description,
                    status: item.status == 'active' ? "Đang kích hoạt" : "Không kích hoạt"
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
            title: 'Tên dịch vụ',
            dataIndex: 'name',
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
export default TableListService ;