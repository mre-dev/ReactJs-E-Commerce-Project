import { DashboardLayout, Footer, Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UserSettingPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>تنظیمات | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="تنظیمات %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                تنظیمات کاربری
            </DashboardLayout>

            <Footer/>
        </div>
    );
};
