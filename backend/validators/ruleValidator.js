// backend/validators/ruleValidator.js

// Import the valid attributes from the catalog
const { validAttributes } = require('./attributeCatalog');  // Adjust the path if needed

// Logical operators that should be ignored during validation
const logicalOperators = ['AND', 'OR'];

// Function to validate if the rule contains valid attributes
const validateRuleAttributes = (ruleString) => {
    // Regex to capture words (potential attributes) but ignore values inside single quotes
    const regex = /\b([a-zA-Z_]+)\b(?!')/g;  // This regex captures words but skips quoted values

    const attributesInRule = ruleString.match(regex);  // Extract all words in the rule string

    // Filter out any logical operators like AND/OR from the attributes list
    const attributesToValidate = attributesInRule.filter(attr => !logicalOperators.includes(attr.toUpperCase()));
    
    // Check for invalid attributes
    const invalidAttributes = attributesToValidate.filter(attr => !validAttributes.includes(attr));

    if (invalidAttributes.length > 0) {
        return `Invalid attribute(s): ${invalidAttributes.join(', ')}. Allowed attributes: ${validAttributes.join(', ')}`;
    }
    
    return null;  // Return null if all attributes are valid
};

module.exports = { validateRuleAttributes };
