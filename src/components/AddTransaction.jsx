import { useState, useContext } from 'react'
import { GlobalState } from '../context/GlobalState'


export const AddTransaction = () => {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState('')

    const { addTransaction } = useContext(GlobalState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newTransaction = {
            id: Math.floor(Math.random() * 99999),
            text,
            amount: +amount
        }
        addTransaction(newTransaction)
        setText('')
        setAmount('')
    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." required />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount
                        <br />
                        (negative - expense, positive - income)
                    </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required />
                </div>
                <button className="btn" type='submit' >Add transaction</button>
            </form>
        </>
    )
}
