const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const transactionSchema = new Schema({
  id: { type: ObjectId },
  money: { type: Number, required: true },
  note: { type: String, default: "" },
  category: { type: ObjectId, ref: 'Category', required: true },

  idUser: { type: ObjectId, ref: 'User' },
  createAt: { type: Date, default: Date.now, required: true },
  updateAt: { type: Date, default: Date.now },

});

module.exports = mongoose.models.transaction || mongoose.model('Transaction', transactionSchema);
