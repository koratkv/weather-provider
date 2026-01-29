import React, { useState } from 'react';
import { 
  Container, Typography, Button, Box, AppBar, Toolbar, 
  TextField, Card, CardContent, Grid, InputAdornment, 
  CircularProgress, Alert, Fade, Paper
} from '@mui/material';
import { Search, Cloud, Thermostat, WaterDrop, Air, LocationOn, Public } from '@mui/icons-material';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY_HERE'; 

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather({
          name: data.name, country: data.sys.country,
          temp: Math.round(data.main.temp), humidity: data.main.humidity,
          wind: data.wind.speed, condition: data.weather[0].main,
        });
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      width: '100vw', minHeight: '100vh', 
      background: 'radial-gradient(circle at top right, #1e293b, #0f172a, #020617)',
      color: '#f8fafc', overflowX: 'hidden', margin: 0
    }}>
      {/* Premium Frosted AppBar */}
      <AppBar position="sticky" sx={{ 
        background: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)' 
      }} elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Public sx={{ color: '#38bdf8', fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -1, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SKYSTACK PRO
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 10 }}>
        {/* Sleek Search Bar */}
        <Paper elevation={0} sx={{ 
          p: '6px', display: 'flex', alignItems: 'center', 
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
            onClick={handleSearch}
            sx={{ 
              borderRadius: '15px', px: 4, py: 1.5,
              background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
              fontWeight: 'bold', textTransform: 'none',
              boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Paper>

        {error && <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: '12px', bgcolor: '#ef4444' }}>{error}</Alert>}

        {/* Premium Data Card */}
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
              <Box sx={{ p: 6, textAlign: 'center', background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.1), transparent)' }}>
                <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 600, letterSpacing: 2 }}>{weather.country}</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, my: 1 }}>{weather.name}</Typography>
                <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 900, background: 'linear-gradient(#fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {weather.temp}°
                </Typography>
                <Typography variant="h5" sx={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: 4 }}>{weather.condition}</Typography>
              </Box>

              <CardContent sx={{ p: 4, bgcolor: 'rgba(0,0,0,0.2)' }}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Thermostat sx={{ color: '#f87171', mb: 1, fontSize: 30 }} />
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.5 }}>FEELS LIKE</Typography>
                      <Typography variant="h6">{weather.temp}°C</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <WaterDrop sx={{ color: '#38bdf8', mb: 1, fontSize: 30 }} />
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.5 }}>HUMIDITY</Typography>
                      <Typography variant="h6">{weather.humidity}%</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Air sx={{ color: '#34d399', mb: 1, fontSize: 30 }} />
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.5 }}>WIND SPEED</Typography>
                      <Typography variant="h6">{weather.wind} m/s</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Container>
    </Box>
  );
}

export default App;