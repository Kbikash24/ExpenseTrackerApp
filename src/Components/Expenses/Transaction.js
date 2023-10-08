import React, { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import { BiSolidEditAlt } from "react-icons/bi";

const Transaction = ({ transaction }) => {
  const { deleteTransaction, editTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";

  // State to manage the edited transaction data
  const [editedTransaction, setEditedTransaction] = useState({
    id: transaction.id,
    text: transaction.text,
    amount: transaction.amount,
    category: transaction.category,
  });

  // State to control the edit mode
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    // Enable edit mode when the "Edit" button is clicked
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Call the editTransaction function to save the changes
    editTransaction(editedTransaction);

    // Disable edit mode after saving
    setEditMode(false);
  };

  return (
    <>
      <li className={transaction.amount > 0 ? "plus" : "minus"}>
        {editMode ? (
          // Render input fields in edit mode
          <>
            <input
              type="text"
              value={editedTransaction.text}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  text: e.target.value,
                })
              }
            />
            <input
              type="number"
              value={editedTransaction.amount}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  amount: parseFloat(e.target.value),
                })
              }
            />
            
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          // Render transaction details when not in edit mode
          <>
            {transaction.text}{" "}
            <span>
              {sign}${Math.abs(transaction.amount)}
            </span>{" "}
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="delete-btn"
            >
              x
            </button>
            <button className="Edit-btn" onClick={handleEditClick}>
              <BiSolidEditAlt />
            </button>
          </>
        )}
      </li>
    </>
  );
};

export default Transaction;
