import { Typography } from '@mui/material'
import React from 'react'

export default function Default(props) {
    const { variant, text } = props
    return (
        <Typography sx={{
            fontSize: variant === 'header' ? '18px' : variant === 'label' ? '14px' : '16px',
            fontWeight: (variant === 'header' || variant === 'label') ? '600' : '500',
            color:(variant === 'label') ? '#8995A3' : 'black',
            margin:(variant === 'label') ? '10px 0px' : '0px 0px',
            
        }}>
            {text}
        </Typography>
    )
}
