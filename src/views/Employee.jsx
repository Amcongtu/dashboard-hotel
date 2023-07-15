import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListEmployee from '../components/employee/TableListEmployee';

import Header from '../components/employee/Header';

function Employee(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListEmployee />
            </div>
        </DashboardLayout>
    );
}

export default Employee;