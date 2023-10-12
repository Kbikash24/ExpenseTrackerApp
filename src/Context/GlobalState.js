import React, { createContext, useReducer, useEffect, useCallback, useState } from "react";
import AppReducer from './AppReducer';
import themeReducer from './ThemeReducer';

const initialState = {
  transactions: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [themeState, themeDispatch] = useReducer(themeReducer, { isDarkMode: false }); // Initialize theme state
  const [expenses, setExpenses] = useState([]);
  const [csv, setCsv] = useState([]);
   const userEmail = localStorage.getItem("email");
   const [premium, setPremium]= useState(false);

  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" }); // Dispatch the toggle theme action
  };
 const checkPremium = (expenses) => {
  const totalExpense = expenses.reduce(
    (total, expense) => {
      if (expense.amount < 0) {
        return total + Math.abs(expense.amount); // Consider only expenses (amounts with a negative sign)
      }
      return total;
    },
    0
  );
  console.log(totalExpense);
  return totalExpense > 10000;
};
 


  const exportExpensesAsCSV = () => {
    // Create a CSV data string from your expenses
    const csvData = "Category,amount\n" + expenses.map((expense) => (
      `${expense.text},${expense.amount}`
    )).join("\n");

    // Create a Blob and download link for the CSV file
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


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

  

const editTransaction = (editedTransaction) => {
  const { id } = editedTransaction;

  // Firebase PUT request to update the transaction
  fetch(
    `https://expensetracker-1f575-default-rtdb.firebaseio.com/userExpenses/${userEmail}/${id}.json`,
    {
      method: "PUT",
      body: JSON.stringify(editedTransaction),
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
      console.log('Expense edited successfully!', data);

      // Update the expenses and dispatch the edit action
      setExpenses((prevExpenses) =>
        prevExpenses.map((item) =>
          item.id === id ? editedTransaction : item
        )
      );

      dispatch({
        type: 'EDIT_TRANSACTION',
        payload: editedTransaction,
      });
    })
    .catch((error) => {
      console.error('Error editing expense:', error);
      alert('Error editing expense');
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
            setPremium(checkPremium(arr));
            
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
        editTransaction,
        expenses,
        csv,
        premium,
        toggleTheme, // Include the toggleTheme function in the context
        isDarkMode: themeState.isDarkMode, // Include the theme state
        exportExpensesAsCSV,
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
