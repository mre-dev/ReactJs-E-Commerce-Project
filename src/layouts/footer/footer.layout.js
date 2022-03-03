import {Navigation} from 'components';
import React from 'react';
import Styles from './footer.module.css';
import Logo from 'assets/images/logos/logo.png';

export const Footer = (props) => {
    return (
        <footer>
            <div className={Styles.footerContent}>

                <div className={Styles.aboutUs}>
                    <div>
                        <img src={Logo} alt="لوگو فروشگاه فون نت"/>
                        <p>فون نت</p>
                    </div>
                    <p>
                        فون نت یک فروشگاه اینترنتی با ارائه خدمات در سراسر کشور، اینک در آستانه‌ی آغاز
                        فعالیت، با گستره‌ای از کالاهای متنوع مرتبط با موبایل برای تمام اقشار جامعه و هر
                        رده‌ی سنی، برای کاربران خود «تجربه‌ی لذت‌بخش یک خرید اینترنتی» را تداعی می‌کند.
                    </p>
                </div>

                <div className={Styles.another}>
                    <strong>اطلاعات</strong>
                    <Navigation link='#' text='درباره ما'/>
                    <Navigation link='#' text='تماس با ما'/>
                    <Navigation link='#' text='قوانین و مقررات'/>
                    <Navigation link='#' text='حریم خصوصی'/>
                </div>

                <div className={Styles.services}>
                    <strong>خدمات مشتریان</strong>
                    <Navigation link='#' text='تخفیف ها' internal/>
                    <Navigation link='#' text='شرایط و قوانین' internal/>
                    <Navigation link='#' text='سوالات متداول' internal/>
                    <Navigation link='#' text='بازگرداندن کالا' internal/>
                </div>

                <div className={Styles.help}>
                    <strong>راهنما</strong>
                    <Navigation link='#' text='واحد تامین' internal/>
                    <Navigation link='#' text='فرصت شغلی' internal/>
                    <Navigation link='#' text='خدمات بازاریابی' internal/>
                    <Navigation link='#' text='خدمات فروش' internal/>
                </div>

                <div className={Styles.contactUs}>
                    <strong>تماس با ما</strong>
                    <Navigation link="tel:09913440342" text="+989913440342" external/>
                    <Navigation link="tel:03137763138" text="031 -37763138" external/>
                    <Navigation link="tel:09121212121" text="09121212121" external/>
                    <Navigation link="mailto:test@gmail.com" text="test@gmail.com" external/>
                </div>

            </div>

            <div className={Styles.footerCopyRight}>
                <p>Copyright © 2020. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
