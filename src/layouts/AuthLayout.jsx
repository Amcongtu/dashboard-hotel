import React from 'react';

function AuthLayout({children}) {
    return (
        <div className='login h-screen'>
            {children}
        </div>
    );
}

export default AuthLayout;