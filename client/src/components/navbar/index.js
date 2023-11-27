import { AppBar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from '../../assets/logo.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from 'routes'
import { basePath } from 'url';
import NavMenuItem from 'components/navbar/menuItem'
const navContainer = {
    height: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Roboto'
}
const navMenuIcon = {
    display: {
        xs: 'flex',
        sm: 'flex',
        md: 'none',
        lg: 'none'
    }
}
export default function Default() {
    let navigator = useNavigate()
    let location = useLocation()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar style={{
            backgroundColor: 'white',
            padding: '0px 10px',
            boxShadow: '0px 0px 15px rgba(0,0,0,0.2)'
        }}>
            {/* <Container style={navContainer}> */}
            <Box style={navContainer}>
                <Box>
                    <img src={logo} alt='logo' height={'90px'} />
                </Box>
                <Box sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'flex',
                        lg: 'flex',
                    },
                    position: 'relative',
                    fontSize: '14px'
                }}>
                    {routes.map((item, index) => {
                        if (item.layout == `/${basePath}/admin`) {
                            return <NavMenuItem key={index} item={item} />
                        }
                    }
                    )}
                    <MenuItem onClick={() => {
                        localStorage.clear()
                        navigator(`/${basePath}/auth`);
                        window.location.reload();
                    }} >
                        <Typography variant='h6' sx={{
                            fontSize: '16px',
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: '500',
                            color: '#979797',
                            '&:hover': {
                                backgroundColor: 'transparent'
                            },
                        }}>Logout</Typography>
                    </MenuItem>
                </Box>
                <IconButton sx={navMenuIcon}
                    aria-label="menu"
                    onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    sx={{
                        display: {
                            xs: 'flex',
                            sm: 'flex',
                            md: 'none',
                            lg: 'none'
                        },
                        marginTop: '15px',
                        alignItems: 'center',
                    }}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {routes.map((item, index) => {
                        if (item.layout == `/${basePath}/admin`) {
                            return <NavMenuItem
                                key={index}
                                item={item}
                                setAnchorEl={setAnchorEl}
                            />
                        }
                    }
                    )}
                    <MenuItem onClick={() => {
                        localStorage.clear()
                        navigator(`/${basePath}/auth`);
                        setAnchorEl(false)
                        window.location.reload();
                    }} >
                        <Typography variant='h6' sx={{
                            fontSize: '16px',
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: '500',
                            color: '#979797',
                            '&:hover': {
                                backgroundColor: 'transparent'
                            },
                        }}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            {/* </Container> */}
        </AppBar>
    )
}
