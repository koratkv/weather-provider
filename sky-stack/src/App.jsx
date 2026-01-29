import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  AppBar, 
  Toolbar, 
  Card, 
  CardContent, 
  Grid 
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguageIcon from '@mui/icons-material/Language';

function App() {
  return (
    /* Force the background to cover the entire browser width and height */
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh', 
      bgcolor: '#f4f6f8', 
      margin: 0, 
      padding: 0,
      overflowX: 'hidden' 
    }}>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} sx={{ width: '100%', bgcolor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CloudIcon sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: '800' }}>
              SkyStack
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>HOME</Button>
            <Button variant="contained" sx={{ bgcolor: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}>LOGIN</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container maxWidth={false} sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} lg={10}>
            <Card sx={{ 
              borderRadius: 8, 
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)', 
              textAlign: 'center', 
              p: { xs: 4, md: 12 }, 
              bgcolor: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'inline-flex', p: 3, bgcolor: '#e3f2fd', borderRadius: '50%', mb: 4 }}>
                  <LanguageIcon sx={{ fontSize: 80, color: '#1976d2' }} />
                </Box>
                
                <Typography variant="h1" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' } }}>
                  Material UI: Desktop Mode
                </Typography>
                
                <Typography variant="h5" color="text.secondary" sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}>
                  The environment has been successfully scaled. No more mobile constraints. 
                  Ready for the Climate Search Engine integration.
                </Typography>

                <Button 
                  variant="contained" 
                  sx={{ 
                    borderRadius: 4, 
                    px: 10, 
                    py: 3, 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold',
                    bgcolor: '#1976d2'
                  }}
                >
                  START SEARCH ENGINE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Typography variant="body2" color="text.secondary" align="center" sx={{ pb: 4 }}>
        Milestone 01 • System Architecture Verified • 2026
      </Typography>
    </Box>
  );
}

export default App;