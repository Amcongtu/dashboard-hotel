import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListCustomer from '../components/customer/TableListCustomer';

import Header from '../components/customer/Header';

function Customer(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListCustomer />
            </div>
        </DashboardLayout>
    );
}

export default Customer;