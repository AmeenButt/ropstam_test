import { Box, Grid, Typography } from "@mui/material";
import PopupBoxLarge from 'components/popupBoxLarge'
import PopupClose from 'components/popupClose'
export default function Default(props) {
    const {
        carId,
        cars,
        setViewCar,
    } = props
    return (
        <PopupBoxLarge>
            <PopupClose text='Car Information' onClose={() => { setViewCar(false) }} />
            {cars.map((item, index) => {
                return (item._id === carId) && <Box key={index}>
                    <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Name</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12} sm={6} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Color</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.color}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Make</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.make}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Model</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.model}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Year</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.year}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Category</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.category?.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{ borderBottom: '1px solid #00000012' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6} align='left' sx={{ padding: '10px' }}>
                            <Typography fontSize={'20px'} fontWeight={'600'} style={{ color: 'black' }}>Date Added</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} align='right' sx={{ padding: '10px', overflow: 'auto' }}>
                            <Typography fontSize={'20px'} fontWeight={'500'}>{item.created_at.substring(0, 10)}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            })}

        </PopupBoxLarge>
    )
}
