import { Button, Input, Navigation } from 'components';
import React, { useEffect, useState } from 'react';
import Styles from './Login.gage.module.css';
import { Helmet } from 'react-helmet';
import { userLoginValidationSchema } from 'validations';
import { useNavigate, useSearchParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Login } from 'api/userLogin.api';
import { useDispatch } from 'react-redux';
import { setUserDataWhenLogin } from 'redux/type';
import history from 'services/history.service';

export const LoginPage = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (searchParams.get('expired') == 'true') {
            swal({
                title: "خطا",
                text: "اعتبار کاربری شما به پایان رسیده است . لطفا دوباره وارد شوید",
                icon: "error",
                button: "باشه",
            });
            history.push('/login');
        }
    }, [searchParams]);


    const customDispatch = useDispatch();
    const Navigate = useNavigate();

    const [userNameError, setUserNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [disableFormStatus, setDisableFormStatus] = useState(false);

    const loginUser = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const data = Object.fromEntries(form);
        
        setUserNameError(null);
        setPasswordError(null);

        const validData = await userLoginValidationSchema.validate(data).catch(err => {
            err.message.type == 'username' ? setUserNameError(err.message) : setUserNameError(null);
            err.message.type == 'password' ? setPasswordError(err.message) : setPasswordError(null);
            return false;
        });

        if(validData != false) {
            setDisableFormStatus(true);

            try {
                const response = await Login(data);

                customDispatch(setUserDataWhenLogin(response));

                if(response.token) {
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
            } catch (e) {
                console.log(e);
                setDisableFormStatus(false);
                e.response.status == 400 ? swal('خطا', "کاربر مورد نظر یافت نشد", 'error') : swal('خطا', "خطایی رخ داده است", 'error');
            }
        }
    }
    
    return (
        <div className={Styles.loginPage}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ورود | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="ورود به سایت %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <div className={Styles.backToHomeBox}>
                <Button
                    className={Styles.backToHomeButton}
                    click={() => { Navigate('/'); }}
                    type='primary'
                    size='small'
                    borderRadius={true}
                    text="خانه"
                    shake
                />

                <Button
                    className={Styles.backToHomeButton}
                    click={() => { Navigate('/Register'); }}
                    type='primary'
                    size='small'
                    borderRadius={true}
                    text="ثبت نام"
                    shake
                />
            </div>

            <div className={Styles.loginBox}>
                <h1>ورود به {process.env.REACT_APP_WEBSITE_NAME}</h1>
                <h3>برای ورود به سایت از فرم زیر استفاده کنید.</h3>
                <form onSubmit={loginUser}>
                    <div>
                        <Input type="text" id="username" name='username' placeholder='نام کاربری' disabled={disableFormStatus} />
                        {userNameError && <p className={Styles.errorMessage}>{userNameError.message}</p>}
                        <Input type="password" id="password" name='password' placeholder='رمز عبور' disabled={disableFormStatus} />
                        {passwordError && <p className={Styles.errorMessage}>{passwordError.message}</p>}
                        <Button type="success" size='large' text='ورود' borderRadius={true} disabled={disableFormStatus} />
                    </div>
                </form>
            </div>
        </div>
    );
};
