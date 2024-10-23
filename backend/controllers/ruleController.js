const Rule = require('../models/Rule');
const { parseRuleToAST, combineRuleASTs, evaluateAST } = require('../utils/astUtils');
const { validateRuleAttributes } = require('../validators/ruleValidator');

// Create a Rule
const createRule = async (req, res) => {
    const { ruleString, name } = req.body;
    try {
        // Validate the attributes in the rule string
        const validationError = validateRuleAttributes(ruleString);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        // Parse rule string into AST (Abstract Syntax Tree)
        const ast = parseRuleToAST(ruleString);
        const rule = new Rule({ name, root: ast });

        // Save the rule to the database
        await rule.save();
        return res.status(201).json(rule);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Combine multiple rules into one AST
const combineRules = (req, res) => {
    const { rules } = req.body;
    try {
        // Validate the attributes of all rules before combining
        // for (let rule of rules) {
        //     const validationError = validateRuleAttributes(JSON.stringify(rule));
        //     if (validationError) {
        //         return res.status(400).json({ error: validationError });
        //     }
        // }

        // Combine the ASTs of the provided rules
        const combinedAST = combineRuleASTs(rules);
        return res.json(combinedAST);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Evaluate a rule against provided user data
const evaluateRule = (req, res) => {
    const { ruleAST,  data } = req.body;
    console.log('req.body', req.body);


    // Debugging log to ensure the request data is received correctly
    console.log('Received Rule AST:', ruleAST);
    console.log('Received User Data:', data);

    try {
        // Ensure ruleAST and userData are not undefined or null
        if (!ruleAST || !data) {
            throw new Error("Invalid input. Rule AST and user data are required.");
        }

        // Evaluate the rule against the provided user data
        const isEligible = evaluateAST(ruleAST, data);
        return res.json({ eligible: isEligible });
    } catch (error) {
        console.error('Error during rule evaluation:', error.message);
        return res.status(400).json({ error: error.message });
    }
};

// Get all rules from MongoDB
const getRules = async (req, res) => {
    try {
        const rules = await Rule.find();
        return res.status(200).json(rules);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching rules' });
    }
};

// Update an existing rule
const updateRule = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedRule = await Rule.findByIdAndUpdate(id, updatedData, { new: true });
        return res.status(200).json(updatedRule);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating rule' });
    }
};

// Evaluate a rule with custom functions (if any custom logic is implemented)
const evaluateWithCustomFunctions = (req, res) => {
    const { ruleAST, userData } = req.body;

    try {
        // Use the same AST evaluation logic for custom functions
        const isEligible = evaluateAST(ruleAST, userData);
        return res.json({ eligible: isEligible });
    } catch (error) {
        console.error('Error during custom rule evaluation:', error.message);
        return res.status(400).json({ error: error.message });
    }
};

// Export the functions to be used in the routes
module.exports = {
    createRule,
    combineRules,
    evaluateRule,
    getRules,
    updateRule,
    evaluateWithCustomFunctions,
};
