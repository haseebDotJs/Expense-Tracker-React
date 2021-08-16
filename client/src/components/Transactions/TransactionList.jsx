import { useContext, useEffect } from 'react'
import { GlobalState } from '../../Context/GlobalState'
import { Transaction } from './Transaction'
import Skeleton from '@yisheng90/react-loading';
import FlipMove from 'react-flip-move';

export const TransactionList = () => {
    const { transactions, getTransactions, loading, deleteAllTransactions } = useContext(GlobalState)
    useEffect(() => {
        getTransactions()
        // eslint-disable-next-line 
    }, [])

    const length = transactions.length < 1 ? true : false

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #bbb' }}>
                <h3>History</h3>
                <div>
                    <button
                        style={{ opacity: length ? .75 : 1, cursor: length ? 'not-allowed' : 'pointer' }}
                        className="btn"
                        type='submit'
                        disabled={length ? true : false}
                        onClick={deleteAllTransactions}
                    >
                        Reset
                    </button>
                </div>
            </div>
            {loading ? <Skeleton height="2.5rem" rows={5} />
                :
                <div>
                    {length && <p style={{ textAlign: 'center' }}>You have no transaction history</p>}
                    <FlipMove
                        staggerDurationBy="30"
                        duration={500}
                        typeName="div"
                    >
                        {transactions.map(transaction => {
                            return <ul className="list" key={transaction._id}> <Transaction transaction={transaction} /></ul>
                        })}
                    </FlipMove>
                </div>
            }

        </>
    )
}

