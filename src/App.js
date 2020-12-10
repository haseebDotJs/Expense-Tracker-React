import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/Transactions/TransactionList'
import { AddTransaction } from './components/AddTransaction'

import { GlobalProvider } from './context/GlobalState'

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div>
        <Header />
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
