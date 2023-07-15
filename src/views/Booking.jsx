import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListBooking from '../components/booking/TableListBooking';

import Header from '../components/service/Header';
function Booking(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListBooking />
            </div>
        </DashboardLayout>
    );
}

export default Booking;