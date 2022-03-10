import React from 'react';
import Styles from './NotFoundStyle.module.css';
import { AiOutlineQuestionCircle } from 'assets/images/icons'
import { Footer, Header } from 'layouts';
import { Navigation } from 'components';

export const NotFoundPage = (props) => {
    return (
        <div className="contentWithHeaderAndFooter">
            <Header />
                <div className={Styles.mainbox}>
                    <div className={Styles.err}>4</div>
                    <AiOutlineQuestionCircle />
                    <div className={Styles.err2}>4</div>
                </div>
                <div className={Styles.text}>
                    <p>صفحه مورد نظر یافت نشد</p>
                    <Navigation text={'بازگشت به صفحه اصلی'} link="/" intenal/>
                </div>
            <Footer />
        </div>
    );
};
