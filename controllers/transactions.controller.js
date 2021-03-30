const TransactionModel = require('../models/Transaction.model')
const ObjectId = require('mongoose').Types.ObjectId;

// @desc   GET all transactions
// @route  GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res) => {
    const { id } = req.user
    try {
        const transactions = await TransactionModel.find({ createdBy: id })
        console.log('transactions', transactions);
        if (transactions.length < 1) {
            return res.json({ success: true, message: "No transactions", data: [], count: 0 })
        }

        return res.json({
            success: true,
            count: transactions.length,
            data: transactions
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// @desc   Add transaction
// @route  POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res) => {
    try {
        const { text, amount } = req.body

        const keys = Object.keys(req.body)
        // check empty body 
        if (keys.length < 1) {
            return res.status(400).json({ success: false, message: 'Fields required in body' });
        }

        const allowedKeys = ["text", "amount"];
        // making sure any other unrequired key should not come
        const isValidKeys1 = keys.every((update) => allowedKeys.includes(update));
        if (!isValidKeys1) {
            return res.status(400).json({ success: false, message: 'Please provide valid Keys' });
        }

        if (!text || !amount) {
            return res.status(400).json({
                success: false,
                message: "Fields can't be empty"
            })
        }

        const transaction = await TransactionModel.create({
            text,
            amount,
            createdBy: req.user.id,
        })
        await transaction.save()
        return res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            data: transaction
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// @desc   DELETE transaction
// @route  DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Please provide valid ID' })
        }

        // finding if task exist and is the task of particular user
        const transaction = await TransactionModel.findById(id)
        console.log("transaction.createdBy !== req.user.id", transaction.createdBy !== req.user.id);
        console.log("req.user.id", req.user.id);
        if (!transaction) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Transaction not found'
                }
            )
        }
        if (transaction.createdBy !== req.user.id) {
            return res.status(400).json(
                { success: false, message: "You can't delete other user's transactions" }
            )
        }
        await transaction.remove()

        return res.json({
            success: true,
            message: 'Transaction deleted successfully',
            data: transaction
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}