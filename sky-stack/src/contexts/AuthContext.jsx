import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            return { success: true };
        }
        return { success: false, message: data.message };
  };

    const signup = async (name, email, password, confirmPassword) => {
        const response = await fetch(`${API_BASE_URL}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            return { success: true };
        }
        return { success: false, message: data.message };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const addToHistory = async (cityData) => {
        if (!token) return;
        try {
            await fetch(`${API_BASE_URL}/user/add-to-history`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cityData),
            });
            fetchUserProfile();
        } 
        catch (error) {
            console.error('Error adding to history:', error);
        }
    };

    const addToSavedCities = async (cityData) => {
        if (!token) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/add-to-saved-cities`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cityData),
            });
            const data = await response.json();
            if (data.success) {
                fetchUserProfile();
                return { success: true };
            }
            return { success: false };
        } 
        catch (error) {
            console.error('Error adding to saved cities:', error);
        return { success: false };
        }
    };

    const removeFromSavedCities = async (cityName) => {
        if (!token) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/remove-from-saved-cities`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ city: cityName }),
            });
            const data = await response.json();
            if (data.success) {
                fetchUserProfile();
                return { success: true };
            }
            return { success: false };
        } 
        catch (error) {
            console.error('Error removing from saved cities:', error);
            return { success: false };
        }
    };

    const removeFromHistory = async (cityName) => {
        if (!token) return;
        try {
            await fetch(`${API_BASE_URL}/user/remove-from-history`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ city: cityName }),
            });
            fetchUserProfile();
        } 
        catch (error) {
            console.error('Error removing from history:', error);
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        logout,
        addToHistory,
        addToSavedCities,
        removeFromSavedCities,
        removeFromHistory,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};