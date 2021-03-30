import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from '../components/Signup/Signup' 
import Login from '../components/Login/Login'
import ExpenseTrackerHome from '../components/ExpenseTrackerHome'
import { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'


const MyAppRoutes = () => {
    const { login: [login] } = useContext(GlobalState)
    return (
        <Routes >
            <Route path="/" element={login ? <ExpenseTrackerHome /> : <Navigate to='/login' />} />
            <Route path="/login" element={login ? <Navigate to='/' /> : <Login />} />
            <Route path="/signup" element={login ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
    )
}

export default MyAppRoutes
