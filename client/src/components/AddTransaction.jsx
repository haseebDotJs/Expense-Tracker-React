import { useState, useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'


export const AddTransaction = () => {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState('')

    const { addTransaction, error } = useContext(GlobalState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newTransaction = {
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label" htmlFor="text" >Text</label>
                    <input className="inputText" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." required />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="amount" >
                        Amount
                        <br />
                        (negative - expense, positive - income)
                    </label>
                    <input className="inputNumber" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required />
                </div>
                <button className="btn" type='submit' >Add transaction</button>
            </form>
        </>
    )
}
