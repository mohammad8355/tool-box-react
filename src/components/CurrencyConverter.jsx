import { Children, useEffect, useState } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  useEffect(() => {
    if (From.length > 0 && To.length > 0) {
      const host = "api.frankfurter.app";
      fetch(`https://${host}/latest?amount=${amount}&from=${From}&to=${To}`)
        .then((resp) => resp.json())
        .then((data) => {
          setConvertedAmount(data.rates[To]);
        });
    }
  }, [amount, From, To]);
  return (
    <div>
      <h1>CurrencyConverter</h1>
      <Result style={{ textWrap: "break-word" }}>
        From {From} Converted To {convertedAmount} {To}
      </Result>
      <Form
        From={From}
        To={To}
        setAmount={setAmount}
        setFrom={setFrom}
        setTo={setTo}
      />
    </div>
  );
}
function Form({ setAmount, setFrom, setTo, To, From }) {
  return (
    <form style={FormStyle}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Amount</label>
        <input
          style={inputStyle}
          onChange={(e) => setAmount(Number(e.target.value))}
          type="text"
          placeholder="Amount"
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>From</label>
        <select
          style={inputStyle}
          onChange={(e) => setFrom(e.target.value)}
          value={From}
        >
          <option value="USD">United States</option>
          <option value="EUR">Eurozone</option>
          <option value="JPY">Japan</option>
          <option value="GBP">United Kingdom</option>
          <option value="AUD">Australia</option>
          <option value="CAD">Canada</option>
          <option value="CHF">Switzerland</option>
          <option value="CNY">China</option>
          <option value="SEK">Sweden</option>
          <option value="NZD">New Zealand</option>
        </select>
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>To</label>
        <select
          style={inputStyle}
          onChange={(e) => setTo(e.target.value)}
          value={To}
        >
          <option value="USD">United States</option>
          <option value="EUR">Eurozone</option>
          <option value="JPY">Japan</option>
          <option value="GBP">United Kingdom</option>
          <option value="AUD">Australia</option>
          <option value="CAD">Canada</option>
          <option value="CHF">Switzerland</option>
          <option value="CNY">China</option>
          <option value="SEK">Sweden</option>
          <option value="NZD">New Zealand</option>
        </select>
      </div>
    </form>
  );
}
function Result({ children }) {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
}
const FormStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: ".5em",
  margin: ".5em",
  gap: ".5em",
};
const formGroupStyle = {
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
const btnStyle = {
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: 500,
  fontFamily: "inherit",
  backgroundColor: "#FFEDF8",
  cursor: "pointer",
};
const labelStyle = {
  fontSize: "1.5em",
  color: "#242424",
  fontWeight: "bold",
};
const inputStyle = {
  width: "100%",
  padding: ".5em",
  border: "none",
  outline: "none",
  borderRadius: ".5em",
  backgroundColor: "#FFEDF8",
  fontSize: "1.5em",
  color: "#CE6CB6",
};
export default CurrencyConverter;
