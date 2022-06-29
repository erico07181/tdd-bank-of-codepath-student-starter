import * as React from "react";
import { useEffect } from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import { API_BASE_URL } from "../../constants";
import axios from "axios";

export default function Home({
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError,
  isLoading,
  setIsLoading,
  filterInputValue,
  newTransactionForm,
  setNewTransacrionForm,
  isCreating,
  setIsCreating,
}) {
  async function handleOnCreateTransaction() {
    setIsCreating(true);

    try {
      await axios
        .post(`${API_BASE_URL}/bank/transactions`, {
          transactions: { ...newTransactionForm },
        })
        .then((res) => {
          setTransactions([...transactions, res.data.transactions]);
        });
    } catch (err) {
      setError(err);
      setIsCreating(false);
    }
  }

  function filterTransactions(i) {
    let res = [];
    if (transactions == null) {
      return;
    }
    transactions.forEach((item) => {
      if (item.description.toLowerCase().includes(i.toLowerCase())) {
        res = [...res, item];
      }
    });
    return res;
  }

  function findError() {
    if (error == null) {
      return (
        <BankActivity
          transactions={
            filterInputValue == ""
              ? transactions
              : filterTransactions(filterInputValue)
          }
        />
      );
    } else {
      return <h2 className="error">Error</h2>;
    }
  }

  React.useEffect(() => {
    console.log(`${API_BASE_URL}/bank/transactions`);
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/bank/transactions`)
      .then((res) => {
        setTransactions(res.transactions);
      })
      .catch((err) => setError(1));

    axios
      .get(`${API_BASE_URL}/bank/transfers`)
      .then((res) => {
        setTransfers(res.transfers);
      })
      .catch((err) => setError(1));

    setIsLoading(false);
  }, []);

  return (
    <div className="home">
      <AddTransaction
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={newTransactionForm}
        setForm={setNewTransacrionForm}
        handleOnSubmit={handleOnCreateTransaction}
      />
      {isLoading ? <h1>Loading...</h1> : findError()}
    </div>
  );
}
