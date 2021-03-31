const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TransactionModel = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please provide a number']
    },
    amount: {
        type: Number,
        trim: true,
        required: [true, 'Please provide a positive or negative number']
    },
    type: {
        type: String,
        required: [true, 'Please provide transaction type']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
})

module.exports = mongoose.model('Transaction', TransactionModel)