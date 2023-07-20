const ManagerTransactionService = require('./ManagerTransactionService');

const addTotalManager = async(limit,totalIncome,totalExpense,totalMoney)=>{
    try {
        return await ManagerTransactionService.addTotalManager(limit,totalIncome,totalExpense,totalMoney);
    } catch (error) {
        return false; 
    }
}

const getAllTotalManager = async(page, size)=>{
    try {
        return await ManagerTransactionService.getAllTotalManager(page,size);
    } catch (error) {
        throw error;
    }
}

const updatTotalTransactonById = async(id, limit, totalIncome, totalExpense, totalMoney)=>{
    try {
        return await ManagerTransactionService.updatTotalTransactonById(id, limit, totalIncome, totalExpense, totalMoney);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteTotalTransactionById = async(id)=>{
    try {
        return await productService.deleteTotalTransactionById(id);
    } catch (error) {
        throw false;
    }
}


module.exports = {addTotalManager, getAllTotalManager, updatTotalTransactonById, deleteTotalTransactionById}