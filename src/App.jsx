import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Loading from './views/Loading';
import Home from './views/Home';
import RoomType from './views/RoomType';
import { useSelector } from 'react-redux'
import Dashboard from './views/Dashboard';
import AddRoomType from './views/AddRoomType';
import Room from './views/Room';
import AddRoom from './views/AddRoom';
import Service from './views/Service';
import AddService from './views/AddService';
import Booking from './views/Booking';
import Envoice from './views/Envoice';
import Employee from './views/Employee';
import Customer from './views/Customer';
import StatusRoom from './views/StatusRoom';

function App() {
    const isAuthor = useSelector((state) => state.auth.isAuthor)

    const isLoggedIn = useSelector((state) => state.auth.isLogin)

    console.log(isAuthor)
    const handleSetUser = (user) => {
        localStorage.setItem("user", user)
    }



    return (
        <Router>
            <Routes>
                {/* <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/"
                    element={isLoggedIn ? <Loading onGetPosition={handleSetUser} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/home"
                    element={isLoggedIn && isAuthor ? <Home /> : <Navigate to="/" />}
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn && isAuthor ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/room-type"
                    element={isLoggedIn ? <RoomType /> : <Navigate to="/" />}
                />
                <Route
                    path="/room-type/add"
                    element={isLoggedIn ? <AddRoomType /> : <Navigate to="/" />}
                /> */}


                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login />}
                />
                {/* Kiểm tra isLoggedIn, nếu không có access_token thì redirect về trang login */}
                <Route
                    path="/"
                    element={isLoggedIn ? <Loading onGetPosition={handleSetUser} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/home"
                    element={isLoggedIn? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/room-type"
                    element={isLoggedIn? <RoomType /> : <Navigate to="/login" />}
                />
                <Route
                    path="/room-type/add"
                    element={isLoggedIn? <AddRoomType /> : <Navigate to="/login" />}
                />


                <Route
                    path="/room/"
                    element={isLoggedIn? <Room /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/room/add"
                    element={isLoggedIn? <AddRoom /> : <Navigate to="/login" />}
                />


                <Route
                    path="/service/"
                    element={isLoggedIn? <Service /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/service/add"
                    element={isLoggedIn? <AddService /> : <Navigate to="/login" />}
                />
                {/* đặt phòng */}
                <Route
                    path="/booking/"
                    element={isLoggedIn? <Booking /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/booking/add"
                    element={isLoggedIn? <AddService /> : <Navigate to="/login" />}
                />
                {/* Thanh toán */}
                 <Route
                    path="/envoice/"
                    element={isLoggedIn? <Envoice /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/envoice/add"
                    element={isLoggedIn? <AddService /> : <Navigate to="/login" />}
                />
                {/* Nhân viên */}
                <Route
                    path="/employee/"
                    element={isLoggedIn? <Employee /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/employee/add"
                    element={isLoggedIn? <AddService /> : <Navigate to="/login" />}
                />
                
                {/* Khách hàng */}
                <Route
                    path="/customer/"
                    element={isLoggedIn? <Customer /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/customer/add"
                    element={isLoggedIn? <AddService /> : <Navigate to="/login" />}
                />

                {/* Trạng thái phòng */}
                <Route
                    path="/statusRoom/"
                    element={isLoggedIn? <StatusRoom /> : <Navigate to="/login" />}
                />
                  <Route
                    path="/statusRoom/add"
                    element={isLoggedIn? <AddService /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;