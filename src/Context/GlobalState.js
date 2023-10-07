import React, { createContext, useReducer, useEffect, useCallback, useState } from "react";
import AppReducer from './AppReducer';

const initialState = {
  transactions: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [expenses, setExpenses] = useState([]);
  const [csv, setCsv] = useState([]);
  const userEmail = localStorage.getItem("email");

  const deleteTransaction = (id) => {
    fetch(
      `https://expensetracker-1f575-default-rtdb.firebaseio.com/userExpenses/${userEmail}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then(() => {
        console.log('Expense deleted successfully!');
        // Update the expenses and dispatch the delete action
        setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id !== id));
        dispatch({
          type: 'DELETE_TRANSACTION',
          payload: id,
        });
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
        alert('Error deleting expense');
      });
  };

  const addTransaction = (transaction) => {
    // Firebase POST request to add the transaction
    fetch(
      `https://expensetracker-1f575-default-rtdb.firebaseio.com/userExpenses/${userEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Expense added successfully!', data);
        const expenseDataWithId = { ...transaction, id: data.name };
        setExpenses((prevExpenses) => [...prevExpenses, expenseDataWithId]);
        // Dispatch the new transaction to update the state
        dispatch({ type: 'ADD_TRANSACTION', payload: expenseDataWithId });
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
        alert('Error adding expense');
      });
  };

  const fetchExpenses = useCallback(() => {
    fetch(
      `https://expensetracker-1f575-default-rtdb.firebaseio.com/userExpenses/${userEmail}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            let arr = [];
            for (let key in data) {
              arr.push({
                id: key,
                text: data[key].text,
                amount: data[key].amount,
                category: data[key].category,
              });
            }
            setCsv(arr);
            setExpenses(arr);
            localStorage.setItem("allExpense", JSON.stringify(arr));
            dispatch({ type: 'SET_TRANSACTIONS', payload: arr });
          });
        } else {
          response.json().then((data) => {
            let errorMessage = "Fetching expenses failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        expenses,
        csv,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
