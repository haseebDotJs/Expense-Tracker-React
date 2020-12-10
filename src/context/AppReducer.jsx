import { ACTIONS } from './ACTIONS'

export const AppReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.DELETE__TRANSACTION:
            return { transactions: state.transactions.filter(transaction => transaction.id !== action.payload) }
        case ACTIONS.ADD__TRANSACTION:
            return { transactions: [action.payload, ...state.transactions] }
        default:
            return state
    }
}
