import React from 'react'
import PopupBoxLayout from 'components/popupBoxSmall';
import { Box } from '@mui/material';
import CommonButton from 'components/commonButton';
import CommonTypography from 'components/commonTypography';
export default function Default(props) {
    const { text, buttonText, onClick, show } = props;
    return (
        <>
            {
                show && <PopupBoxLayout>
                    <Box sx={{
                        padding: '20px 20px 0px 20px'
                    }}>
                        <center>
                            <Box sx={{
                                margin: '0px 0px 40px 0px'
                            }}>
                                <CommonTypography
                                    variant='pararaph'
                                    text={text}
                                />
                            </Box>
                        </center>
                        <center>
                            <CommonButton
                                text={buttonText}
                                isLoading={false}
                                onSubmit={onClick}
                            />
                        </center>
                    </Box>
                </PopupBoxLayout>
            }
        </>
    )
}
