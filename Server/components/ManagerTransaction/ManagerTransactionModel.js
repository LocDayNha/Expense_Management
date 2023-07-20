const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const managerTransactionSchema = new Schema({
  id: { type: ObjectId },
  limit : {type: Number},
  totalIncome : {type: Number},
  totalExpense : {type: Number},
  totalMoney : {type: Number}


});

module.exports = mongoose.models.managerTransaction || mongoose.model('ManagerTransaction', managerTransactionSchema);

