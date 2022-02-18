import { Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';

export const HomePage = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>خانه | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="%REACT_APP_WEBSITE_NAME% - REACT_APP_WEBSITE_DESCRIPTION" />
            </Helmet>

            <Header/>
            Home
        </div>
    );
};
