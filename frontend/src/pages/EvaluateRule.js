import React, { useState, useEffect } from 'react';
import { evaluateRule, getRules, getUsers } from '../services/api'; // Import getRules and getUsers APIs
import { Button, Paper, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function EvaluateRule() {
  const [rules, setRules] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all rules and users from MongoDB when the component is mounted
    async function fetchData() {
      try {
        const rulesData = await getRules();
        const usersData = await getUsers();
        setRules(rulesData);
        setUsers(usersData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await evaluateRule(selectedRule, selectedUser); // Send selected rule and user to API
      setResult(response);
      setError('');
    } catch (err) {
      setError('Failed to evaluate rule.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Evaluate Rule
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Rule</InputLabel>
            <Select
              value={selectedRule}
              onChange={(e) => setSelectedRule(e.target.value)}
            >
              {rules.map((rule) => (
                <MenuItem key={rule._id} value={rule.root}>
                  {rule.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Evaluate Rule
          </Button>
        </form>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h3">Evaluation Result:</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default EvaluateRule;
