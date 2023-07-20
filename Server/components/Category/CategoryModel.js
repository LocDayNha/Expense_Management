const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image: { type: String },
    type: { type: Boolean, default: true },   // true: Expense , false: Income
});

module.exports = mongoose.models.category || mongoose.model('Category', categorySchema);