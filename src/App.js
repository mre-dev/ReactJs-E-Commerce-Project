import { getAppDescription, getAppTitle } from "./utils/functions.util";
import React, { Fragment } from 'react';
import { Helmet } from "react-helmet";
import { AppRouting } from "routes/index.routes";

export const App = (props) => {

    const appTitle = getAppTitle();
    const appDescription = getAppDescription();

    return (
        <Fragment>
            <Helmet>
                <title>{appTitle}</title>
                <meta name="description" content={appDescription} />
                <meta property="og:title" content={appTitle} />
                <meta property="og:description" content={appDescription} />
                <meta property="og:image" content={process.env.REACT_APP_WEBSITE_IMAGE} />
                <meta property="og:url" content={process.env.REACT_APP_WEBSITE_URL} />
                <meta property="og:site_name" content={appTitle} />
                <meta name="twitter:card" content={process.env.REACT_APP_WEBSITE_IMAGE} />
                <meta name="twitter:title" content={appTitle} />
                <meta name="twitter:description" content={appDescription} />
                <meta name="twitter:url" content={process.env.REACT_APP_WEBSITE_URL} />
                <meta name="twitter:site" content={appTitle} />
            </Helmet>
            <AppRouting/>
        </Fragment>
    );
}
