import { useEffect, useState } from "react";

function Calculator() {
  const [temp, setTemp] = useState("");
  const [number1, setNumber1] = useState(null);
  const [operator, setOperator] = useState("");
  const [resettemp, setResetTemp] = useState(false);
  function clean() {
    setTemp(temp.substring(0, temp.length - 1));
  }
  function cleanComplete() {
    setNumber1(null);
    setOperator("");
    setTemp("");
  }
  function calculate(op) {
    let result = 0;
    let num1 = number1;
    let num2 = Number(temp);
    switch (op) {
      case "+":
        result = num1 + num2;
        return result;
      case "-":
        result = num1 - num2;
        return result;
      case "*":
        result = num1 * num2;
        return result;
      case "/":
        result = num1 / num2;
        return result;
    }
  }
  function OperatorHandle(op) {
    if (number1 != null) {
      let result = calculate(operator);
      setTemp(result);
      setNumber1(Number(result));
      setOperator(op);
      setResetTemp(true);
    } else {
      setNumber1(Number(temp));
      setOperator(op);
      setTemp("");
    }
  }
  function handleEqual() {
    if (number1 != null && operator.length > 0 && temp.length > 0) {
      let result = calculate(operator);
      setTemp(result);
      setNumber1(0);
    }
  }
  function handleNumberClick(c) {
    if (resettemp) {
      setTemp(c);
    } else {
      setTemp((t) => t + c);
    }
  }
  function Inverse() {
    setTemp((Number(temp) * -1).toString());
  }
  return (
    <div style={calcStyle}>
      <h1 style={{ color: "#fff", padding: "0", margin: "0" }}>Calculator</h1>
      <div style={resultStyle}>
        <p>{temp}</p>
      </div>
      <div style={mainbtnContainerStyle}>
        {Array.from({ length: 9 }, (_, i = 0) => (
          <Btn key={i} onChange={() => handleNumberClick((i + 1).toString())}>
            {i + 1}
          </Btn>
        ))}
        <Btn onChange={() => setTemp((c) => c + "0")}>0</Btn>
        <Btn onChange={Inverse}>+/-</Btn>
        <Btn onChange={() => handleNumberClick(".")}>.</Btn>
        <Btn onChange={() => OperatorHandle("+")}>+</Btn>
        <Btn onChange={() => OperatorHandle("-")}>-</Btn>
        <Btn onChange={() => OperatorHandle("*")}>*</Btn>
        <Btn onChange={() => OperatorHandle("/")}>/</Btn>
        <Btn onChange={clean}>C</Btn>
        <Btn onChange={cleanComplete}>CE</Btn>
        <Btn onChange={handleEqual} cssstyle={{ gridColumn: "span 2" }}>
          =
        </Btn>
      </div>
    </div>
  );
}
function Btn({ children, onChange, cssstyle = {} }) {
  return (
    <button style={cssstyle} onClick={onChange}>
      {children}
    </button>
  );
}
const calcStyle = {
  padding: ".5em",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#242424",
  borderRadius: ".5em",
};
const resultStyle = {
  color: "#242424",
  backgroundColor: "#fff",
  height: "3em",
  borderRadius: ".5em",
  margin: ".5em 0 .5em 0",
};
const mainbtnContainerStyle = {
  gap: "10px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(5, 1fr)",
};
export default Calculator;
