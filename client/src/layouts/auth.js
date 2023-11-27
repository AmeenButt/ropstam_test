import React from 'react'
import { Box } from '@mui/material';
import background from 'assets/authBackground.png'
import { basePath } from 'url';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
export default function Default() {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === `/${basePath}/auth`) {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact />
                );
            } else {
                return null;
            }
        });
    };
    return (
        <Box sx={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
            width: '100%',
            height: '100vh'
        }}>
            <Box sx={{
                background: 'linear-gradient(to right,rgba(6, 171, 235, 0.5), rgba(216, 255, 255, 0.5))',
                width: '100%',
                height: '100vh'
            }}>
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to={`/${basePath}/auth/login`} replace />} />
                </Routes>
            </Box>
        </Box>
    )
}
