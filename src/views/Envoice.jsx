import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout"
import TableListEnvoice from '../components/envoice/TableListEnvoice';

import Header from '../components/envoice/Header';
function Envoice(props) {
    return (
        <DashboardLayout>
            <Header/>
            <div className='bg-white rounded-md p-3 shadow-md shadow-slate-200'>
                "Đang cập nhật"
                {/* <TableListEnvoice /> */}
            </div>
        </DashboardLayout>
    );
}

export default Envoice;