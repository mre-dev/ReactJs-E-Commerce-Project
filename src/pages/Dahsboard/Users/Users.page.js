import { DashboardLayout, Footer, Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UsersListPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>لیست کاربران | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست کاربران %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                لیست کاربران
            </DashboardLayout>

            <Footer/>
        </div>
    );
};
