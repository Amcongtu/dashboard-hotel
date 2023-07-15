import React, { useState } from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import { PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Checkbox,
    // DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from 'antd';
import RoomTypeService from '../service/roomType.service';
import Toast from '../helpers/Toast';
import { getUpCloudinary } from '../cloudinary/cloudinary';
// const { RangePicker } = DatePicker;


const { TextArea } = Input;


function AddRoomType(props) {
    const [imgArray, setImgArray] = useState()

    const normFile = (e) => {    
        setImgArray(e?.fileList)
        return e?.fileList;
    };
    const onFinish = async(values) => {
   

        try {
            // imgArray.map((item)=> item.thumbUrl)
            var imgArrayCloud = [] 
            var imgArrayCloudId=[]
            for (let i = 0; i<imgArray.length; i= i+1)
            {


                const data = await getUpCloudinary(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME}/image/upload`, imgArray[i].thumbUrl,"")   
                imgArrayCloud.push(data.url)
                imgArrayCloudId.push(data.public_id)
            }

            const response = await RoomTypeService.postRoomType({...values, image: imgArrayCloud,image_id: imgArrayCloudId,name: values.name, utilities_bath_room: values.utilities_bath_room, utilities_room: values.utilities_room, rooms: []})
            
            if(response.status != 200)
            {
                if(response.status == 400)
                {
                    for (let index = 0; index < response?.message?.length; index++) 
                    {
                        Toast.getToastError(response?.message[index]?.msg, 3000)
                    }
                    return
                }

                if(response.status == 409)
                {

                    Toast.getToastError(response?.message, 3000)
                    return
                }
                
                Toast.getToastSuccess("Thêm thất bại", 3000)
                return
            }
            
            
            
            Toast.getToastSuccess("Thêm thành công", 3000)
            return

        } catch (error) {
            Toast.getToastError("Server đang bảo trì!", 3000)
            
        }

    };
    return (
        <DashboardLayout>
            <div className='bg-white mb-2 rounded-md p-3 shadow-md shadow-slate-200 '>
                <span className="text-[rgb(14,45,73)]
                    px-3 py-2 rounded font-bold text-[16px]">
                    Thêm loại phòng
                </span>
            </div>
            <div className='bg-white mb-2 rounded-md p-3 shadow-md shadow-slate-200'>
                <Form
                    initialValues={{ price: 5000000, status: 'draft', description: "" }}
                    layout="vertical"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        minWidth: screen,
                    }}
                    onFinish={onFinish}
                >

                    <Form.Item
                        style={{
                            marginBottom: 0,
                            marginLeft: -8,
                        }}
                    >
                        <Form.Item
                            label="Mã loại phòng" name="code" rules={[
                                {
                                    required: true, message: 'Mã loại phòng không được bỏ trống'
                                },
                            ]}

                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <Input placeholder="Mã loại phòng" />
                        </Form.Item>
                        <Form.Item
                            label="Tên loại phòng" name="name" rules={[
                                {
                                    required: true, message: 'Tên loại phòng không được bỏ trống'
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                            }}
                        >
                            <Input placeholder="Nhập tên loại phòng" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Trạng thái" name="status">
                        <Select placeholder="Chọn trạng thái"  >
                            <Select.Option value="draft">Nháp</Select.Option>
                            <Select.Option value="published">Công khai</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{
                            marginBottom: 0,

                        }}
                    >
                        <Form.Item label="Giá tiền" name="price" rules={[
                            {
                                required: true, message: 'Giá tiền không được bỏ trống'
                            },
                        ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                marginRight: 10
                            }}>
                            <InputNumber min="100000" className='w-full' addonBefore="+" addonAfter="đ" />
                        </Form.Item>
                        <Form.Item
                            label="Diện tích" name="area"
                            style={{
                                display: 'inline-block',
                                width: 'calc(30% - 8px)',

                            }}
                        >
                            <InputNumber min="0" className='w-full' addonAfter="Mét vuông" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true, message: 'Sức chứa không được bỏ trống'
                                },
                            ]}
                            label="Sức chứa tối đa" name="capacity"
                            style={{
                                display: 'inline-block',
                                width: 'calc(20% - 8px)',
                                marginLeft: 12
                            }}
                        >
                            <InputNumber min="0" className='w-full' addonAfter="Người" />
                        </Form.Item>
                    </Form.Item>


                    <Form.Item label="Tiện nghi phòng ngủ" name="utilities_room">
                        <Checkbox.Group>

                            <Checkbox value="Wifi">Wifi</Checkbox>
                            <Checkbox value="breakfast">Buổi sáng</Checkbox>
                            <Checkbox value="unrefund">Không hoàn tiền</Checkbox>
                            <Checkbox value="air-conditioner">Máy lạnh</Checkbox>
                            <Checkbox value="tv">Tivi</Checkbox>
                            <Checkbox value="no-smoking">Không hút thuốc</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="Tiện nghi phòng tắm" name="utilities_bath_room">
                        <Checkbox.Group>
                            <Checkbox value="standing-shower">Tắm đứng</Checkbox>
                            <Checkbox value="hairdryer">Máy sấy tóc</Checkbox>
                            <Checkbox value="private-bathroom">Phòng tắm riêng</Checkbox>
                            <Checkbox value="hot-water">Nước nóng</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>


                    <Form.Item label="Cập nhật ảnh" name="image" getValueFromEvent={normFile} rules={[
                        {
                            required: true, message: 'Ảnh không được để trống'
                        },

                    ]}>
                        <Upload listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Button type="primary" className='bg-black w-[200px]' htmlType="submit">
                        Thêm
                    </Button>
                </Form>
            </div>
        </DashboardLayout>
    );
}

export default AddRoomType;