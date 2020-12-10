import { useContext } from 'react'
import { GlobalState } from '../../context/GlobalState'
import { Transaction } from './Transaction'

export const TransactionList = () => {
    const { transactions } = useContext(GlobalState)
    console.log('transactions', transactions);
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => {
                    return <Transaction key={transaction.id} transaction={transaction} />
                })}
            </ul>
        </>
    )
}

