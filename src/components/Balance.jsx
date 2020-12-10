import React, { useContext } from 'react'
import { GlobalState } from '../context/GlobalState'

export const Balance = () => {
    const { transactions } = useContext(GlobalState)
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, amount) => acc + amount, 0).toFixed(2)

    console.log('amount', amounts);
    console.log('total', total);
    return (
        <>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </>
    )
}
