import { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'
// import { numberWithCommas } from './utils/format'
import { useLoading, ThreeDots, LoaderProvider } from '@agney/react-loading';
import CountUp from 'react-countup';


const Loader = () => {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
    });
    return <section {...containerProps}>{indicatorEl}</section>;
}
export const IncomeExpenses = () => {
    const { transactions, loading } = useContext(GlobalState)
    const income = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const expense = Math.abs(transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    )

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                {loading ? <div className="money plus">
                    <LoaderProvider indicator={<ThreeDots width="40" />}>
                        <Loader />
                    </LoaderProvider>
                </div>
                    :
                    <p className="money plus">+<CountUp end={income} separator="," duration={1} /> RS</p>
                }
            </div>
            <div>
                <h4>Expense</h4>
                {loading ? <div className="money minus">
                    <LoaderProvider indicator={<ThreeDots width="40" />}>
                        <Loader />
                    </LoaderProvider>
                </div>
                    :
                    <p className="money minus">-<CountUp end={expense} separator="," duration={1} /> RS</p>
                }
            </div>
        </div>
    )
}
