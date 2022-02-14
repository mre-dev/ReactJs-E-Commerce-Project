import { Button, Input, Navigation } from 'components';
import React, { useEffect, useState } from 'react';
import Styles from './Login.gage.module.css';
import { Helmet } from 'react-helmet';
import { FaLessThan } from 'assets/images/icons';
import { userLoginValidationSchema } from 'validations';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const LoginPage = (props) => {

    const Navigate = useNavigate();

    const [userNameError, setUserNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [disableFormStatus, setDisableFormStatus] = useState(false);

    const loginUser = async (event) => {
        event.preventDefault();
        let formDate = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        
        setUserNameError(null);
        setPasswordError(null);

        const validData = await userLoginValidationSchema.validate(formDate).catch(err => {
            if (err.message.type == 'username') {
                setUserNameError(err.message);
            } else {
                setUserNameError(null);
            }

            if (err.message.type == 'password') {
                setPasswordError(err.message);
            } else {
                setPasswordError(null);
            }
            return false;
        });

        console.log(validData);
        if(validData != false) {
            setDisableFormStatus(true);
            localStorage.setItem('userLogin', JSON.stringify({...validData, loggedIn: true}));
            swal({
                title: "ورود موفقت آمیز",
                text: "تا ثانیه ای دیگر به پنل کاربری هدایت خواهید شد ...",
                icon: "success",
                timer: 2500,
            });
            setTimeout(() => {
                Navigate('/dashboard');
            }, 2500);
        }
    }
    
    return (
        <div className={Styles.loginPage}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ورود - {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="ورود به سایت %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <div className={Styles.loginBox}>
                <h1>ورود به {process.env.REACT_APP_WEBSITE_NAME}</h1>
                <h3>برای ورود به سایت از فرم زیر استفاده کنید.</h3>
                <form onSubmit={loginUser}>
                    <div>
                        <Input type="text" id="username" placeholder='نام کاربری' disabled={disableFormStatus} />
                        {userNameError && <p className={Styles.errorMessage}>{userNameError.message}</p>}
                        <Input type="password" id="password" placeholder='رمز عبور' disabled={disableFormStatus} />
                        {passwordError && <p className={Styles.errorMessage}>{passwordError.message}</p>}
                        <Button type="success" size='large' text='ورود' borderRadius={true} disabled={disableFormStatus} />
                    </div>
                </form>
                <p><Navigation link="/register" text='ثبت نام' internal/></p>
            </div>
        </div>
    );
};
