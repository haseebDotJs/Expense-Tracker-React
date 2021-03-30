import { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
import {numberWithCommas} from './utils/format'

export const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalState)
    console.log('transactions total', transactions);
    const amounts = transactions.map(transaction => transaction.amount)
    const income = amounts
        .filter((amount) => amount >= 0)
        .reduce((acc, amount) => acc + amount, 0)
        .toFixed(2)

    const expense = Math.abs(amounts
        .filter(amount => amount < 0)
        .reduce((acc, amount) => acc + amount, 0)
    ).toFixed(2)

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">+${numberWithCommas(income)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">-${numberWithCommas(expense)}</p>
            </div>
        </div>
    )
}
