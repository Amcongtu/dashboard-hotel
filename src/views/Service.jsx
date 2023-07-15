import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListService from '../components/service/TableListService';

import Header from '../components/service/Header';
function Service(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                <TableListService />
            </div>
        </DashboardLayout>
    );
}

export default Service;