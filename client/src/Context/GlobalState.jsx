import { createContext, useReducer, useState, useEffect } from 'react'
import { AppReducer } from './AppReducer'
import { ACTIONS } from './ACTIONS'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalState = createContext(initialState)


export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)
    const [login, setLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const verifyUserLogin = () => {
        let jwt_secret = "thisIsMySecret"
        let token = localStorage.getItem('token')
        let returnThis = false

        if (token) {
            // token will only be decoded when there is no error, expiry or wrong token will not be decoded so token will remain undefined
            jwt.verify(token, jwt_secret, function (err, decoded) {
                if (err) {
                    token = null
                    localStorage.removeItem('token')
                }
                else {
                    setUserInfo(decoded)
                    returnThis = true
                }
            })
        }
        return returnThis
    }

    useEffect(() => {
        const verified = verifyUserLogin()
        if (verified) {
            setLogin(true)
            // eslint-disable-next-line
        }
    }, [])

    const loginUser = async (loginForm) => {
        try {
            const res = await axios.post('/api/v1/user/login', loginForm)
            return res.data
        } catch (error) {
            const resolveErrorMessage = await error.response.data
            return resolveErrorMessage
        }
    }
    const signupUser = async (signupForm) => {
        try {
            const res = await axios.post('/api/v1/user/signup', signupForm)
            return res.data
        } catch (error) {
            const resolveErrorMessage = await error.response.data
            return resolveErrorMessage
        }
    }
    const getTransactions = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": localStorage.getItem('token')
            }
        }
        try {
            const verified = verifyUserLogin()
            if (verified) {
                const res = await axios.get('/api/v1/transactions', config)
                const { data } = res.data
                console.log('get data', data);
                dispatch({
                    type: ACTIONS.GET__TRANSACTIONS,
                    payload: data
                })
            } else {
                setLogin(false)
            }
        }
        catch (error) {
            console.log('error', error);
            const resolveErrorMessage = await error
            dispatch({
                type: ACTIONS.TRANSACTION__ERROR,
                payload: resolveErrorMessage
            })
        }
    }

    const addTransaction = async (transaction) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": localStorage.getItem('token')
            }
        }
        try {
            const verified = verifyUserLogin()
            if (verified) {
                const res = await axios.post('/api/v1/transactions', transaction, config)
                const { data } = res.data
                dispatch({
                    type: ACTIONS.ADD__TRANSACTION,
                    payload: data
                })
            }
            else {
                setLogin(false)
            }
        } catch (error) {
            const resolveErrorMessage = await error.response.data.message
            dispatch({
                type: ACTIONS.TRANSACTION__ERROR,
                payload: resolveErrorMessage
            })
        }
    }

    const deleteTransaction = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": localStorage.getItem('token')
            }
        }

        try {
            const verified = verifyUserLogin()
            if (verified) {
                await axios.delete(`/api/v1/transactions/delete/${id}`, config)
                dispatch({ type: ACTIONS.DELETE__TRANSACTION, payload: id })
            }
            else {
                setLogin(false)
            }

        } catch (error) {
            const resolveErrorMessage = await error.response.data.message
            dispatch({
                type: ACTIONS.TRANSACTION__ERROR,
                payload: resolveErrorMessage
            })
        }
    }

    const deleteAllTransactions = async () => {
        console.log('i am deleting all');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": localStorage.getItem('token')
            }
        }

        try {
            const verified = verifyUserLogin()
            if (verified) {
                await axios.delete(`/api/v1/transactions/delete-all`, config)
                dispatch({ type: ACTIONS.DELETE__ALL, payload: [] })
            }
            else {
                setLogin(false)
            }

        } catch (error) {
            const resolveErrorMessage = await error.response.data.message
            dispatch({
                type: ACTIONS.TRANSACTION__ERROR,
                payload: resolveErrorMessage
            })
        }
    }
    const loadTrue = () => {
        dispatch({
            type: ACTIONS.LOAD,
            payload: true
        })
    }
    const logout = () => {
        dispatch({
            type: ACTIONS.LOGOUT,
            payload: true
        })
    }
    // setTimeout(() => {
    //     deleteAllTransactions()
    // }, 5000);
    return (
        <GlobalState.Provider value={{
            loginUser,
            signupUser,
            verifyUserLogin,
            loadTrue,
            logout,
            login: [login, setLogin],
            userInfo: [userInfo, setUserInfo],
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            addTransaction,
            deleteTransaction,
            deleteAllTransactions
        }}>
            {children}
        </GlobalState.Provider>
    )
}