import * as yup from 'yup';

export const userLoginValidationSchema = yup.object().shape({
    password: yup.string().required({type: 'password', message: 'رمز عبور را وارد کنید.'}),
    username: yup.string().required({type: 'username', message: 'نام کاربری را وارد کنید.'})
});