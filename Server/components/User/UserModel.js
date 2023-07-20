const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":"
  + currentdate.getSeconds();

const userSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, },
  email: { type: String, default: "", unique: true },
  description:{type:String,default:""},
  password: { type: String },

  avatar: { type: String, default: "" },
  role: { type: Number, default: 1 },
  isLogin:{type:Boolean,default:false},
  isActive:{type:Boolean,default:true},
    
  isVerified: { type: Boolean , default: false},
  verificationCode: { type: String , default:'00000'},
  
  createAt: { type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now },
  limit : {type: Number, default: 10000},
  totalIncome : {type: Number, default: 0},
  totalExpense : {type: Number, default: 0},
  totalMoney : {type: Number, default: 0},

  totalIncomeJun : {type: Number, default: 0},
  totalExpenseJun : {type: Number, default: 0},

  totalIncomeJul : {type: Number, default: 0},
  totalExpenseJul : {type: Number, default: 0},

  totalIncomeAug : {type: Number, default: 0},
  totalExpenseAug : {type: Number, default: 0},

  totalIncomeSep : {type: Number, default: 0},
  totalExpenseSep : {type: Number, default: 0},
});

module.exports = mongoose.models.user || mongoose.model('User', userSchema);
