import React, { useState } from 'react';
import { createUser } from '../services/api';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

function CreateUser() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({ name, age, salary, department, experience });
      setResult(response);
      setError('');
    } catch (error) {
      setError('Failed to create user.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Create User
          </Button>
        </form>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h3">Created User:</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CreateUser;
