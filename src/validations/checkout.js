import * as yup from 'yup';

export const checkoutValidationSchema = yup.object().shape({
    name: yup.string().required({type: 'name', message: 'نام را وارد کنید.'}),
    family: yup.string().required({type: 'username', message: 'نام خانوادگی را وارد کنید.'}),
    address: yup.string().required({type: 'address', message: 'آدرس خود را به صورت کامل همراه با پلاک وارد کنید.'}),
    phone: yup.string().required({type: 'phone', message: 'شماره تلفن را وارد کنید.'}).max(11, {type: 'phone', message: 'شماره تلفن باید 11 رقم باشد . مثال 09913440342'}).min(11, {type: 'phone', message: 'شماره تلفن باید 11 رقم باشد . مثال 09913440342'}),
    date: yup.string().required({type: 'date', message: 'تاریخ را انتخاب کنید.'}),
});