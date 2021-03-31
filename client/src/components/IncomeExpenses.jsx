import { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
import {numberWithCommas} from './utils/format'

export const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalState)
    console.log('transactions total', transactions);
    const income = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const expense = Math.abs(transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    )
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">+{numberWithCommas(income)} RS</p>
            </div>
            <div>
                <h4>Expense</h4> 
                <p className="money minus">-{numberWithCommas(expense)} RS</p>
            </div>
        </div>
    )
}
