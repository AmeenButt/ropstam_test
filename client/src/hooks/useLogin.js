import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { basePath } from "url";
import { baseUrl } from "url";
import * as Yup from 'yup';
// eslint-disable-next-line
export default () => {
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigator = useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    let initialValues = {
        email: '',
        password: ''
    };
    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    let fields = [
        {
            name: 'email',
            placeholder: 'Email Address',
            value: formik.values.email,
            onChange: formik.handleChange,
            error: formik.touched.email,
            errorValue: formik.errors.email,
            handleBlur: formik.handleBlur,
            type: 'text',
            component: 'field'
        },
        {
            name: 'password',
            placeholder: 'Password',
            value: formik.values.password,
            onChange: formik.handleChange,
            error: formik.touched.password,
            errorValue: formik.errors.password,
            handleBlur: formik.handleBlur,
            type: 'password',
            component: 'field'
        }
    ]
    const handleSubmit = async (values) => {
        setisLoading(true)
        try {
            await fetch(`${baseUrl}user/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    localStorage.setItem('token', response.result.token)
                    navigator(`/${basePath}/admin/`)
                    window.location.reload();
                }
                else {
                    setError(true)
                    setErrorMessage(response.message)
                }
            })
        } catch (err) {
            setisLoading(false)
            setError(true)
            setErrorMessage('Server Error! Try Again')
            // navigator(`${basePath}/error`)
        }
        setisLoading(false)
    }
    return {
        fields,
        formik,
        isLoading,
        setisLoading,
        errorMessage,
        setErrorMessage,
        error,
        setError
    }
}