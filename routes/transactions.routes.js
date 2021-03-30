const express = require('express')

const router = express.Router()

const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware,getTransactions)
router.post('/', authMiddleware,addTransaction)    
router.delete('/:id',authMiddleware,deleteTransaction)

module.exports = router