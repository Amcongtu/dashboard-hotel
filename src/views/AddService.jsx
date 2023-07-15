import React, { useEffect, useState } from 'react';
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
import RoomService from '../service/room.service';
import Toast from '../helpers/Toast';
import { getUpCloudinary } from '../cloudinary/cloudinary';
import RoomTypeService from '../service/roomType.service';
import Service from '../service/service.service';
// const { RangePicker } = DatePicker;


const { TextArea } = Input;


function AddService(props) {
    const [imgArray, setImgArray] = useState()
    
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
    
        setImgArray(e?.fileList)

        return e?.fileList;
    };


    const onFinish = async(values) => {

        try {
            var imgArrayCloud = [] 
            var imgArrayCloudId=[]
            for (let i = 0; i<imgArray.length; i= i+1)
            {
                
                const data = await getUpCloudinary(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME}/image/upload`, imgArray[i].thumbUrl,"")   
                
                imgArrayCloud.push(data.url)
                imgArrayCloudId.push(data.public_id)
            }

            const response = await Service.postService({image: imgArrayCloud,image_id: imgArrayCloudId,name: values.name, description: values.description, price: values.price})
            

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
                    Thêm dịch vụ
                </span>
            </div>
            <div className='bg-white mb-2 rounded-md p-3 shadow-md shadow-slate-200'>
                <Form
                    initialValues={{ price: 100000, status: 'active', description: "" }}
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
                            label="Tên dịch vụ" name="name" rules={[
                                {
                                    required: true, message: 'Tên dịch vụ không được bỏ trống'
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                            }}
                        >
                            <Input placeholder="Nhập tên dịch vụ" />
                        </Form.Item>
                        <Form.Item label="Giá tiền" name="price" rules={[
                            {
                                required: true, message: 'Giá tiền không được bỏ trống'
                            },
                        ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(49%)',
                                marginLeft: 10
                            }}>
                            <InputNumber min="100000" className='w-full' addonBefore="+" addonAfter="đ" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <TextArea rows={4} />
                    </Form.Item>
                   

                    <Form.Item label="Trạng thái" name="status">
                        <Select placeholder="Chọn trạng thái"  >
                            <Select.Option value="active">Kích hoạt</Select.Option>
                            <Select.Option value="inactive">Không kích hoạt</Select.Option>
                        </Select>
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

export default AddService;