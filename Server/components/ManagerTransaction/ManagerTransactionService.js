const ManagerTransactionModel = require('./ManagerTransactionModel');

const addTotalManager = async (limit, totalIncome, totalExpense, totalMoney) => {
    try {
        const addTotalManager = { limit, totalIncome, totalExpense, totalMoney }
        const e = new ManagerTransactionModel(addTotalManager);
        await e.save();
        return true;
    } catch (error) {
        console.log('Add new total Expense error:', error);
        return false;
    }
}

const getAllTotalManager = async (page, size) => {
    try {
        return await ManagerTransactionModel.find();
    } catch (error) {
        console.log('Get all total Manager error', error);
        throw error;
    }
}

//cập nhật sản phẩm theo id
const updatTotalTransactonById = async (id, limit, totalIncome, totalExpense, totalMoney) => {
    try {
   
      const item = await ManagerTransactionModel.findById(id);
      if (item) {
        item.limit = limit ? limit : item.limit;
        item.totalIncome = totalIncome ? totalIncome : item.totalIncome;
        item.totalExpense = totalExpense ? totalExpense : item.totalExpense;
        item.totalMoney = totalMoney ? totalMoney : item.totalMoney; 
        await item.save();
        return true;
      }
      return false;
    } catch (error) {
      console.log("Update product by id error: ", error);
      return false;
    }
  }
  
//xoá sản phẩm theo id
const deleteTotalTransactionById = async (id) => {
    try {

      await ManagerTransactionModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log('Delete Total Manager Transaction error', error);
      return false;
    }
  }

module.exports = { addTotalManager, getAllTotalManager, updatTotalTransactonById, deleteTotalTransactionById }