import { Navigation } from "components";
import { PATHS } from "configs/routes.config";
import React, { Fragment, useState } from "react";
import Styles from './dashboardLayout.module.css';

export const DashboardLayout = (props) => {

  const userData = localStorage.hasOwnProperty('userData') ? JSON.parse(localStorage.getItem('userData')) : {};
  console.log(userData);

  return (
      <div className={Styles.DashboardLayout}>
        <div className={Styles.row}>
            
            <div className={Styles.sideBar}>
                <Navigation link={PATHS.DASHBOARD_PROFILE} text="پروفایل کاربری" internal />
                <Navigation link={PATHS.DASHBOARD_ORDERS} text="سفارشات" internal />
                <Navigation link={PATHS.DASHBOARD_WISHLIST} text="لیست علاقه مندی" internal/>
                <Navigation link={PATHS.DASHBOARD_SETTINGS} text="تنظیمات" internal />
                <hr/>
                {
                    userData.role == 'admin' &&
                    <Fragment>
                        <Navigation link={PATHS.DASHBOARD_ADMIN_ORDERS} text="سفارشات مدیریتی" internal />
                        <Navigation link={PATHS.DASHBOARD_PRODUCT} text="مدیریت محصولات" internal />
                        <Navigation link={PATHS.DASHBOARD_CATEGORY} text="مدیریت دسته بندی" internal />
                        <Navigation link={PATHS.DASHBOARD_QUANTITY} text="مدیریت موجودی" internal />
                        <Navigation link={PATHS.DASHBOARD_USERS} text="مدیریت کاربران" internal />
                        <hr/>
                    </Fragment>
                }
                
                <Navigation link={PATHS.DASHBOARD_EXIT} text="خروج" internal />
            </div>
            <div className={Styles.mainContent}>
                {props.children}
            </div>

        </div>
    </div>
  );
}