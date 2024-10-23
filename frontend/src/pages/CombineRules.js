// src/pages/CombineRules.js
import React, { useState, useEffect } from 'react';
import { combineRules, getRules } from '../services/api'; // Make sure you import getRules API
import { TextField, Button, Paper, Typography, Box, IconButton, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReactJson from 'react-json-view';

function CombineRules() {
  const [rules, setRules] = useState([]);  // List of rules fetched from MongoDB
  const [selectedRules, setSelectedRules] = useState([]); // Selected rules to combine
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Fetch the rules from the server
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await getRules();
        setRules(fetchedRules);
      } catch (error) {
        setError('Failed to fetch rules.');
      }
    };
    fetchRules();
  }, []);

  const handleRuleSelect = (index, value) => {
    const updatedSelectedRules = [...selectedRules];
    updatedSelectedRules[index] = value;
    setSelectedRules(updatedSelectedRules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await combineRules(selectedRules.map(rule => rule.root));  // Pass only the "root" part of each rule
      setResult(response);
      setError('');
    } catch (error) {
      setError(`Error combining rules: ${error.message}`);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Combine Rules
        </Typography>
        <form onSubmit={handleSubmit}>
          {selectedRules.map((selectedRule, index) => (
            <TextField
              key={index}
              select
              fullWidth
              label={`Select Rule ${index + 1}`}
              variant="outlined"
              margin="normal"
              value={selectedRule?._id || ''}
              onChange={(e) => handleRuleSelect(index, rules.find(rule => rule._id === e.target.value))}
              required
            >
              {rules.map((rule) => (
                <MenuItem key={rule._id} value={rule._id}>
                  {rule.name}
                </MenuItem>
              ))}
            </TextField>
          ))}
          <IconButton color="primary" onClick={() => setSelectedRules([...selectedRules, {}])} sx={{ mt: 2 }}>
            <AddIcon /> Add Rule
          </IconButton>
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Combine Rules
          </Button>
        </form>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h3">Combined Rule:</Typography>
            <ReactJson src={result} collapsed={true} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CombineRules;
