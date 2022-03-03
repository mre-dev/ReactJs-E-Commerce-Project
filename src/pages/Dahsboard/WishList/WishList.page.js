import { DashboardLayout, Footer, Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UserWishListPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>لیست علاقه مندی ها | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="پروفایل کاربری %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                لیست علاقه مندی ها
            </DashboardLayout>

            <Footer/>
        </div>
    );
};
