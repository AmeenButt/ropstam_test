import { Box, Button } from '@mui/material'
import React from 'react'
import { authCenteredBox } from 'style'
import logo from 'assets/logo.jpg'
import CommonTypography from 'components/commonTypography'
import CommonTextField from 'components/commonTextField'
import NoticePopup from 'components/noticePopup'
import CommonButton from 'components/commonButton'
import useLogin from 'hooks/useLogin'
import { basePath } from 'url'
import { useNavigate } from 'react-router-dom'
export default function Default() {
    const {
        fields,
        formik,
        isLoading,
        errorMessage,
        error,
        setError
    } = useLogin()
    const navigator = useNavigate()
    return (
        <>
            <NoticePopup
                text={errorMessage}
                buttonText='Close'
                show={error}
                onClick={() => {
                    setError(false)
                }}
            />
            <Box sx={authCenteredBox}>
                <center><img src={logo} alt='logo' height={'90px'} /></center><br/>
                <Box sx={{
                    padding: '0px 35px'
                }}>
                    <CommonTypography
                        variant='header'
                        text='Sign In with Sport Addict Media'
                    />

                    <form onSubmit={formik.handleSubmit}>
                        {fields.map((field, index) => <CommonTextField
                            key={index}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={field.onChange}
                            handleBlur={field.handleBlur}
                            type={field.type}
                            formik={formik}
                        />
                        )}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems:'center',
                            marginBottom: '30px'
                        }}>
                            <CommonTypography
                                variant='header'
                                text='Did not have an account? '
                            />
                            <Button sx={{
                                color: '#06ABEB'
                            }} onClick={() => {
                                navigator(`/${basePath}/auth/signup`)
                            }}>Sign up</Button>
                        </Box>

                        <CommonButton
                            text='Sign In'
                            isLoading={isLoading}
                        />
                    </form>

                </Box>
            </Box>
        </>
    )
}
