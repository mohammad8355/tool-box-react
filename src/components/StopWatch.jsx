import { useEffect, useRef, useState } from "react";

function StopWatch() {
  let [time, setTime] = useState(0);
  let [start, setStart] = useState(false);
  let [records, setRecords] = useState(function () {
    const Records = localStorage.getItem("records");
    console.log(JSON.parse(Records));
    if (Records) {
      return JSON.parse(Records);
    } else {
      return [];
    }
  });
  let timeCounter = useRef(null);
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const second = Math.floor((time % 3600) % 60);
  function handleStart() {
    if (start) return;
    setStart(true);
    timeCounter.current = setInterval(function () {
      setTime((s) => s + 1);
    }, 1000);
  }
  function handlePause() {
    if (!start) return;
    setStart(false);
    clearInterval(timeCounter.current);
  }
  function handleReset() {
    setStart(false);
    setTime(0);
    clearInterval(timeCounter.current);
  }
  function handleAddRecord() {
    var Id = Math.floor(1000 + Math.random() * 9000);
    const newRecord = { id: Id, Hour: hour, Minute: minute, Second: second };
    records.push(newRecord);
    setRecords(records);
  }
  function saveRecord() {
    localStorage.setItem("records", JSON.stringify(records));
  }
  function handleDeleteRecord(id) {
    setRecords(records.filter((record) => record.id != id));
  }
  return (
    <div>
      <h1>STOPWATCH</h1>
      <Time second={second} minute={minute} hour={hour} />
      <div style={controlStyle}>
        {start ? (
          <ControlBtn onChange={handlePause}>&#x275A;&#x275A;</ControlBtn>
        ) : (
          <ControlBtn onChange={handleStart}>&#9658;</ControlBtn>
        )}
        <ControlBtn onChange={handleReset}>&#x21bb;</ControlBtn>
        <ControlBtn onChange={handleAddRecord}>&#x2691;</ControlBtn>
        <ControlBtn onChange={saveRecord}>S</ControlBtn>
      </div>
      <ul style={recordListStyle}>
        {records &&
          records.map((record) => (
            <Record
              record={record}
              handleDeleteRecord={handleDeleteRecord}
              saveRecord={saveRecord}
              key={record.id}
            />
          ))}
      </ul>
    </div>
  );
}
function Record({ record, handleDeleteRecord }) {
  return (
    <li style={recordStyle}>
      {record.Hour < 10 ? "0" + record.Hour : record.Hour} :{" "}
      {record.Minute < 10 ? "0" + record.Minute : record.Minute} :{" "}
      {record.Second < 10 ? "0" + record.Second : record.Second}{" "}
      <button style={btnStyle} onClick={() => handleDeleteRecord(record.id)}>
        delete
      </button>
    </li>
  );
}
const controlBtnStyle = {
  boxShadow: "0px 0px 24px -3px #cccccc",
  backgroundColor: "#FFEDF8",
  borderRadius: "8px",
  textAlign: "center",
  border: "1px solid #e3c7d9",
  color: "#CE6CB6",
  fontFamily: "Arial",
  fontSize: "2em",
  padding: ".5em .5em .5em .5em",
};
const controlBtnStyleHover = {
  boxShadow: "0px 0px 24px -3px #cccccc",
  padding: ".5em .5em .5em .5em",
  backgroundColor: "#CE6CB6",
  borderRadius: "8px",
  border: "1px solid #e3c7d9",
  color: "#FFEDF8",
  fontFamily: "Arial",
  fontSize: "2em",
};
const controlStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5em",
};
const TimeStyle = {
  width: "100%",
  borderRadius: ".5em .5em 0 0 ",
  backgroundColor: "#FFDCF2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 25px 15px rgba(2,2,2,0.2)",
};
const digitStyle = {
  color: "#242424",
  fontWeight: "bold",
  fontSize: "1em",
  margin: ".5em",
  backgroundColor: "#FFEDF8",
  borderRadius: ".2em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ".5em",
};
const seprateDigitStyle = {
  color: "#242424",
  fontWeight: "bold",
  fontSize: "1em",
  color: "#fff",
  textAlign: "center",
  display: "grid",
  alignItems: "center",
};
const recordStyle = {
  width: "100%",
  backgroundColor: "#FFDCF2",
  borderRadius: ".5em",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: "bold",
  fontSize: "1.5em",
  color: "#242424",
  padding: ".2em .5em .2em .5em",
  listStyle: "none",
};
const recordListStyle = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0",
  padding: "0",
  marginTop: ".5em",
  alignItems: "center",
  gap: ".5em",
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
  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
};
function Time({ second, minute, hour }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ display: "flex" }}>
        <span style={digitStyle}>
          <h1>{hour < 10 ? "0" + hour : hour}</h1>
        </span>
        <span style={seprateDigitStyle}>
          <h1>:</h1>
        </span>
        <span style={digitStyle}>
          <h1>{minute < 10 ? "0" + minute : minute}</h1>
        </span>
        <span style={seprateDigitStyle}>
          <h1>:</h1>
        </span>
        <span style={digitStyle}>
          <h1>{second < 10 ? "0" + second : second}</h1>
        </span>
      </p>
    </div>
  );
}
function ControlBtn({ children, onChange }) {
  let [hover, setHover] = useState(false);
  return (
    <button
      style={hover ? controlBtnStyleHover : controlBtnStyle}
      onClick={onChange}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
}
export default StopWatch;
