import { DashboardLayout, Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UserOrdersPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>سفارشات | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="سفارشات %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                سفارشات کاربری
            </DashboardLayout>
        </div>
    );
};
