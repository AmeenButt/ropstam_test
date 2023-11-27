import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import DashboardCard from 'components/dashBoardCard'
import useDashboard from 'hooks/useDashboard'
export default function Default() {
    const { cardData, getData } = useDashboard()
    useEffect(() => {
        getData()
    }, [])

    return (
        <Box sx={{ marginTop: '120px' }}>
            <Grid container spacing={3}>
                {cardData.map((item, index) => (
                    <Grid item key={index} xs={12} sm={12} md={4} lg={4}>
                        <DashboardCard name={item.name} value={item.value} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
