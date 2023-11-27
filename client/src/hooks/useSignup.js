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
        email: Yup.string().required('Email is required').email('Invalid Email'),
        name: Yup.string().required('Name is required').min(3,'Name should be of atleast 3 characters'),
    });
    let initialValues = {
        email: '',
        name: ''
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
            name: 'name',
            placeholder: 'Name',
            value: formik.values.name,
            onChange: formik.handleChange,
            error: formik.touched.name,
            errorValue: formik.errors.name,
            handleBlur: formik.handleBlur,
            type: 'text',
            component: 'field'
        },
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
        }
    ]
    const handleSubmit = async (values) => {
        setisLoading(true)
        try {
            await fetch(`${baseUrl}user/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    name:values.name
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    localStorage.setItem('token', response.result.token)
                    navigator(`/${basePath}/auth/login`)
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