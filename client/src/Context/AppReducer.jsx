import { ACTIONS } from './ACTIONS'

export const AppReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.GET__TRANSACTIONS:
            return { ...state, transactions: action.payload, loading: false, error: null }
        case ACTIONS.ADD__TRANSACTION:
            return { ...state, transactions: [...state.transactions, action.payload], error: null }
        case ACTIONS.DELETE__TRANSACTION:
            return { ...state, transactions: state.transactions.filter(transaction => transaction._id !== action.payload), error: null }
        case ACTIONS.TRANSACTION__ERROR:
            return { ...state, error: action.payload }
        default:
            return { ...state }
    }
}
