import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListRoomType from '../components/roomType/TableListRomtype';

import Header from '../components/roomType/Header';
import Widget from '../components/roomType/Widget';
function RoomType(props) {
    const data = [];
    for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
    }
    return (
        <DashboardLayout>
            <Widget/>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListRoomType data={data}  />
            </div>
        </DashboardLayout>
    );
}

export default RoomType;