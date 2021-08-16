import React, { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
// import { numberWithCommas } from './utils/format'
// import { Loading } from './Transactions/Loading'
import CountUp from 'react-countup';

export const Balance = () => {
    const { transactions, loading } = useContext(GlobalState)
    console.log('transactions', transactions);
    const income = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const expense = Math.abs(transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    )

    const total = income - expense
    return (
        <div >
            <h4>Your Balance</h4>
            <div >
                {
                    loading ?
                        <h1>Loading...</h1>
                        :
                        <h1><CountUp end={total} separator="," duration={1} /> RS</h1>

                }
            </div>
        </div>
    )
}
