import { Button, Input, Navigation } from 'components';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Styles from './Register.gage.module.css';
import allStates from 'utils/state.json';
import allCities from 'utils/cities.json';
import { userRegisterValidationSchema } from 'validations';
import swal from 'sweetalert';
import { Register } from 'api/userRegister.api';

export const RegisterPage = (props) => {

    const Navigate = useNavigate();

    const [disableFormStatus, setDisableFormStatus] = useState(false);

    const [states, setStates] = useState(allStates);
    const [stateId, setStateId] = useState(null);
    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState(null);
    const [stateName, setStateName] = useState(null);
    const [cityName, setCityName] = useState(null);

    const [userNameError, setUserNameError] = useState(null);
    const [passwordError1, setPasswordError1] = useState(null);
    const [passwordError2, setPasswordError2] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const [mobileError, setMobileError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [stateError, setStateError] = useState(null);
    const [cityError, setCityError] = useState(null);
    const [postalCodeError, setPostalCodeError] = useState(null);

    const registerUser = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const data = Object.fromEntries(form);

        setUserNameError(null);
        setPasswordError1(null);
        setPasswordError2(null);
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setMobileError(null);
        setAddressError(null);
        setStateError(null);
        setCityError(null);
        setPostalCodeError(null);

        const validData = await userRegisterValidationSchema.validate(data).catch(err => {
            err.message.type == 'username' ? setUserNameError(err.message) : setUserNameError(null);
            err.message.type == 'password2' ? setPasswordError2(err.message) : setPasswordError2(null);
            err.message.type == 'password1' ? setPasswordError1(err.message) : setPasswordError1(null);
            err.message.type == 'firstName' ? setFirstNameError(err.message) : setFirstNameError(null);
            err.message.type == 'lastName' ? setLastNameError(err.message) : setLastNameError(null);
            err.message.type == 'email' ? setEmailError(err.message) : setEmailError(null);
            err.message.type == 'phone' ? setMobileError(err.message) : setMobileError(null);
            err.message.type == 'address' ? setAddressError(err.message) : setAddressError(null);
            err.message.type == 'postalCode' ? setPostalCodeError(err.message) : setPostalCodeError(null);
            return false;
        });

        if(validData != false) {

            const userNameRegex = new RegExp("^[a-zA-Z0-9_.-]*$");

            if(!userNameRegex.test(data.username)) {
                setUserNameError('?????? ???????????? ???????? ???????? ???????? ?????????????? ?? ?????????? ????????');
                return false;
            }

            if(data.password1 != data.password2) {
                swal({
                    title: "??????",
                    text: "???????? ???????? ???? ?????????? ???? ???????????? ??????????",
                    icon: "error",
                });
                return false;
            }

            const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
            if(!passwordRegex.test(data.password1) || !passwordRegex.test(data.password2)) {
                swal({
                    title: "??????",
                    text: "???????? ???????? ???????? ?????????? ???????? ???? ?????? ???????? ?? ???? ?????? ???????? ?? ???? ?????? ?? ???? ?????????????? ?????? ????????",
                    icon: "error",
                });
                return false;
            }

            const mobileRegex = new RegExp("[0]{1}[9]{1}[0-9]{9}");
            if(!mobileRegex.test(data.phone)) {
                setMobileError('?????????? ???????????? ???????? ???????? 11 ?????? ???????? . ???????? : 09913440342');
                return false;
            }

            if(stateId == null) {
                setStateError({message: "???????? ?????????? ?? ?????? ???? ???????????? ????????"});
                return false;
            }

            if(cityId == null) {
                setCityError({message: "???????? ?????? ???? ???????????? ????????"});
                return false;
            }

            const postalCodeRegex = new RegExp("[0-9]{10}");
            if(!postalCodeRegex.test(data.postalCode)) {
                setPostalCodeError({message: "???? ???????? ???????? ???????? 10 ?????? ????????"});
                return false;
            }

            setDisableFormStatus(true);
        
            try {

                data.state = stateName;
                data.city = cityName;

                const response = await Register(data);
                if(response.status == 201) {
                    swal ({
                        title: "?????? ?????? ???? ???????????? ?????????? ????",
                        text: "?????????? ???????????????? ???????? ???????? ???????????? ?????? ????????",
                        icon: "success",
                        button: "????????",
                    });
                    document.getElementById("register-form").reset();
                }
            } catch (e) {
                setDisableFormStatus(false);
                e.response.status == 409 ? 
                swal({
                    title: "??????",
                    text: "?????? ?????? ?????????? ???????? ?????? ?????? ???????? ??????",
                    icon: "error",
                }) :
                e.response.status == 410 ?
                swal({
                    title: "??????",
                    text: "?????? ?????????? ???????? ???????? ?????? ?????? ??????",
                    icon: "error",
                }) :
                e.response.status == 411 ?
                swal({
                    title: "??????",
                    text: "?????? ?????????? ???????????? ???????? ?????? ?????? ??????",
                    icon: "error",
                }) :
                swal({
                    title: "??????",
                    text: "?????????? ???? ???????? ???? ???????? ??????",
                    icon: "error",
                });
                    
            }

            setDisableFormStatus(false);
        }
    }

    useEffect(() => {
        if(stateId != null) {
            setCities(allCities.filter(city => city.province_id == stateId));
            const fintStateName = allStates.find(state => state.id == stateId);
            setStateName(fintStateName.name);
        }
    }, [stateId]);

    useEffect(() => {
        if(cityId != null) {
            const fintCityName = allCities.find(city => city.id == cityId);
            setCityName(fintCityName.name);
        }
    }, [cityId]);

    return (
        <div className={Styles.registerPage}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>?????? ?????? | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="?????? ?????? ???? ???????? %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <div className={Styles.backToHomeBox}>
                <Button
                    className={Styles.backToHomeButton}
                    click={() => { Navigate('/'); }}
                    type='primary'
                    size='small'
                    borderRadius={true}
                    text="????????"
                    shake
                />

                <Button
                    className={Styles.backToHomeButton}
                    click={() => { Navigate('/Login'); }}
                    type='primary'
                    size='small'
                    borderRadius={true}
                    text="????????"
                    shake
                />
            </div>

            <div className={Styles.RegisterBox}>
                <h1>?????? ?????? ???? {process.env.REACT_APP_WEBSITE_NAME}</h1>
                <h3>???????? ?????? ?????? ???? ???????? ???? ?????? ?????? ?????????????? ????????.</h3>
                <form onSubmit={registerUser} id='register-form'>
                    <div>
                        
                        <Input type="text" id="username" name='username' placeholder='?????? ????????????' disabled={disableFormStatus} required={false} />
                        {userNameError && <p className={Styles.errorMessage}>{userNameError.message}</p>}
                        <div className={Styles.twoColRow}>
                            <div>
                                <Input type="password" id="password1" name='password1' placeholder='?????? ????????' disabled={disableFormStatus} required={false} />
                                {passwordError1 && <p className={Styles.errorMessage}>{passwordError1.message}</p>}
                            </div>
                            <div>
                                <Input type="password" id="password2" name='password2' placeholder='?????????? ?????? ????????' disabled={disableFormStatus} required={false} />
                                {passwordError2 && <p className={Styles.errorMessage}>{passwordError2.message}</p>}
                            </div>
                        </div>
                        <div className={Styles.twoColRow}>
                            <div>
                                <Input type="text" id="firstName" name='firstName' placeholder='??????' disabled={disableFormStatus} required={false} />
                                {firstNameError && <p className={Styles.errorMessage}>{firstNameError.message}</p>}
                            </div>
                            <div>
                                <Input type="text" id="lastName" name='lastName' placeholder='?????? ????????????????' disabled={disableFormStatus} required={false} />
                                {lastNameError && <p className={Styles.errorMessage}>{lastNameError.message}</p>}
                            </div>
                        </div>
                        <Input type="email" id="email" name='email' placeholder='?????????? ?????? ???? ???????? ????????' disabled={disableFormStatus} required={false} />
                        {emailError && <p className={Styles.errorMessage}>{emailError.message}</p>}
                        <Input type="number" id="phone" name='phone' placeholder='?????????? ???????? ?????? ???? ???????? ????????' disabled={disableFormStatus} required={false} />
                        {mobileError && <p className={Styles.errorMessage}>{mobileError.message}</p>}
                        <div className={Styles.twoColRow}>
                            <div>
                                <select id="state" name='state' disabled={disableFormStatus} required={false} onChange={(event) => {
                                    setStateId(event.target.value);
                                }}>
                                    <option value={null} disabled selected>??????????</option>
                                    {states.map((state) => {
                                        return (
                                            <option key={state.id} value={state.id}>{state.name}</option>
                                        )
                                    })}
                                </select>
                                {stateError && <p className={Styles.errorMessage}>{stateError.message}</p>}
                            </div>
                            <div>
                                <select id="city" name='city' disabled={disableFormStatus} required={true}  onChange={(event) => {
                                    setCityId(event.target.value);
                                }}>
                                    <option value={null} disabled selected>??????</option>
                                    {cities.map((city) => {
                                        return (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        )
                                    })}
                                </select>
                                {cityError && <p className={Styles.errorMessage}>{cityError.message}</p>}
                            </div>
                        </div>
                        <textarea id="address" name='address' placeholder='???????? ???????? ???????? ?????? ???? ???????? ????????' disabled={disableFormStatus} required={false} />
                        {addressError && <p className={Styles.errorMessage}>{addressError.message}</p>}
                        <Input type="text" id="postalCode" name='postalCode' placeholder='???? ????????' disabled={disableFormStatus} required={false} />
                        {postalCodeError && <p className={Styles.errorMessage}>{postalCodeError.message}</p>}
                        <Button type="success" size='small' text='?????? ??????' borderRadius={true} disabled={disableFormStatus} />
                    </div>
                </form>
            </div>

        </div>
    );
};
