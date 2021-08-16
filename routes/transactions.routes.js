const express = require('express')

const router = express.Router()

const { getTransactions, addTransaction, deleteTransaction ,deleteAll} = require('../controllers/transactions.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware,getTransactions)
router.post('/', authMiddleware,addTransaction)    
router.delete('/delete/:id',authMiddleware,deleteTransaction)
router.delete('/delete-all', authMiddleware,deleteAll)


module.exports = router