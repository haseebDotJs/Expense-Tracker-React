import { Top } from './Top'
import { Header } from './Header/Header'
import { Balance } from './Balance'
import { IncomeExpenses } from './IncomeExpenses'
import { TransactionList } from './Transactions/TransactionList'
import { AddTransaction } from './AddTransaction'
import { Container, Box } from '@material-ui/core'

const ExpenseTrackerHome = () => {
    return (
        <Box>
            <Header />
            <Container maxWidth="sm" >
                <Box mt={3}>
                    <Top />
                    <Balance />
                    <IncomeExpenses />
                    <TransactionList />
                    <AddTransaction />
                </Box>
            </Container>
        </Box>
    )
}
export default ExpenseTrackerHome