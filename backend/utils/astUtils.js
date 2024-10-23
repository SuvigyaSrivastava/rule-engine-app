// A simple parser to convert a rule string into an AST
const parseRuleToAST = (ruleString) => {
    const tokens = ruleString.split(' ');  // Split the rule string by space
    if (tokens.length !== 7 || tokens[3].toUpperCase() !== 'AND') {
        throw new Error('Invalid rule format. Expected format: "age > 30 AND salary > 50000"');
    }
    return {
        type: "AND",
        left: {
            type: "operand",
            value: `${tokens[0]} ${tokens[1]} ${tokens[2]}`  // age > 30
        },
        right: {
            type: "operand",
            value: `${tokens[4]} ${tokens[5]} ${tokens[6]}`  // salary > 50000
        }
    };
};

// Combine multiple ASTs into one AST using an AND operator
const combineRuleASTs = (rules) => {
    let combinedAST = rules.reduce((acc, ruleAST) => {
        if (!acc) {
            return ruleAST;
        } else {
            return {
                type: 'AND',
                left: acc,
                right: ruleAST,
            };
        }
    }, null);
    return combinedAST;
};

// Evaluate an AST against a given set of user data
const evaluateAST = (ast, data) => {
    if (!ast || !ast.type) {
        throw new Error('Invalid AST');
    }

    const evaluateCondition = (condition, data) => {
        const [attribute, operator, value] = condition.split(' ');
        const dataValue = data[attribute];

        switch (operator) {
            case '>':
                return dataValue > Number(value);
            case '<':
                return dataValue < Number(value);
            case '=':
            case '==':
                return dataValue == value;
            default:
                return false;
        }
    };

    const evaluateNode = (node) => {
        if (node.type === 'operand') {
            return evaluateCondition(node.value, data);
        }
        if (node.type === 'AND') {
            return evaluateNode(node.left) && evaluateNode(node.right);
        }
        if (node.type === 'OR') {
            return evaluateNode(node.left) || evaluateNode(node.right);
        }
        throw new Error('Unknown AST node type');
    };

    return evaluateNode(ast);
};

module.exports = { parseRuleToAST, combineRuleASTs, evaluateAST };
