import { useEffect, useState } from "react";
import StopWatch from "./components/StopWatch";
import CurrencyConverter from "./components/CurrencyConverter";
import WeatherStatus from "./components/WeatherStatus";
import Calculator from "./components/Calculator";
import ToDoList from "./components/ToDoList";
import "./style.css";
import SnakeGame from "./components/SnakeGame";
import InfoBox from "./components/InfoBox";
import Painting from "./components/Painting";
function App() {
  const [Item, setItem] = useState("home");
  const [position, setPosition] = useState({
    x: 10,
    y: 10,
  });
  const [isDragging, setIsDragging] = useState(false);
  function move(e) {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      move(e);
    });
  }, [setPosition]);
  useEffect(() => {
    document.title = "ToolBox | " + Item;
  }, [Item]);
  return (
    <>
      <div
        onMouseUp={() => setIsDragging(false)}
        onDragOverCapture={(e) => move(e)}
        className="ToolBox"
      >
        <header>
          <h1>Tool Box</h1>
        </header>
        <main onDragOverCapture={(e) => move(e)}>
          <Menu
            position={position}
            setItem={setItem}
            setIsDragging={setIsDragging}
          />
          {Item === "calculator" ? (
            <Calculator />
          ) : Item === "movie" ? (
            ""
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
                This ToolBox app provide small tools that can be useful in your
                daily work.this app developed by Mohammad.M Kh and use React in
                this project for source code you can see this{" "}
                <a
                  target="_"
                  href="https://github.com/mohammad8355/tool-box-react"
                >
                  LINK
                </a>
              </p>
            </InfoBox>
          ) : Item === "paint" ? (
            <Painting />
          ) : (
            Item === "home" && ""
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
function Menu({ setItem, position, setIsDragging }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onDragStart={() => setIsDragging(true)}
      onMouseDown={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      // onDragEndCapture={() => setIsDragging(false)}
      // onDragOverCapture={(e) => move(e)}
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
        onClick={() => setItem("movie")}
      >
        {" "}
        <a target="_" href="https://usepopcorn.mohammadmahdialmasi.ir">
          <i class="fa-solid fa-video"></i>
        </a>
        {/* <h5>Movie</h5> */}
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
        style={{ "--i": 6, "--x": 1, "--y": 1 }}
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
        style={{ "--i": 3, "--x": 0, "--y": 0 }}
        onClick={() => setItem("home")}
      >
        {" "}
        <i className="fa-solid fa-house"></i>
      </span>
      <span
        style={{ "--i": 7, "--x": 0, "--y": 1 }}
        onClick={() => setItem("paint")}
      >
        {" "}
        <i className="fa-solid fa-paintbrush"></i>
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
