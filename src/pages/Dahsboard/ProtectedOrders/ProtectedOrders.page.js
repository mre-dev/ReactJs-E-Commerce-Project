import { DashboardLayout, Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const ProtectedOrdersPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>سفارشات سایت | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست سفارشات سایت %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                مدیریت سفارشات کاربری
            </DashboardLayout>
        </div>
    );
};
