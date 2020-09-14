import React, { useState } from "react";
import "./App.css";

const normalizePhone = (value, previousValue) => {
  if (!value) return value;
  const nums = value.replace(/[^\d]/g, ""); // only allows 0-9

  if (!previousValue || value.length > previousValue.length) {
    if (nums.length === 3) return `(${nums})`;
    if (nums.length === 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;

    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;

    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`;
  }
};

function App() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    phone: "",
  };

  const [form, setForm] = useState(initialFormState);

  const reset = (event) => {
    event.preventDefault();
    setForm({ ...form, ...initialFormState });
  };

  return (
    <div className="App">
      <h1>Input Mask Example</h1>
      <h2>Form Example</h2>
      <form onReset={reset} className="testform">
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={form.firstName}
          onChange={(event) => {
            const { value } = event.target;
            setForm({
              ...form,
              firstName: value.replace(/[^A-Za-z]/gi, "").toUpperCase(),
            });
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={form.lastName}
          onChange={(event) => {
            const { value } = event.target;
            setForm({
              ...form,
              lastName:
                value
                  .replace(/[^A-Za-z]/gi, "")
                  .charAt(0)
                  .toUpperCase() + value.slice(1),
            });
          }}
        />
        <input
          type="tel"
          placeholder="Telephone"
          name="phone"
          value={form.phone}
          onChange={(event) => {
            const { value } = event.target;
            setForm({
              ...form,
              phone: normalizePhone(value, initialFormState.phone),
            });
          }}
        />
        <input type="reset" value="Reset" />
      </form>
      <h2>Form Submitted Data</h2>
      <pre>
        <code>{JSON.stringify(form)}</code>
      </pre>
    </div>
  );
}

export default App;
