import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListRoom from '../components/room/TableListRoom';

import Header from '../components/room/Header';
function Room(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListRoom />
            </div>
        </DashboardLayout>
    );
}

export default Room;