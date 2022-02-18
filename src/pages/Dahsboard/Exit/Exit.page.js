import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDataWhenLogin } from 'redux/type';

export const UserExitPage = (props) => {

    const customDispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('userData');
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('IS_LOGGED_IN');
        customDispatch(setUserDataWhenLogin());
        Navigate('/');
    }, []);

    return (
        <div>
            Exit Page
        </div>
    );
};
