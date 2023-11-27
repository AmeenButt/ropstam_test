export const authCenteredBox = {
    minWidth: {
        xs: '80vw',
        sm: '80vw',
        md: '33vw',
        lg: '33vw',
    },
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderRadius: '16px',
    boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.5)',
    padding: {
        xs: '40px 20px',
        sm: '40px 20px',
        md: '50px',
        lg: '50px',
    },
}
export const commonTexfield = {
    width: '100%',
    backgroundColor: '#F4F5F6',
    height: '55px',
    borderRadius: '10px',
    "& label.Mui-focused": {
        color: 'transparent',
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
        borderBottomColor: 'transparent'
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
        borderBottomColor: 'transparent'
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: 'red'
        }
    }
}
export const commonButton = {
    width: '100%',
    backgroundColor: '#06ABEB',
    borderRadius: '26px',
    minHeight: '44px'
}
export const overlay = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '1111'
}
export const commonOtpField = {
    width: '70px',
    backgroundColor: '#F4F5F6',
    fontSize: '24px',
    height: '55px',
    textAlign: 'center',
    border: '0px',
    '&:focus': {
        border: '0px'
    }
}

export const overlay1 = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '1111',

}
export const mainPopupBoxSmall = {
    position: 'fixed',
    zIndex: '11111',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    width: {
        xs: '90%',
        sm: '90%',
        md: '45%',
        lg: '35%',
        xl: '35%'
    },
    border: '1px solid #00000012',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
}
export const mainPopupBoxLarge = {
    position: 'fixed',
    zIndex: '11111',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
    overflow: 'auto',
    width: {
        xs: '90%',
        sm: '90%',
        md: '60%',
        lg: '60%',
        xl: '40%'
    },
    border: '1px solid #00000012',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
}