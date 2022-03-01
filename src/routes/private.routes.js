import React, { useEffect } from 'react';
import { Navigate , Outlet, useLocation } from 'react-router-dom';
import { PATHS } from 'configs/routes.config';
import { CheckUserExpired } from 'utils/functions.util';

const useAuth = () => 
{
    if(localStorage.hasOwnProperty('IS_LOGGED_IN') && localStorage.getItem('IS_LOGGED_IN') != "false")
    {
        return true;
    } else {
        return false;
    }
}

export const PrivateRtoutes = () => {

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("Private");
    },[location]);

    const isAuth = useAuth();
    return isAuth ? <Navigate to= {PATHS.DASHBOARD} /> : <Outlet/>;
};