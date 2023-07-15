import { Table } from 'antd'
import { useEffect, useState } from 'react'
import RoomTypeService from '../../service/roomType.service'

import { setListRoomType } from '../../store/RoomType/roomType.reducer'
import { useDispatch } from 'react-redux'




const TableListRoomType = (props) => {

    const dispatch = useDispatch()


    const [data, setData] = useState()

    const getListRoomType = async () => {
        try {
            const response = await RoomTypeService.getAllRoomType()
            const temp =  await response

            const result = await response?.data?.map((item) => {
                return {
                    key: item._id,
                    name: item.name,
                    numberOfRoom: item.rooms?.length,
                    price: item.price?.toLocaleString('vn'),
                    description: item.description
                }
            }
            ) || []
            setData(result)

            dispatch(setListRoomType(temp?.data))
            return data

        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getListRoomType()


    }, [])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };


    const columns = [
        {
            title: 'Loại phòng',
            dataIndex: 'name',
        },
        {
            title: 'Số lượng phòng',
            dataIndex: 'numberOfRoom',
            sorter: (a, b) => a.numberOfRoom - b.numberOfRoom,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
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