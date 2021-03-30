import React, { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
import {numberWithCommas} from './utils/format'

export const Balance = () => {
    const { transactions } = useContext(GlobalState)
    console.log('trans', transactions);
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, amount) => acc + amount, 0).toFixed(2)

    console.log('amount', amounts);
    console.log('total', total);
    return (
        <div style={{marginTop: '10px'}}>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </div>
    )
}
