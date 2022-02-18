import * as yup from 'yup';

export const userRegisterValidationSchema = yup.object().shape({
    postalCode: yup.string().required({type: 'postalCode', message: 'کد پستی را وارد کنید'}).max(10, {type: 'postalCode', message: 'کد پستی باید 10 رقم باشد .'}).min(10, {type: 'postalCode', message: 'کد پستی باید 10 رقم باشد .'}),
    address: yup.string().required({type: 'address', message: 'آدرس خود را به صورت کامل همراه با پلاک وارد کنید'}),
    phone: yup.string().required({type: 'phone', message: 'شماره تلفن را وارد کنید'}).max(11, {type: 'phone', message: 'شماره تلفن باید 11 رقم باشد . مثال 09913440342'}).min(11, {type: 'phone', message: 'شماره تلفن باید 11 رقم باشد . مثال 09913440342'}),
    email: yup.string().required({type: 'email', message: 'ایمیل را وارد کنید'}).email({type: 'email', message: 'ایمیل را به درستی وارد کنید', regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}),
    lastName: yup.string().required({type: 'lastName', message: 'نام خانوادگی را وارد کنید'}).max(50, {type: 'lastName', message: 'نام خانوادگی باید کمتر از 50 کاراکتر باشد'}),
    firstName: yup.string().required({type: 'firstName', message: 'نام را وارد کنید'}).max(50, {type: 'firstName', message: 'نام باید کمتر از 50 کاراکتر باشد'}),
    password2: yup.string().required({type: 'password2', message: ' تکرار رمز عبور را وارد کنید.'}).min(6, {type: 'password2', message: 'کلمه عبور باید حداقل 6 کاراکتر باشد.'}).max(20, {type: 'password2', message: 'کلمه عبور باید حداکثر 20 کاراکتر باشد.'}),
    password1: yup.string().required({type: 'password1', message: 'رمز عبور را وارد کنید.'}).min(6, {type: 'password1', message: 'تکرار کلمه عبور باید حداقل 6 کاراکتر باشد.'}).max(20, {type: 'password1', message: ' تکرار کلمه عبور باید حداکثر 20 کاراکتر باشد.'}).oneOf([yup.ref('password1'), null], {type: 'password1', message: 'کلمه عبور با تکرار آن مطابقت ندارد.'}),
    username: yup.string().required({type: 'username', message: 'نام کاربری را وارد کنید.'}),
});