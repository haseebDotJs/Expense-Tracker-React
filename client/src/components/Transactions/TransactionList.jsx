import { useContext, useEffect } from 'react'
import { GlobalState } from '../../Context/GlobalState'
import { Transaction } from './Transaction'
import { Loading } from './Loading'

export const TransactionList = () => {
    const { transactions, getTransactions ,loading} = useContext(GlobalState)
    console.log('transactionsList', transactions);
    useEffect(() => {
        console.log('i am getting transactions again');
        getTransactions()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {loading ? <Loading /> : transactions.map(transaction => {
                    return <Transaction key={transaction._id} transaction={transaction} />
                })} 
            </ul>
        </>
    )
}

