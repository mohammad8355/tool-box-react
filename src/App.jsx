import { useState } from "react";
import StopWatch from "./components/StopWatch";
import CurrencyConverter from "./components/CurrencyConverter";
import WeatherStatus from "./components/WeatherStatus";
import Calculator from "./components/Calculator";
import ToDoList from "./components/ToDoList";
import "./style.css";
import SnakeGame from "./components/SnakeGame";
import InfoBox from "./components/InfoBox";
function App() {
  const [Item, setItem] = useState("");
  return (
    <>
      <div className="ToolBox">
        <header>
          <h1>Tool Box</h1>
        </header>
        <main>
          <Menu setItem={setItem} />
          {Item === "calculator" ? (
            <Calculator />
          ) : Item === "weather" ? (
            <WeatherStatus />
          ) : Item === "stopwatch" ? (
            <StopWatch />
          ) : Item === "currencyconverter" ? (
            <CurrencyConverter />
          ) : Item === "todolist" ? (
            <ToDoList />
          ) : Item === "game" ? (
            <SnakeGame />
          ) : Item === "about" ? (
            <InfoBox iconColor="#fc2db4">
              <h2>About App</h2>
              <p>
                This ToolBox provide small apps that can be useful in your daily
                work.this app developed by Mohammad.M Kh
              </p>
            </InfoBox>
          ) : (
            ""
          )}
          {/* <StopWatch /> */}
          {/* <CurrencyConverter /> */}
          {/* <WeatherStatus /> */}
          {/* <Calculator /> */}
          {/* <ToDoList /> */}
        </main>
      </div>
    </>
  );
}
function Menu({ setItem }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <div
      className={open ? "container active" : "container"}
      onClick={() => setOpen(!open)}
      style={{ position: "absolute", top: position.y, left: position.x }}
    >
      <span
        style={{ "--i": -1, "--x": -1, "--y": -1 }}
        onClick={() => setItem("calculator")}
      >
        {" "}
        <i className="fa-solid fa-calculator"></i>
        {/* <h5>Calculator</h5> */}
      </span>
      <span
        style={{ "--i": 1, "--x": 1, "--y": -1 }}
        onClick={() => setItem("weather")}
      >
        {" "}
        <i className="fa-solid fa-temperature-low"></i>
        {/* <h5>Weather</h5> */}
      </span>
      <span
        style={{ "--i": 2, "--x": -1, "--y": 0 }}
        onClick={() => setItem("stopwatch")}
      >
        {" "}
        <i className="fa-solid fa-stopwatch"></i>
        {/* <h5>StopWatch</h5> */}
      </span>
      <span
        style={{ "--i": 3, "--x": 0, "--y": 0 }}
        onClick={() => setItem("currencyconverter")}
      >
        {" "}
        <i className="fas fa-exchange"></i>
        {/* <h5>CurrencyConverter</h5> */}
      </span>
      <span
        style={{ "--i": 4, "--x": 0, "--y": -1 }}
        onClick={() => setItem("todolist")}
      >
        {" "}
        <i className="fa-solid fa-list"></i>
        {/* <h5>ToDoList</h5> */}
      </span>
      <span
        style={{ "--i": 5, "--x": 1, "--y": 0 }}
        onClick={() => setItem("game")}
      >
        {" "}
        <i className="fa-solid fa-gamepad"></i>
        {/* <h5>game</h5> */}
      </span>
      <span
        style={{ "--i": 6, "--x": 1, "--y": 1 }}
        onClick={() => setItem("setting")}
      >
        {" "}
        <i className="fa-solid fa-cog"></i>
        {/* <h5>Settings</h5> */}
      </span>
      <span
        style={{ "--i": 7, "--x": 0, "--y": 1 }}
        onClick={() => setItem("profile")}
      >
        {" "}
        <i className="fa-solid fa-user"></i>
        {/* <h5>Settings</h5> */}
      </span>
      <span
        style={{ "--i": 8, "--x": -1, "--y": 1 }}
        onClick={() => setItem("about")}
      >
        {" "}
        <i className="fa-solid fa-question"></i>
        {/* <h5>Settings</h5> */}
      </span>
    </div>
  );
}
export default App;
