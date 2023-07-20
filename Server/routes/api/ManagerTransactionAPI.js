var express = require('express');
var router = express.Router();
const ManagerTransactionController = require('../../components/ManagerTransaction/ManagerTransactionController');

// http://localhost:3000/managerTransaction/api/addTotalManager
router.post('/addTotalManager', async (req, res, next) => {
    try {
        const { limit, totalIncome, totalExpense, totalMoney } = req.body;
        console.log(limit, totalIncome, totalExpense, totalMoney)
        const total = await ManagerTransactionController.addTotalManager(limit, totalIncome, totalExpense, totalMoney);
        console.log("aaaaaaaaa", total)
        if(total){
            return res.status(200).json({ result: true, message: 'Success' })
        }else{
            return res.status(400).json({ result: true, total: null })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, message: 'Error ' })
    }
})

// http://localhost:3000/managerTransaction/api/getAllTotallManager
router.get('/getAllTotallManager', [], async (req, res, next) => {
    try {
        const total = await ManagerTransactionController.getAllTotalManager();
        if(total){
            return res.status(200).json({ result: true, total: total });
        }else{
            return res.status(400).json({ result: false, total: null });
        }
    } catch (error) {
        console.log("Get all error: ", error);
        return res.status(500).json({ result: false, total: null });
    }
});
// http://localhost:3000/managerTransaction/api/updateTotallManager/:id
router.post('/updateTotallManager/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        const { limit, totalIncome, totalExpense, totalMoney } = body;
        const trans = await ManagerTransactionController.updatTotalTransactonById(id, limit, totalIncome, totalExpense, totalMoney);
        console.log(trans)
        if(trans){
            return res.status(200).json({ result: true, trans: trans });
        }else{
            return res.status(400).json({ result: false, trans: null });
        } 
    } catch (error) {
        console.log("Edit Total Manager error: ", error);
        return res.status(500).json({ result: false, message:'Error' });
    }
});

// api delete product by id
// http://localhost:3000/managerTransaction/api/deleteTotallManager/:id
router.delete('/deleteTotallManager/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const trans = await ManagerTransactionController.deleteTotalTransactionById(id);
        if(trans){
            return res.status(200).json({ result: true, trans: trans });
        }else{
            return res.status(400).json({ result: false, trans: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, message:'Error' });
    }
  });
  

module.exports = router;