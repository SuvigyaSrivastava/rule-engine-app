import React, { useState } from 'react';
import { createRule } from '../services/api';  // Assume you have an API service for making requests
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

function CreateRule() {
  const [ruleString, setRuleString] = useState('');
  const [ruleName, setRuleName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRule({ name: ruleName, ruleString });
      setResult(response);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while creating the rule.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create a New Rule
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Rule Name"
            variant="outlined"
            margin="normal"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Rule String"
            variant="outlined"
            margin="normal"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Create Rule
          </Button>
        </form>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h3">Created Rule:</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CreateRule;
