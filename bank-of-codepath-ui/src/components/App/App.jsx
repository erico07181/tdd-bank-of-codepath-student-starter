import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState(null);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [newTransactionForm, setNewTransactionForm] = useState({
    category: "",
    description: "",
    amount: 0,
  });
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          filterInputValue={filterInputValue}
          setFilterInputValue={setFilterInputValue}
        >
          <div className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    transfers={transfers}
                    setTransfers={setTransfers}
                    error={error}
                    setError={setError}
                    filterInputValue={filterInputValue}
                    newTransactionForm={newTransactionForm}
                    setNewTransactionForm={setNewTransactionForm}
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                  />
                }
              />
            </Routes>
          </div>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}
