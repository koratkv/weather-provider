import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Box, AppBar, Toolbar,
    TextField, Card, CardContent, Grid, CircularProgress,
    Alert, Fade, Paper, IconButton, Menu, MenuItem, Avatar
} from '@mui/material';
import {
    Thermostat, WaterDrop, Air, LocationOn, Public,
    Menu as MenuIcon, Bookmark, BookmarkBorder, History as HistoryIcon,
    AccountCircle, Logout
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const { user, isAuthenticated, logout, addToHistory, addToSavedCities, removeFromSavedCities } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (location.state?.searchCity) {
        setCity(location.state.searchCity);
        handleSearch(location.state.searchCity);
        }
    }, [location.state]);

    useEffect(() => {
        if (weather && user?.savedCities) {
            const saved = user.savedCities.some(c => c.city === weather.name);
            setIsSaved(saved);
        }
    }, [weather, user]);

    const handleSearch = async (searchCity = city) => {
        if (!searchCity) return;
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/climate/get-data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city: searchCity }),
            });

            const data = await response.json();

            if (response.ok && data.weatherData) {
                const weatherInfo = {
                    name: data.geolocationData[0].name,
                    country: data.weatherData.sys.country,
                    temp: Math.round(data.weatherData.main.temp - 273.15),
                    feelsLike: Math.round(data.weatherData.main.feels_like - 273.15),
                    humidity: data.weatherData.main.humidity,
                    wind: data.weatherData.wind.speed,
                    condition: data.weatherData.weather[0].main,
                    description: data.weatherData.weather[0].description,
                };
                setWeather(weatherInfo);

                if (isAuthenticated) {
                    await addToHistory({
                        city: weatherInfo.name,
                        country: weatherInfo.country,
                    });
                }
            } 
            else {
                setError('City not found');
                setWeather(null);
            }
        } 
        catch (error) {
            console.log(error);
            setError('Connection failed. Please try again.');
            setWeather(null);
        } 
        finally {
            setLoading(false);
        }
    };

    const handleSaveCity = async () => {
        if (!weather) return;

        if (isSaved) {
            await removeFromSavedCities(weather.name);
        } 
        else {
            await addToSavedCities({
                city: weather.name,
                country: weather.country,
            });
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/login');
    };

    const handleSidebarCityClick = (cityName) => {
        setCity(cityName);
        handleSearch(cityName);
    };

    return (
        <Box sx={{
            width: '100vw',
            minHeight: '100vh',
            background: 'radial-gradient(circle at top right, #1e293b, #0f172a, #020617)',
            color: '#f8fafc',
            overflowX: 'hidden',
            margin: 0
        }}>
        <AppBar position="sticky" sx={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }} elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {isAuthenticated && (
                <IconButton
                    onClick={() => setSidebarOpen(true)}
                    sx={{ color: '#38bdf8', mr: 1 }}
                >
                    <MenuIcon />
                </IconButton>
                )}
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {isAuthenticated ? (
                <>
                    <IconButton
                        onClick={() => navigate('/history')}
                        sx={{ color: '#94a3b8' }}
                    >
                    <HistoryIcon />
                    </IconButton>
                    <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#38bdf8' }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                            bgcolor: 'rgba(30, 41, 59, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white'
                            }
                        }}
                    >
                    <MenuItem disabled>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {user?.email}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Logout fontSize="small" sx={{ mr: 1 }} />
                        Logout
                    </MenuItem>
                    </Menu>
                </>
                ) : (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/login')}
                        sx={{
                            borderColor: 'rgba(56, 189, 248, 0.5)',
                            color: '#38bdf8',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                            borderColor: '#38bdf8',
                            bgcolor: 'rgba(56, 189, 248, 0.1)'
                            }
                        }}
                    >
                    Login
                    </Button>
                    <Button
                    variant="contained"
                    onClick={() => navigate('/signup')}
                    sx={{
                        background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                    >
                        Sign Up
                    </Button>
                </>
                )}
            </Box>
            </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Paper elevation={0} sx={{
                p: '6px',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                mb: 6,
                boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}>
            <TextField
                fullWidth
                placeholder="Explore city climates..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                variant="standard"
                InputProps={{
                disableUnderline: true,
                startAdornment: <LocationOn sx={{ color: '#38bdf8', mx: 2 }} />,
                sx: { color: 'white', fontSize: '1.1rem' }
                }}
                sx={{ px: 1 }}
            />
            <Button
                variant="contained"
                onClick={() => handleSearch()}
                disabled={loading}
                sx={{
                borderRadius: '15px',
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)'
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
            </Paper>

            {error && (
            <Alert severity="error" variant="filled" sx={{
                mb: 4,
                borderRadius: '12px',
                bgcolor: '#ef4444'
            }}>
                {error}
            </Alert>
            )}

            {weather && (
            <Fade in={true} timeout={800}>
                <Card sx={{
                    borderRadius: '32px',
                    background: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    overflow: 'hidden'
                }}>
                <Box sx={{
                    p: 6,
                    textAlign: 'center',
                    background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.1), transparent)'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{
                        color: '#38bdf8',
                        fontWeight: 600,
                        letterSpacing: 2
                    }}>
                        {weather.country}
                    </Typography>
                    {isAuthenticated && (
                        <IconButton
                            onClick={handleSaveCity}
                            sx={{
                                ml: 2,
                                color: isSaved ? '#fbbf24' : '#94a3b8',
                                '&:hover': { color: '#fbbf24' }
                            }}
                        >
                            {isSaved ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                    )}
                    </Box>
                    <Typography variant="h2" sx={{ fontWeight: 900, my: 1 }}>
                        {weather.name}
                    </Typography>
                    <Typography variant="h1" sx={{
                        fontSize: '6rem',
                        fontWeight: 900,
                        background: 'linear-gradient(#fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                    {weather.temp}°
                    </Typography>
                    <Typography variant="h5" sx={{
                        opacity: 0.7,
                        textTransform: 'uppercase',
                        letterSpacing: 4
                    }}>
                    {weather.condition}
                    </Typography>
                    <Typography variant="body2" sx={{
                        opacity: 0.5,
                        textTransform: 'capitalize',
                        mt: 1
                    }}>
                        {weather.description}
                    </Typography>
                </Box>

                <CardContent sx={{ p: 4, bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                        <Thermostat sx={{ color: '#f87171', mb: 1, fontSize: 30 }} />
                        <Typography variant="caption" sx={{
                            display: 'block',
                            opacity: 0.5
                        }}>
                            FEELS LIKE
                        </Typography>
                        <Typography variant="h6">{weather.feelsLike}°C</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                        <WaterDrop sx={{ color: '#38bdf8', mb: 1, fontSize: 30 }} />
                        <Typography variant="caption" sx={{
                            display: 'block',
                            opacity: 0.5
                        }}>
                            HUMIDITY
                        </Typography>
                        <Typography variant="h6">{weather.humidity}%</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                        <Air sx={{ color: '#34d399', mb: 1, fontSize: 30 }} />
                        <Typography variant="caption" sx={{
                            display: 'block',
                            opacity: 0.5
                        }}>
                            WIND SPEED
                        </Typography>
                        <Typography variant="h6">{weather.wind} m/s</Typography>
                        </Box>
                    </Grid>
                    </Grid>
                </CardContent>
                </Card>
            </Fade>
            )}
        </Container>

        <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onCityClick={handleSidebarCityClick}
        />
        </Box>
    );
}

export default Dashboard;