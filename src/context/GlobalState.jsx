import { createContext, useReducer } from 'react'
import { AppReducer } from './AppReducer'
import { ACTIONS } from './ACTIONS'

export const initialState = {
    transactions: []
}
export const GlobalState = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const DELETE = (id) => {
        console.log('running');
        dispatch({ type: ACTIONS.DELETE__TRANSACTION, payload: id })
    }
    const ADD = (transaction) => {
        dispatch({ type: ACTIONS.ADD__TRANSACTION, payload: transaction })
    }
    return (
        <GlobalState.Provider value={{
            transactions: state.transactions,
            deleteTransaction: DELETE,
            addTransaction: ADD
        }}>
            {children}
        </GlobalState.Provider>
    )
}