import React, { useState } from 'react';
import { 
  Container, Typography, Button, Box, AppBar, Toolbar, 
  TextField, Card, CardContent, Grid, InputAdornment, CircularProgress 
} from '@mui/material';
import { Search, Cloud, Thermostat, WaterDrop, Air } from '@mui/icons-material';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleSearch = () => {
    if (!city) return;
    setLoading(true);
    // Simulation for PR #2
    setTimeout(() => {
      setWeather({
        name: city,
        temp: 24,
        humidity: 70,
        wind: 15,
        condition: 'Partly Cloudy'
      });
      setLoading(false);
    }, 800);
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f6f8', overflowX: 'hidden' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#1976d2' }}>
        <Toolbar><Cloud sx={{ mr: 2 }} /><Typography variant="h6" sx={{ fontWeight: 'bold' }}>SkyStack</Typography></Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>) }}
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />
          <Button variant="contained" onClick={handleSearch} sx={{ px: 4, borderRadius: 2, fontWeight: 'bold' }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Box>

        {weather && (
          <Card sx={{ borderRadius: 6, boxShadow: '0 20px 60px rgba(0,0,0,0.05)', p: 4 }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>{weather.name}</Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>{weather.condition}</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#fff5f5', borderRadius: 4 }}>
                    <Thermostat sx={{ color: '#f44336' }} /><Typography variant="h5"><strong>{weather.temp}°C</strong></Typography>
                  </Box>
                </Grid>
                {/* ... (Humidity and Wind boxes) */}
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}

export default App;