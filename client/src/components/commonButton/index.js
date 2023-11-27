import { CircularProgress ,Button} from '@mui/material'
import React from 'react'
import { commonButton } from 'style'

export default function Default(props) {
    const {isLoading, text, onSubmit}=props;
    return (
        <Button
            type={onSubmit ? 'click':'submit'}
            variant='contained'
            sx={commonButton}
            onClick={onSubmit ? onSubmit : () => {}}
        >
            {
                isLoading ? <CircularProgress
                    size={30}
                    sx={{
                        color: 'white'
                    }}
                /> : text
            }
        </Button>
    )
}
