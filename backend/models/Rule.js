// models/Rule.js

const mongoose = require('mongoose');

// AST Node Schema
const NodeSchema = new mongoose.Schema({
    type: { type: String, required: true },  // "operator" or "operand"
    left: { type: mongoose.Schema.Types.Mixed },  // Left child (can be another node or operand)
    right: { type: mongoose.Schema.Types.Mixed }, // Right child (can be another node or operand)
    value: { type: String }  // The actual condition for operand nodes
});

// Rule Schema
const RuleSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },  // Rule name with an index for faster queries
    root: { type: NodeSchema, required: true },  // The root AST node
    createdAt: { type: Date, default: Date.now },  // Timestamp for rule creation
    updatedAt: { type: Date, default: Date.now },  // Timestamp for last rule update
    version: { type: Number, default: 1 },  // Version number for the rule
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },  // Rule status (active/inactive)
});

// Pre-save hook to update `updatedAt` before each save
RuleSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Rule', RuleSchema);
