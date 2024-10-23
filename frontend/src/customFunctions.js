// src/customFunctions.js
export const customFunctions = {
    isSeniorCitizen: (age) => age >= 60,
    isEligibleForBonus: (salary, experience) => salary > 50000 && experience > 5,
  };
  
  // Function to evaluate a rule string with custom functions
  export const evaluateWithCustomFunctions = (ruleAST, data) => {
    // This is where you interpret the AST and substitute custom function calls
    // For example, if a node in AST calls `isSeniorCitizen`, you run the function
    // and replace it with the actual boolean value for evaluation.
  };
  