import React, { useState } from 'react';
import {
  Box, Container, TextField, Button, Typography, Alert,
  Paper, InputAdornment, IconButton, Link
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #1e293b, #0f172a, #020617)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{
          p: 6,
          borderRadius: '32px',
          background: 'rgba(30, 41, 59, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{
              fontWeight: 900,
              background: 'linear-gradient(to right, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>
              Sign in to access your weather dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#94a3b8' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<LoginIcon />}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)',
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Don't have an account?{' '}
              <Link
                onClick={() => navigate('/signup')}
                sx={{
                  color: '#38bdf8',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;