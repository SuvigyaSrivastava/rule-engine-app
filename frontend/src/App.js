// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { getTheme } from './theme';
import CreateRule from './pages/CreateRule';
import CombineRules from './pages/CombineRules';
import EvaluateRule from './pages/EvaluateRule';
import ManageRules from './pages/ManageRules';  // New Page
import NavBar from './components/NavBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '100px' }}>
          <NavBar />

          {/* Night Mode Toggle Button */}
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </div>

          {/* Routes for Create Rule, Combine Rules, Evaluate Rule, Manage Rules */}
          <Routes>
            <Route path="/" element={<Navigate to="/create-rule" />} />
            <Route path="/create-rule" element={<CreateRule />} />
            <Route path="/combine-rules" element={<CombineRules />} />
            <Route path="/evaluate-rule" element={<EvaluateRule />} />
            <Route path="/manage-rules" element={<ManageRules />} />  {/* New Route */}
          </Routes>

          {/* Footer: Rule Engine Heading */}
          <footer style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            padding: '20px',
            background: '#1976d2',
            color: '#fff',
          }}>
            <h1>Rule Engine</h1>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
