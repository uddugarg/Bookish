import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../_actions/user_action';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import './Login.css';

function Login(props) {

    const dispatch = useDispatch();

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

    const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const [error, setError] = useState('');

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={yup.object().shape({
                email: yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: yup.string()
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        email: values.email,
                        password: values.password,
                    }
                    dispatch(loginUser(submit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.id);
                                } else {
                                    localStorage.removeItem('rememberMe');
                                }
                                props.history.push('/');
                            } else {
                                setError('Invalid UserName or Password!');
                            }
                        })
                        .catch(err => {
                            setError('Again! Invalid UserName and Password!');
                            setTimeout(() => {
                                setError('')
                            }, 3000)
                        })
                    setSubmitting(false);
                }, 500)
            }}
        >

            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <div>
                        <div className='login__block'>
                            <h2>Login</h2>

                            <form onSubmit={handleSubmit}>
                                <center>
                                    <div className='login__fields'>
                                        <TextField id='login__field'
                                            name='email'
                                            label='Email'
                                            variant='outlined'
                                            type='email'
                                            values={values.email}
                                            onChange={handleChange}
                                            required
                                            className={
                                                errors.email && touched.email ? 'text-input error' : 'text-input'
                                            }>
                                            {errors.email && touched.email && (
                                                <div className='input-feedback'>{errors.email}</div>
                                            )}
                                        </TextField>

                                        <TextField id='login__field'
                                            name='password'
                                            label='Password'
                                            variant='outlined'
                                            type='password'
                                            values={values.password}
                                            onChange={handleChange}
                                            required
                                            className={
                                                errors.password && touched.password ? 'text-input error' : 'text-input'
                                            }>
                                            {errors.password && touched.password && (
                                                <div className='input-feedback'>{errors.email}</div>
                                            )}
                                        </TextField>
                                    </div>

                                    {error && (
                                        <label><p className='login__error'>{error}</p></label>
                                    )}

                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={rememberMe} onChange={handleRememberMe} color='primary' />
                                        }
                                        label='Remember Me'
                                    />

                                    <div className='login__btns'>
                                        <Button className='login__btn'
                                            variant='contained'
                                            type='submit'
                                            disabled={isSubmitting}
                                            onClick={handleSubmit}>Continue</Button>
                                    </div>
                                    <div className='login__links'>
                                        <a href='#'>Forgot Password?</a>
                                        <Link to='/register'>
                                            <p>Not Registered? Signup here</p>
                                        </Link>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                )
            }}

        </Formik>
    )
}

export default withRouter(Login);
