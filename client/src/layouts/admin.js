import React from 'react'
import { Box } from '@mui/material';
import { basePath } from 'url';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import Navbar from 'components/navbar'
export default function Default(props) {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === `/${basePath}/admin`) {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact />
                );
            } else {
                return null;
            }
        });
    };
    return (
        <Box>
            <Navbar/>
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to={`/${basePath}/admin/`} replace />} />
                </Routes>
        </Box>
    )
}
