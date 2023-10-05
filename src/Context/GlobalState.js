import React,{createContext,useReducer} from "react";
import AppReducer from './AppReducer'
//initial state 
const initialState={
    transactions:[
    
    ]
}

// Create Context

export const GlobalContext=createContext(initialState)

//provider 
export const GlobalProvider =({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState);

    //action
   function deleteTransaction(id)
{
    dispatch({
        type:'DELETE_TRANSACTION',
        payload:id
    });

}   

const AddTransaction=(transaction)=>{
    dispatch({
        type:'ADD_TRANSACTION',
        payload:transaction
    });

}

return(<GlobalContext.Provider value={{
        transactions:state.transactions,deleteTransaction,AddTransaction
    }}>{children}</GlobalContext.Provider>)
}