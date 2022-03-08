import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogOut } from 'redux/actions';

export const UserExitPage = (props) => {

    const customDispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('userData');
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('IS_LOGGED_IN');
        customDispatch(userLogOut());
        Navigate('/');
    }, []);

    return (
        <div>
            Exit Page
        </div>
    );
};
