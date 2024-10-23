import React, { useState, useEffect } from 'react';
import { getRules, updateRule } from '../services/api';
import { TextField, Button, Paper, Typography, Box, MenuItem, Select, FormControl } from '@mui/material';
import ReactJson from 'react-json-view';

function ManageRules() {
  const [rules, setRules] = useState([]);          // Store all fetched rules
  const [selectedRule, setSelectedRule] = useState(null); // The selected rule to edit
  const [ruleString, setRuleString] = useState(''); // The rule string (AST)
  const [ruleName, setRuleName] = useState('');     // The rule name
  const [result, setResult] = useState(null);       // Result from update
  const [error, setError] = useState('');           // Any error messages

  // Fetch all rules on component mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await getRules();
        setRules(fetchedRules);
      } catch (error) {
        setError('Error fetching rules.');
      }
    };
    fetchRules();
  }, []);

  // Handle rule selection
  const handleRuleChange = (rule) => {
    setSelectedRule(rule);
    setRuleName(rule.name);
    setRuleString(JSON.stringify(rule.root, null, 2));  // Show AST in readable format
  };

  // Handle form submission to update rule
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRule) {
      setError('No rule selected to update.');
      return;
    }

    try {
      const updatedData = {
        name: ruleName,
        root: JSON.parse(ruleString),  // Convert ruleString back to AST format
      };
      const response = await updateRule(selectedRule._id, updatedData);  // Send PUT request to update rule
      setResult(response);  // Store the result of the update
      setError('');
    } catch (error) {
      setError('Error updating rule. Please check the input format.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Manage Existing Rules
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={selectedRule ? selectedRule._id : ''}
            onChange={(e) => handleRuleChange(rules.find((rule) => rule._id === e.target.value))}
            displayEmpty
          >
            <MenuItem value="" disabled>Select a Rule</MenuItem>
            {rules.map((rule) => (
              <MenuItem key={rule._id} value={rule._id}>
                {rule.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedRule && (
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
              label="Rule String (AST)"
              variant="outlined"
              margin="normal"
              multiline
              rows={6}
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Update Rule
            </Button>
          </form>
        )}

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h3">Updated Rule:</Typography>
            <ReactJson src={result} collapsed={true} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default ManageRules;
