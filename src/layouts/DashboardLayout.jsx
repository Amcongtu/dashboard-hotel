import {
    MenuFoldOutlined,
    BankOutlined,
    DashboardOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    CodepenOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SettingOutlined, LoginOutlined } from '@ant-design/icons';

import { setIsLogin } from "../store/auth/auth.reducer"
import {useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';


const { Header, Sider, Content } = Layout;

const DashboardLayout = ({children}) => {
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState(useLocation().pathname.split("/")[1]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    const items = [
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
        },
        {
            label: 'Đăng xuất',
            key: 'logout',
            icon: <LoginOutlined />,
        },
    ];


    const route = useNavigate();

    const handleNavbar = (e) => 
    {
        if ("logout" === e.key) {
            dispatch(setIsLogin(false))
            route("/login");
            localStorage.clear();
        }
    };

    const handleSideBar = (e) => 
    {
        setCurrent(e.key)
        if ("dashboard" == e.key) 
        {
            route("/dashboard")
            return
        }

        else if ("home" === e.key) 
        {
            route("/home")
            return

        }

        else if ("room-type" == e.key) 
        {
            route("/room-type")
            return
        }

        else if ("room" == e.key) 
        {
            route("/room")
            return
        }

        else if ("service" == e.key) 
        {
            route("/service")
            return
        }

        else if ("booking" == e.key) 
        {
            route("/booking")
            return
        }

        else if ("envoice" == e.key) 
        {
            route("/envoice")
            return
        }

        
        else if ("employee" == e.key) 
        {
            route("/employee")
            return
        }

        else if ("customer" == e.key) 
        {
            route("/customer")
            return
        }

        else if ("statusRoom" == e.key) 
        {
            route("/statusRoom")
            return
        }
        return
    };

    const menuProps = {
        items,
        onClick: handleNavbar,
    };

    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Link to={'/home'} className='mb-2 border-solid border-b-[0.23px] border-b-slate-100 flex bg-slate-900 py-3 text-center font-[500] d-flex items-center justify-center'>
                    <img src="../../../public/images/logo.webp" className='h-[50px] self-center mx-auto' alt="" />
                </Link>
                <Menu 
                    onClick={handleSideBar}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[current]}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <DashboardOutlined />,
                            label: 'Báo cáo tổng quan',
                        },
                        {
                            key: 'home',
                            icon: <HomeOutlined />,
                            label: 'Trang chủ',
                        },
                        {
                            key: 'booking',
                            icon: <CodepenOutlined />,
                            label: 'Đặt phòng',
                        },
                        {
                            key: 'statusRoom',
                            icon: <CodepenOutlined />,
                            label: 'Trạng thái phòng',
                        },
                        {
                            key: 'envoice',
                            icon: <CodepenOutlined />,
                            label: 'Phiếu thanh toán',
                        },
                        {
                            key: 'room-type',
                            icon: <BankOutlined />,
                            label: 'Loại phòng',
                        },
                        {
                            key: 'room',
                            icon: <BankOutlined />,
                            label: 'Phòng',
                        },
                        {
                            key: 'service',
                            icon: <CodepenOutlined />,
                            label: 'Dịch vụ',
                        },
                        {
                            key: 'employee',
                            icon: <CodepenOutlined />,
                            label: 'Nhân viên',
                        },
                        {
                            key: 'customer',
                            icon: <CodepenOutlined />,
                            label: 'Khách hàng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className='flex justify-between'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='mr-[30px]  items-center
                        gap-1 select-none flex hover:scale-105 
                        active:scale-100 cursor-pointer'>
                        <div className='h-[40px] w-[40px] rounded-full mr-2'>
                            <img src="../../../public/images/logo.webp" className="mt-1 mr-2" alt="" />

                        </div>
                        <Dropdown menu={menuProps} className='flex gap-3'>
                            <div className='flex'>
                                    <div className='flex flex-col'>
                                        <span className='font-[700] uppercase text-[#403e3e]'>
                                            {JSON.parse(localStorage.getItem("user"))?.name || "Đang cập nhật"}
                                        </span>
                                        <span className='mt-[-44px] text-[13px]  text-[#565555]'>
                                            {JSON.parse(localStorage.getItem("user"))?.position || "Đang cập nhật"}
                                        </span>
                                    </div>
                                <DownOutlined  className='mt-[40px] font-bold'/>
                            </div>
                        </Dropdown>
                    </div>

                </Header>
                <Content
                    style={{
                        margin: '10px',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
            <ToastContainer />
        </Layout>
    );
};
export default DashboardLayout;