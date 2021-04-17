import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { registerUser } from '../_actions/user_action';
import { Button, TextField } from '@material-ui/core';

function Register(props) {

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                lastName: '',
                firstName: '',
            }}
            validationSchema={yup.object().shape({
                firstName: yup.string()
                    .required('Name is required'),
                lastName: yup.string()
                    .required('Last Name is required'),
                email: yup.string()
                    .email('Email format is Invalid!')
                    .required('Email is required'),
                password: yup.string()
                    .min(8, 'Password must be at least of 8 characters')
                    .required('Password is required'),
                confirmPassword: yup.string()
                    .oneOf([yup.ref('password'), null])
                    .required('This field is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                    }

                    dispatch(registerUser(submit)).then(response => {
                        if (response.payload.success) {
                            props.history.push('/login');
                        } else {
                            alert(response.payload.err.errmsg)
                        }
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
                    <div className='register__block'>
                        <h2>Register</h2>

                        <form onSubmit={handleSubmit}>
                            <center>
                                <div className='register__fields'>
                                    <TextField id='register_field'
                                        name='firstName'
                                        label='First Name'
                                        variant='outlined'
                                        type='text'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.firstName && touched.firstName ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <p className='input-feedback'>{errors.firstName}</p>
                                    )}

                                    <TextField id='register_field'
                                        name='lastName'
                                        label='Last Name'
                                        variant='outlined'
                                        type='text'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <p className='input-feedback'>{errors.lastName}</p>
                                    )}

                                    <TextField id='register_field'
                                        name='email'
                                        label='Email'
                                        variant='outlined'
                                        type='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <p className='input-feedback'>{errors.email}</p>
                                    )}
                                    <TextField id='register_field'
                                        name='password'
                                        label='Password'
                                        variant='outlined'
                                        type='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <p className='input-feedback'>{errors.password}</p>
                                    )}
                                    <TextField id='register_field'
                                        name='confirmPassword'
                                        label='Confirm Password'
                                        variant='outlined'
                                        type='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <p className='input-feedback'>{errors.confirmPassword}</p>
                                    )}
                                </div>

                                <div className='register__btns'>
                                    <Button type='submit' variant='contained' onClick={handleSubmit} disabled={isSubmitting}>Sign Up</Button>
                                </div>
                            </center>
                        </form>
                    </div>
                )
            }}

        </Formik>
    )
}

export default Register
