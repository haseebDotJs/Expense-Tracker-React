import { useContext, useState } from 'react'
import { GlobalState } from '../../Context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Transaction = ({ transaction }) => {
    const sign = transaction.type === 'income' ? '+' : '-'
    const { deleteTransaction } = useContext(GlobalState)
    const [disableButton, setDisableButton] = useState(false)

    const handleDelete = () => {
        setDisableButton(true)
        deleteTransaction(transaction._id)
    }
    return (
        <li key={transaction._id} className={transaction.type === 'income' ? 'plus' : 'minus'}>
            {/* our expense amount is coming as -100 but we don't wanna show $-100 we wanna show - $100 so to
               remove after $ we are using maths.abs which converts any negative value into positive value */}
            {transaction.text} <span>{sign}{numberWithCommas(Math.abs(transaction.amount))} RS</span>
            <button className="delete-btn" onClick={handleDelete} disabled={disableButton}>x</button>
        </li>
    )
}
