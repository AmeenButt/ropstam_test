import { Box } from '@mui/material'
import React from 'react'
import { Card, CardTitle } from 'reactstrap'
export default function Default(props) {
    const {name,value} = props;
    return (
        <Card style={{
            cursor: 'pointer',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
            padding: '30px',
        }}>
            <Box style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            >
                <CardTitle
                    tag="h1"
                >
                    {name}
                </CardTitle>
                <CardTitle
                    tag="h1"
                >
                    {value}
                </CardTitle>
            </Box>
        </Card>
    )
}
