import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Transaction = ({ transaction }) => {
    const sign = transaction.type === 'income' ? '+' : '-'
    console.log('transaction in transaction', transaction);
    const { deleteTransaction } = useContext(GlobalState)
    return (
        <li key={transaction._id} className={ transaction.type === 'income' ? 'plus' : 'minus'}>
            {/* our expense amount is coming as -100 but we don't wanna show $-100 we wanna show - $100 so to
               remove after $ we are using maths.abs which converts any negative value into positive value */}
            {transaction.text} <span>{sign}{numberWithCommas(Math.abs(transaction.amount))} RS</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>x</button>
        </li>
    )
}
