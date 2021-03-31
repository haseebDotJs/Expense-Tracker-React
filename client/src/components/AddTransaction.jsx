import { useState, useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

export const AddTransaction = () => {
    const schema = Yup.object().shape({
        text: Yup
            .string()
            .min(3, "Minimum 3 characters required")
            .max(16, "Maximum 16 characters allowed"),
    })

    const { handleSubmit, reset, register, errors } = useForm({
        resolver: yupResolver(schema),
    });
    console.log('errors', errors);
    const { addTransaction, error } = useContext(GlobalState)

    const onSubmit = (transaction) => {
        const { text, amount, type } = transaction
        const newTransaction = {
            text,
            amount: amount,
            type: type
        }
        addTransaction(newTransaction)
        reset()
    }
    return (
        <>
            <h3>Add new transaction</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label" htmlFor="text" >Text</label>
                    <input name="text" className="inputText" type="text" placeholder="Enter text..." ref={register} required />
                    {errors.text && <p style={{ color: 'red' }}>{errors.text.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="amount" >
                        Amount
                        <br />
                        (select income or expense from select menu)
                    </label>
                    <div style={{ display: 'flex' }}>
                        <input name="amount" className="inputNumber" type="number" placeholder="Enter amount..." ref={register} min="1" required />
                        <select name="type" id="type" defaultValue={'expense'} ref={register}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className="btn" type='submit' >Add transaction</button>
                </div>
            </form>
        </>
    )
}
