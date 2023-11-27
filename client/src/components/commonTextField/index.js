import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { InputGroup } from 'reactstrap'
import { commonTexfield } from 'style.js'
import CommonTypography from 'components/commonTypography'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function Default(props) {
    const { value, onChange, handleBlur, name, placeholder, type, formik } = props
    const [showPassword, setShowPassword] = useState(false);
    return (
        <InputGroup style={{
            margin: '25px 0px',
        }}>
            <CommonTypography variant="label" text={placeholder} />
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                type={(type === 'password') ? (showPassword ? 'text' : 'password') : (type)}
                sx={{
                    ...commonTexfield,
                    borderColor: (formik.errors[name]) ? 'red' : 'transparent',
                    "& fieldset": {
                        border: (formik.errors[name]) ? '1px solid red' : 'none'
                    },
                }}
                InputProps={{
                    style: {
                        borderRadius: '10px',
                        height: '55px',
                    },
                    endAdornment: type === 'password' && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}

            />
            {formik && ((formik.touched[name] && formik.errors[name]) &&
                <div style={{
                    color: 'red',
                    fontSize: '12px',
                    padding: '10px'
                }}>{formik.errors[name]}</div>)}
        </InputGroup>
    )
}
