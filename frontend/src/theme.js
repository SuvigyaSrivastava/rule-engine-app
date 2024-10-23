// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1976d2', // Blue
      },
      secondary: {
        main: '#ffffff', // White
      },
    },
  });
