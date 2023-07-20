
var express = require('express');
var router = express.Router();
const TransactionController = require('../../components/Transaction/TransactionController');

//http://localhost:3000/transaction/api/get-all-transaction-by-idUser?idUser=
router.get('/get-all-transaction-by-idUser', async (req, res, next) => {
    try {
        const { idUser } = req.query;
        const transaction = await TransactionController.getAll(idUser);

        if (transaction) {
            return res.status(200).json({ message: "Get All success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Get All failed", result: false, transaction: transaction });

    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/delete-all
router.delete('/delete-all', async (req, res, next) => {
    try {
        const { idUser } = req.query;
        console.log(idUser);
        const transaction = await TransactionController.deleteAll(idUser);
        console.log(">>>>>>>>>>>>>>>>>>>>", transaction);
        if (transaction) {
            return res.status(200).json({ message: "Delete all success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Delete all failed", result: false, transaction: transaction });
    } catch (error) {
        console.log('Delete Transaction All error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/add-new
router.post('/add-new', async (req, res, next) => {
    try {
        const { money, note, category, idUser, createAt, updateAt } = req.body;
        const transaction = await TransactionController.addNew(money, note, category, idUser, createAt, updateAt);

        if (transaction) {
            return res.status(200).json({ message: "Add new success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Add new failed", result: false, transaction: transaction });

    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/get-by-id
router.get('/get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const transaction = await TransactionController.getTransactionById(id);
        if (transaction) {
            return res.status(200).json({ message: "Get Transaction By Id success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Get Transaction By Id failed", result: false, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/delete-by-id?id=
router.delete('/delete-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const transaction = await TransactionController.deleteById(id);
        if (transaction) {
            return res.status(200).json({ message: "Delete success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Delete failed", result: false, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/edit-by-id
router.put('/edit-by-id', async (req, res, next) => {
    try {
        const { id, idUser } = req.query;
        const { money, note, category, createAt, updateAt } = req.body;
        const transaction = await TransactionController.editById(id, money, note, category, idUser, createAt, updateAt);
        if (transaction) {
            return res.status(200).json({ message: "Edit success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Edit failed", result: false, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/search-by-id?id=
router.get('/search-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const transaction = await TransactionController.searchTransactionById(id);
        return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//CHƯA XONG ĐANG LỖI
//http://localhost:3000/transaction/api/search-by-category?category=
router.get('/search-by-category', async (req, res, next) => {
    try {
        const { idUser, category } = req.query

        const transaction = await TransactionController.searchTransactionByCategory(idUser, category);
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(400).json({ result: false, transaction: null });
    } catch (error) {
        console.log('Search Transaction by Category error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});
//http://localhost:3000/transaction/api/search-by-money?money=
router.get('/search-by-money', async (req, res, next) => {
    try {
        const { money, idUser } = req.query;
        const transaction = await TransactionController.searchTransactionByMoney(money, idUser);
        return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Money error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});
//http://localhost:3000/transaction/api/search-by-note?note=
router.get('/search-by-note', async (req, res, next) => {
    try {
        const { note, idUser } = req.query;
        const transaction = await TransactionController.searchTransactionByNote(note, idUser);
        return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Note error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});
//http://localhost:3000/transaction/api/get-total-money
router.get('/get-total-money', [], async (req, res, next) => {
    try {
        const { idUser} = req.query
        const transaction = await TransactionController.getTotalMoney(idUser)
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(400).json({ result: false, transaction: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})
//http://localhost:3000/transaction/api/search-by-current-date
router.get('/search-by-current-date', [], async (req, res, next) => {
    try {
        const { date, idUser } = req.query;
        const transaction = await TransactionController.searchByDate(date, idUser)
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(200).json({ result: false, transaction: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})
//http://localhost:3000/transaction/api/search-by-recent
router.get('/search-by-recent', [], async (req, res, next) => {
    try {
        const { date, idUser } = req.query
        // console.log(idUser);
        const transaction = await TransactionController.searchByRecent(date, idUser)
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(200).json({ result: false, transaction: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})
//http://localhost:3000/transaction/api/search-by-month
router.get('/search-by-month', [], async (req, res, next) => {
    try {
        const { month } = req.body
        const transaction = await TransactionController.searchByMonth(month)
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(400).json({ result: false, transaction: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})
//http://localhost:3000/transaction/api/search-by-year
router.get('/search-by-year', [], async (req, res, next) => {
    try {
        const { year ,idUser } = req.query
        const transaction = await TransactionController.searchByYear(year,idUser)
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(200).json({ result: false, transaction: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})
//http://localhost:3000/transaction/api/get-all-transaction
router.get('/get-all-transaction', async (req, res, next) => {
    try {
        const { idUser } = req.query
        const transaction = await TransactionController.getAllTransaction(idUser);
        if (transaction) {
            return res.status(200).json({ message: "Search Success", result: true, transaction: transaction });
        }
        return res.status(400).json({ result: false, transaction: null });
    } catch (error) {
        return res.status(500).json({ result: false, transaction: null });

    }
});
module.exports = router;