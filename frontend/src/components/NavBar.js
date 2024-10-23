// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit" component={Link} to="/create-rule">
          Create Rule
        </Button>
        <Button color="inherit" component={Link} to="/combine-rules">
          Combine Rules
        </Button>
        <Button color="inherit" component={Link} to="/evaluate-rule">
          Evaluate Rule
        </Button>
        <Button color="inherit" component={Link} to="/manage-rules">
          Manage Rules
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
