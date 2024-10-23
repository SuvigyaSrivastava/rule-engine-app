const express = require('express');
const router = express.Router();
const { 
  evaluateRule, 
  createRule, 
  combineRules, 
  updateRule, 
  getRules, 
  evaluateWithCustomFunctions 
} = require('../controllers/ruleController');

// Route to create a new rule
router.post('/create', createRule);

// Route to combine multiple rules
router.post('/combine', combineRules);

// Route to evaluate a rule
router.post('/evaluate', evaluateRule);

// Route to evaluate a rule with custom functions
router.post('/evaluate-with-custom-functions', evaluateWithCustomFunctions);

// Route to get all rules
router.get('/', getRules);

// Route to update an existing rule
router.put('/:id', updateRule);

module.exports = router;
