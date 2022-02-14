import React from 'react';
import {Navigate , Outlet} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';

const useAuth = () => 
{
    return localStorage.getItem('userLogin');
}

export const PrivateRtoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Navigate to= {PATHS.DASHBOARD} /> : <Outlet/>;
};