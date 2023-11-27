import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { basePath } from 'url'
let itemStyle = {
    fontSize: '16px',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '500',
    '&:hover': {

        backgroundColor: 'transparent'
    },
}
export default function Default({ item, setAnchorEl }) {
    let navigator = useNavigate()
    let location = useLocation()
    return (
        <MenuItem onClick={() => {
            navigator(`/${basePath}/admin${item.path}`)
            console.log(`/${basePath}/admin${item.path}`)
            if(setAnchorEl){
                setAnchorEl(null);
            }
        }} >
            <Typography variant='h6' sx={{
                ...itemStyle,
                color: location.pathname == `/${basePath}/admin${item.path}`? 'black' : '#979797',
            }}>{item.name}</Typography>
        </MenuItem>
    )
}
