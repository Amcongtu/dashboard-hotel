import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListStatusRoom from '../components/statusRoom/TableListStatusRoom';

import Header from '../components/statusRoom/Header';
function StatusRoom(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListStatusRoom />
            </div>
        </DashboardLayout>
    );
}

export default StatusRoom;