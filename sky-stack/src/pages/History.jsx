import React from 'react';
import {
    Box, Container, Typography, Card, CardContent, Grid,
    AppBar, Toolbar, IconButton, Chip, Button
} from '@mui/material';
import {
    History as HistoryIcon, ArrowBack, Delete, Public,
    LocationOn, AccessTime
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function History() {
    const { user, removeFromHistory } = useAuth();
    const navigate = useNavigate();

    const handleRemove = async (cityName) => {
        await removeFromHistory(cityName);
    };

    const handleCityClick = (cityName) => {
        navigate('/', { state: { searchCity: cityName } });
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at top right, #1e293b, #0f172a, #020617)',
            color: '#f8fafc',
        }}>
        <AppBar position="sticky" sx={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }} elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/')} sx={{ color: '#38bdf8' }}>
                <ArrowBack />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Public sx={{ color: '#38bdf8', fontSize: 32 }} />
                    <Typography variant="h5" sx={{
                        fontWeight: 900,
                        letterSpacing: -1,
                        background: 'linear-gradient(to right, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        SKYSTACK PRO
                    </Typography>
                </Box>
            </Box>
            </Toolbar>
        </AppBar>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <HistoryIcon sx={{ fontSize: 40, color: '#38bdf8' }} />
                    <Typography variant="h3" sx={{
                        fontWeight: 900,
                        color: 'white'
                    }}>
                        Search History
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
                    View all the cities you've searched for
                </Typography>
                <Chip
                    icon={<AccessTime />}
                    label={`${user?.cityHistory?.length || 0} cities in history`}
                    sx={{
                    bgcolor: 'rgba(56, 189, 248, 0.1)',
                    color: '#38bdf8',
                    fontWeight: 600,
                    px: 1
                    }}
                />
                </Box>

                {!user?.cityHistory || user.cityHistory.length === 0 ? (
                <Card sx={{
                    borderRadius: '24px',
                    background: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    p: 6,
                    textAlign: 'center'
                }}>
                    <HistoryIcon sx={{ fontSize: 80, color: '#38bdf8', opacity: 0.3, mb: 2 }} />
                    <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                        No search history yet
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
                        Start searching for cities to see them here
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                                borderRadius: '12px',
                                px: 4,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
                                fontWeight: 'bold',
                                textTransform: 'none',
                        }}
                    >
                        Search Cities
                    </Button>
                </Card>
                ) : (
                <Grid container spacing={3}>
                    {user.cityHistory.map((cityData, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{
                            borderRadius: '20px',
                            background: 'rgba(30, 41, 59, 0.4)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            transition: 'all 0.3s',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 24px rgba(56, 189, 248, 0.2)',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                            }
                        }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box
                                onClick={() => handleCityClick(cityData.city)}
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <LocationOn sx={{ color: '#38bdf8', fontSize: 20 }} />
                                <Typography variant="h6" sx={{
                                    color: 'white',
                                    fontWeight: 700
                                }}>
                                    {cityData.city}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{
                                color: '#64748b',
                                mb: 2
                            }}>
                                {cityData.country}
                            </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                onClick={() => handleCityClick(cityData.city)}
                                sx={{
                                borderColor: 'rgba(56, 189, 248, 0.3)',
                                color: '#38bdf8',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: '#38bdf8',
                                    bgcolor: 'rgba(56, 189, 248, 0.1)'
                                }
                                }}
                            >
                                View
                            </Button>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemove(cityData.city)}
                                    sx={{
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                                            borderColor: '#ef4444'
                                        }
                                    }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                )}
            </Container>
        </Box>
    );
}

export default History;