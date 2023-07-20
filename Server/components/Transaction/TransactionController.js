const TransactionService = require('./TransactionService');

const getAll = async (idUser) => {
    try {
        return await TransactionService.getAll(idUser);
    } catch (error) {
        console.log('Add New Transaction error: ', error);
    }
    return null;
}
const deleteAll = async (idUser) => {
    try {
        return await TransactionService.deleteAll(idUser);
    } catch (error) {
        console.log('Delete Transaction All error: ', error);
    }
    return null;
}

const addNew = async (money, note, category, idUser, createAt, updateAt) => {
    try {
        return await TransactionService.addNew(money, note, category, idUser, createAt, updateAt);
    } catch (error) {
        console.log('Add New Transaction error: ', error);
    }
    return null;
}

const getTransactionById = async (id) => {
    try {
        return await TransactionService.getTransactionById(id);
    } catch (error) {
        console.log('Get Transaction By Id error: ', error);
    }
    return null;
}

const deleteById = async (id) => {
    try {
        return await TransactionService.deleteById(id);
    } catch (error) {
        console.log('Delete Transaction By Id error: ', error);
    }
    return null;
}

const editById = async (id, money, note, category, idUser, createAt, updateAt) => {
    try {
        return await TransactionService.editById(id, money, note, category, idUser, createAt, updateAt);
    } catch (error) {
        console.log('Edit Transaction By Id error: ', error);
    }
    return null;
}

const searchTransactionById = async (id) => {
    try {
        return await TransactionService.searchTransactionById(id);
    } catch (error) {
        console.log('Search Transaction By Id error: ', error);
    }
    return null;
}

const searchTransactionByCategory = async (idUser, category) => {
    try {
        return await TransactionService.searchTransactionByCategory(idUser, category);
    } catch (error) {
        console.log('Search Transaction By Category error: ', error);
    }
    return null;
}

const searchTransactionByMoney = async (money,idUser) => {
    try {
        return await TransactionService.searchTransactionByMoney(money,idUser);
    } catch (error) {
        console.log('Search Transaction By Money error: ', error);
    }
    return null;
}

const searchTransactionByNote = async (note,idUser) => {
    try {
        return await TransactionService.searchTransactionByNote(note,idUser);
    } catch (error) {
        console.log('Search Transaction By Note error: ', error);
    }
    return null;
}

const getTotalMoney = async (idUser) => {
    try {
        return await TransactionService.getTotalMoney(idUser);
    } catch (error) {
        console.log('Search Transaction By Note error: ', error);
    }
    return null;
}

const searchByDate = async (date,idUser) => {
    try {
        return await TransactionService.searchByDate(date,idUser);
    } catch (error) {
        console.log('Search Transaction By date error: ', error);
    }
    return null;
}
const searchByRecent = async (date,idUser) => {
    try {
        return await TransactionService.searchByRecent(date,idUser);
    } catch (error) {
        console.log('Search Transaction By date error: ', error);
    }
    return null;
}

const searchByMonth = async (month) => {
    try {
        return await TransactionService.searchByMonth(month);
    } catch (error) {
        console.log('Search Transaction By month error: ', error);
    }
    return null;
}
const searchByYear = async (year,idUser) => {
    try {
        return await TransactionService.searchByYear(year,idUser);
    } catch (error) {
        console.log('Search Transaction By year error: ', error);
    }
    return null;
}
const getAllTransaction = async (idUser) => {
    try {
        return await TransactionService.getAllTransaction(idUser);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll, addNew, deleteById, editById,
    searchTransactionById, getTotalMoney, searchTransactionByCategory,
    searchTransactionByMoney, searchTransactionByNote, searchByDate,
    searchByMonth, searchByYear, getAllTransaction, searchByRecent,
    getTransactionById, deleteAll

};