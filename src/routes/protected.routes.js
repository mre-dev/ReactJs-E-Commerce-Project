import React from 'react';
import {Navigate , Outlet} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';

const useAuth = () => 
{
    return localStorage.getItem('userLogin');
}

export const ProtectedRtoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to= {PATHS.LOGIN} />;
};