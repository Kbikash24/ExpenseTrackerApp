import React,{useState,useContext} from 'react'
import { GlobalContext } from '../../Context/GlobalState'
import './Expense.css'

const AddTransaction = () => {
    const[text, setText]=useState('')
    const [amount,setAmount]=useState(0)
    const {addTransaction}=useContext(GlobalContext)
     const onSubmit=(e)=>{
        e.preventDefault()
        const newTransaction={
            id:Math.floor(Math.random()*100000),
            text,amount:+amount
        }
           addTransaction(newTransaction);
           setAmount('')
           setText('')
     }
  return (
    <><h3>
        Add new transaction
    </h3>
    <form onSubmit={onSubmit}>
        <div className='form-control'>
            <label htmlFor ="text">Description</label>
            <input type='text' value={text} onChange={(e)=>setText(e.target.value)} placeholder='Enter text...'></input>
        </div>
        <div>
            <label htmlFor='amount'>Amount <br/>(negative-expense,positive-income)</label>
            <input type='number'  value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder='Enter amount...'></input>
        </div>
        <button className='btnss' >Add transaction</button>
    </form>
</>
  )
}

export default AddTransaction