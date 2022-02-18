import { Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UserCategoryPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>دسهت بندی ها | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست دسته بندی های %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            دسته بندی محصولات
        </div>
    );
};
