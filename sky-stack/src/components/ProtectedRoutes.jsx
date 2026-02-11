import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top right, #1e293b, #0f172a, #020617)',
            }}>
                <CircularProgress sx={{ color: '#38bdf8' }} />
            </Box>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;