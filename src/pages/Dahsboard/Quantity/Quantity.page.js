import { Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const UserQuantityPage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>موجودی محصولات | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="موجودی محصولات %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            موجودی محصولات
        </div>
    );
};
