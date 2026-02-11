import React from 'react';
import {
  Drawer, Box, Typography, List, ListItem, ListItemButton,
  ListItemText, IconButton, Divider, Chip
} from '@mui/material';
import { Close, BookmarkBorder, Delete } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function Sidebar({ open, onClose, onCityClick }) {
  const { user, removeFromSavedCities } = useAuth();

  const handleCityClick = (city) => {
    onCityClick(city.city);
    onClose();
  };

  const handleRemoveCity = async (e, cityName) => {
    e.stopPropagation();
    await removeFromSavedCities(cityName);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookmarkBorder sx={{ color: '#38bdf8' }} />
            <Typography variant="h6" sx={{
              color: 'white',
              fontWeight: 700
            }}>
              Saved Cities
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: '#94a3b8' }}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <Chip
            label={`${user?.savedCities?.length || 0} cities saved`}
            size="small"
            sx={{
              bgcolor: 'rgba(56, 189, 248, 0.1)',
              color: '#38bdf8',
              fontWeight: 600
            }}
          />
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {!user?.savedCities || user.savedCities.length === 0 ? (
            <Box sx={{
              p: 4,
              textAlign: 'center',
              color: '#64748b'
            }}>
              <BookmarkBorder sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
              <Typography variant="body2">
                No saved cities yet
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                Save cities to quickly access their weather
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 1 }}>
              {user.savedCities.map((cityData, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={(e) => handleRemoveCity(e, cityData.city)}
                      sx={{
                        color: '#ef4444',
                        '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  }
                  sx={{ mb: 1 }}
                >
                  <ListItemButton
                    onClick={() => handleCityClick(cityData)}
                    sx={{
                      borderRadius: '12px',
                      bgcolor: 'rgba(30, 41, 59, 0.4)',
                      '&:hover': {
                        bgcolor: 'rgba(30, 41, 59, 0.6)',
                      },
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <ListItemText
                      primary={cityData.city}
                      secondary={cityData.country}
                      primaryTypographyProps={{
                        sx: {
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.95rem'
                        }
                      }}
                      secondaryTypographyProps={{
                        sx: {
                          color: '#64748b',
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;