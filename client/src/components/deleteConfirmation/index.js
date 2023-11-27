
import { Box, Grid, Typography,Button } from "@mui/material";
import {CircularProgress} from '@mui/material';
import DeleteIcon from 'assets/delImg.png'
export default function Default(props) {
    const { disableDelete,
        isLoading, setConfirmDelete } = props;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color for the overlay
            zIndex: 11111,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px'
        }}>
            <Box style={{
                width: '548px',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '16px',
                padding: '25px 25px 50px 25px'
            }}>
                <center><img src={DeleteIcon} height={'50px'} width={'50px'} style={{margin:'30px'}}/></center>
                <form onSubmit={props.onDelete}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <Typography fontSize='20px'>Are you sure you want to delete this Entry?</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        </Grid>
                        <Grid item xs={0} sm={2} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button
                                    disabled={disableDelete}
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#ffb400',
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        position: 'relative',
                                        cursor:'pointer'
                                    }}
                                    type='submit'
                                    variant='contained'
                                    onClick={() => { setConfirmDelete(false) }}
                                >

                                    Cancel
                                </Button>
                                <Button
                                    disabled={disableDelete}
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'red',
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        position: 'relative',
                                        cursor:'pointer',
                                        minWidth:'120px'
                                    }}
                                    type='submit'
                                    variant='contained'
                                >
                                    {isLoading ? (
                                        // If loading, show the CircularProgress component
                                        <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                                    ) : (
                                        // If not loading, show the "Send Code" text
                                        'Delete'
                                    )}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    )
}
