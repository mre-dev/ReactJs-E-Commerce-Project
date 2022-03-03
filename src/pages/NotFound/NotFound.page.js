import { Footer, Header } from 'layouts';
import React from 'react';

export const NotFoundPage = (props) => {
    return (
        <div className="contentWithHeaderAndFooter">
            <Header />
                <p>Page Not Fount</p>
            <Footer />
        </div>
    );
};
