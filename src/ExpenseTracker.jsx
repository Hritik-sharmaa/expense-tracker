import React, { useEffect, useState } from "react";

const ExpenseTracker = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [amt, setAmt] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("expenseItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    const storedAmt = localStorage.getItem("expenseAmt");
    if (storedAmt) {
      setAmt(parseFloat(storedAmt));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseItems", JSON.stringify(items));
    localStorage.setItem("expenseAmt", totalAmt);
  }, [items, totalAmt]);

  function handleInputChange(e) {
    setNewItem(e.target.value);
  }

  function handleAmtChange(e) {
    setAmt(e.target.value);
  }

  function handleItemChange() {
    if (newItem.trim() !== "" && amt.trim() !== "") {
      const newObjItem = { name: newItem, amount: parseFloat(amt) };
      setItems((prevItem) => [...prevItem, newObjItem]);
      setNewItem("");
      setAmt("");
      setTotalAmt((prevTotal) => prevTotal + parseFloat(amt));
    }
  }

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <div className="main">
        <div className="input-field">
          <label>Item: </label>
          <input
            type="text"
            placeholder="Enter item name..."
            onChange={handleInputChange}
            value={newItem}
          />
          <label>Item Amount: </label>
          <input
            type="number"
            placeholder="enter the item amount..."
            onChange={handleAmtChange}
            value={amt}
            aria-label="fullname"
          />
        </div>
        <div className="item-details">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <span>
                  {item.name}: ₹{item.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="total-amt">
          <h5>Total: ₹{totalAmt}</h5>
        </div>
        <button onClick={handleItemChange}>add item</button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
