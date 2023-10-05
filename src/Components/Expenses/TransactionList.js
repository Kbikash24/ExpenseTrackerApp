import React,{useContext} from 'react'
import { GlobalContext } from '../../Context/GlobalState'
import Transaction from './Transaction'
import './Expense.css'
const TransactionList = () => {
const {transactions}=useContext(GlobalContext)
  return (
    <><h3>History</h3>
    <ul id='list' className='list'>
        {transactions.map(transaction=>(<Transaction transaction={transaction}/>))}
        
    </ul>
    </>
  )
}

export default TransactionList