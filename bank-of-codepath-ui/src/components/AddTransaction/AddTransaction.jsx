import * as React from "react";
import "./AddTransaction.css";

export default function AddTransaction(props) {
  function handleOnFormFieldChange(change) {
    if (change.target.name === "category") {
      props.setForm({ ...props.form, category: change.target.value });
    }
    if (change.target.name === "description") {
      props.setForm({ ...props.form, description: change.target.value });
    } else {
      props.setForm({ ...props.form, amount: parseInt(change.target.value) });
    }
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={props.handleOnSubmit}
        form={props.form}
        isCreating={props.isCreating}
        setIsCreating={props.setIsCreating}
      />
    </div>
  );
}

export function AddTransactionForm({
  handleOnFormFieldChange,
  handleOnSubmit,
  form,
  isCreating,
  setIsCreating,
}) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={form ? form.description : ""}
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form ? form.category : ""}
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            type="number"
            name="amount"
            value={form ? form.amount : ""}
            onChange={handleOnFormFieldChange}
          />
        </div>

        <button
          className="btn add-transaction"
          type="submit"
          onClick={handleOnSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}
