import React, { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
import { numberWithCommas } from './utils/format'

export const Balance = () => {
    const { transactions } = useContext(GlobalState)
    
    const income = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const expense = Math.abs(transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    )

    const total = income - expense
    return (
        <div style={{ marginTop: '10px' }}>
            <h4>Your Balance</h4>
            <h1>{numberWithCommas(total)} RS</h1>
        </div>
    )
}
