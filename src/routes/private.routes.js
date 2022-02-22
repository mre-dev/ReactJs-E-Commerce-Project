import React, { useEffect } from 'react';
import { Navigate , Outlet, useLocation } from 'react-router-dom';
import { PATHS } from 'configs/routes.config';
import { CheckUserExpired } from 'utils/functions.util';

const useAuth = () => 
{
    return localStorage.getItem('IS_LOGGED_IN');
}

export const PrivateRtoutes = () => {

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("Private");
    },[location]);

    const isAuth = useAuth();
    return isAuth ? <Navigate to= {PATHS.DASHBOARD} /> : <Outlet/>;
};