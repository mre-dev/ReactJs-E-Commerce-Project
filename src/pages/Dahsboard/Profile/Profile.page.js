import { DashboardLayout, Footer, Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UserProfilePage = (props) => {
    return (
        <div className="contentWithHeaderAndFooter">
            <Helmet>
                <meta charSet="utf-8" />
                <title>پروفایل کاربری | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="پروفایل کاربری %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>
            <DashboardLayout>
                پروفایل کاربری
            </DashboardLayout>

            <Footer/>
        </div>
    );
};
