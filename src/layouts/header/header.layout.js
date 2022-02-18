import React, { Fragment, useEffect, useState } from 'react';
import Styles from './header.module.css';
import Logo from 'assets/images/logos/logo.png';
import { Input, Navigation } from 'components';
import { BsBasket2, FaUserCircle } from 'assets/images/icons';
import { DebounceInput } from 'react-debounce-input';

export const Header = (props) => {

    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState({});

    useEffect(()=> {
        if(localStorage.hasOwnProperty('userData') && JSON.parse(localStorage.getItem('userData')).loggedIn) {
            setIsUserLogin(true);
            setUserLoginInfo(JSON.parse(localStorage.getItem('userData')));
        }
    }, []);

    const basketItems = [
    ] 

    const[CountBasketItem, setCountBasketItem] = useState(basketItems.length);
    const[Search, setSearch] = useState('');

    return (
        <header className={Styles.header}>

            <div className={Styles.topHeader}>

                <div className={Styles.logoBox}>
                    <Navigation link="/" text={<img src={Logo} alt="Phone Net logo" />} internal />
                </div>

                <div className={Styles.searchBox}>

                    <DebounceInput
                        debounceTimeout={1000}
                        forceNotifyByEnter={true}
                        placeholder="جست و جوی محصول ..."
                        onChange={(event) => {
                            event.preventDefault();
                            setSearch(event.target.value);
                            console.log(event.target.value);
                        }}
                    />

                </div>

                <div className={Styles.userBox}>
                    <ul>

                        <li className={Styles.basketBox} >
                            <p id='basketCounter'>{CountBasketItem}</p>
                            <Navigation link="/basket" text={<BsBasket2/>} internal/>
                        </li>


                        <li className={Styles.userIconBox}>
                            <FaUserCircle onMouseEnter={() => {
                                setIsUserOpen(true);
                            }}/>

                            {isUserOpen &&
                                <div className={Styles.userMenuBox} onMouseLeave={() => {
                                    setIsUserOpen(false);
                                }}>
                                    <ul>
                                        {isUserLogin ?
                                        <Fragment>
                                            <li className={Styles.userBoxFName}><Navigation link='#' text={`${userLoginInfo.firstName} خوش آمدی`} internal/></li>
                                            <li><Navigation link="/dashboard/profile" text="پروفایل" internal/></li>
                                            <li><Navigation link="/dashboard/orders" text="سفارشات" internal/></li>
                                            <li><Navigation link="/dashboard/wishlist" text="لیست علاقه مندی" internal/></li>
                                            <li><Navigation link="/dashboard/settings" text="تنظیمات" internal/></li>
                                            {userLoginInfo.role == "admin" &&
                                                <div className={Styles.adminMenuItem}>
                                                    <li><Navigation link="/dashboard/protected-orders" text="سفارشات مدیریتی" internal/></li>
                                                    <li><Navigation link="/dashboard/product" text="محصولات" internal/></li>
                                                    <li><Navigation link="/dashboard/quantity" text="مقادیر" internal/></li>
                                                    <li><Navigation link="/dashboard/category" text="دسته بندی" internal/></li>
                                                    <li><Navigation link="/dashboard/users" text="کاربران" internal/></li>
                                                </div>
                                            }
                                            <li><Navigation link="/dashboard/logout" text="خروج" internal/></li>
                                        </Fragment> :
                                        <Fragment>
                                            <li><Navigation link="/login" text="ورود" internal/></li>
                                            <li><Navigation link="/register" text="ثبت نام" internal/></li>
                                        </Fragment>
                                        }
                                    </ul>
                                </div>
                            }
                        </li>

                    </ul>
                </div>

            </div>

            <div className={Styles.bottomHeader}>
                <ul>
                    <li><Navigation link="/products/apple" text="اپل" internal/></li>
                    <li><Navigation link="/products/samsung" text="سامسونگ" internal/></li>
                    <li><Navigation link="/products/xiaomi" text="شیائومی" internal/></li>
                    <li><Navigation link="/products/nokia" text="نوکیا" internal/></li>
                    <li><Navigation link="/products/huawei" text="هواوی" internal/></li>
                    <li><Navigation link="/products/lg" text="ال جی" internal/></li>
                    <li><Navigation link="/products/gplus" text="جی پلاس" internal/></li>
                    <li><Navigation link="/products/caterpillar" text="کاترپیلار" internal/></li>
                    <li><Navigation link="/products/glx" text="جی ال ایکس" internal/></li>
                    <li><Navigation link="/products/blackberry" text="بلک بری" internal/></li>
                </ul>
            </div>

        </header>
    );
}
