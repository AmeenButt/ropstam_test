import { Box } from '@mui/material'
import React from 'react'
import { overlay1 } from 'style'
import { mainPopupBoxLarge } from 'style'

export default function Default(props) {

    
    return (
        <div style={{ ...overlay1, animation: 'slideUp 0.4s ease-in-out' }}>
            <Box sx={mainPopupBoxLarge}>
                {props.children}
            </Box>
        </div>


    )
}
