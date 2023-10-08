export default (state, action) => {
    switch (action.type) {
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== action.payload
          ),
        };
  
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions],
        };
  
      case 'SET_TRANSACTIONS':
        return {
          ...state,
          transactions: action.payload,
        };
  
      case 'EDIT_TRANSACTION':
        // Find the index of the transaction to be edited
        const editedIndex = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
  
        // Create a new array with the edited transaction
        const updatedTransactions = [...state.transactions];
        updatedTransactions[editedIndex] = action.payload;
  
        return {
          ...state,
          transactions: updatedTransactions,
        };
  
      default:
        return state;
    }
  };
  