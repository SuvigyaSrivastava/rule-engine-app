import axios from 'axios';

const API_URL = 'http://localhost:5002/api';  // Adjust the port number if necessary to match your backend configuration

// Create a new rule
export const createRule = async (ruleData) => {
  try {
    console.log('Sending rule data:', ruleData);  // Log for debugging
    const response = await axios.post(`${API_URL}/rules/create`, ruleData);
    return response.data;
  } catch (error) {
    console.error('Error creating rule:', error.response ? error.response.data : error.message);  // Detailed error logging
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};

// Combine multiple rules
export const combineRules = async (rules) => {
  try {
    console.log('Combining rules:', rules);  // Log for debugging
    const response = await axios.post(`${API_URL}/rules/combine`, { rules });
    return response.data;
  } catch (error) {
    console.error('Error combining rules:', error.response ? error.response.data : error.message);  // Detailed error logging
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};

// Evaluate a rule
export const evaluateRule = async (ruleAST, userData) => {
  try {
    console.log('Evaluating rule with AST: UsUS', ruleAST);  // Log for debugging
    console.log('Evaluating rule with user data:US', userData);  // Log for debugging
    const response = await axios.post(`${API_URL}/rules/evaluate`, { ruleAST, data: userData });
    console.log('Response:', response.data);  // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error evaluating rule:', error.response ? error.response.data : error.message);  // Detailed error logging
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};

// // Evaluate a rule with custom functions
// export const evaluateWithCustomFunctions = async (ruleAST, userData) => {
//   try {
//     console.log('Evaluating rule with custom functions:', ruleAST);  // Log for debugging
//     const response = await axios.post(`${API_URL}/rules/evaluate-with-custom-functions`, { ruleAST, userData });
//     return response.data;
//   } catch (error) {
//     console.error('Error evaluating rule with custom functions:', error.response ? error.response.data : error.message);  // Detailed error logging
//     throw new Error(error.response ? error.response.data.error : 'Network error');
//   }
// };

// Get all rules (for Manage Rules page)
export const getRules = async () => {
  try {
    console.log('Fetching all rules...');  // Log for debugging
    const response = await axios.get(`${API_URL}/rules`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rules:', error.response ? error.response.data : error.message);  // Detailed error logging
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};

// Fetch all users (for Evaluate Rule page)
export const getUsers = async () => {
  try {
    console.log('Fetching all users...');  // Log for debugging
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);  // Detailed error logging
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};

// Update an existing rule
export const updateRule = async (ruleId, updatedRuleData) => {
  try {
    console.log('Updating rule with ID:', ruleId);  // Log for debugging
    console.log('Updated rule data:', updatedRuleData);  // Log for debugging
    const response = await axios.put(`${API_URL}/rules/${ruleId}`, updatedRuleData);
    return response.data;
  } catch (error) {
    console.error('Error updating rule:', error.response ? error.response.data : error.message);  // Detailed error logging
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};
