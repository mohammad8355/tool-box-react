import { forwardRef, useEffect, useReducer, useRef, useState } from "react";
import { useLocalStorageState } from "../CustomeHooks/useLocalStorageState";
import { useKey } from "../CustomeHooks/useKey";

let boardStyle = {
  position: "relative",
  width: "100%",
  minHeight: "30em",
  backgroundColor: "#000",
};
let ScoreBoardStyle = {
  listStyle: "none",
  display: "flex",
  alignItems: "center",
  gap: ".5em",
  margin: ".5em",
};
let ScoreBoardItemsStyle = {
  padding: ".5em",
  backgroundColor: "gray",
  borderRadius: ".5em",
  color: "#fff",
};
let ControlBtnStyle = {
  border: "none",
  outline: "none",
  borderRadius: ".5em",
  color: "#fff",
  backgroundColor: "#000",
  margin: ".5em",
  padding: ".5em",
  transition: "all .5s",
};
let ControlBtnStyleOnHover = {
  border: "none",
  outline: "none",
  borderRadius: ".5em",
  color: "#fff",
  backgroundColor: "gray",
  margin: ".5em",
  padding: ".5em",
  transition: "all .5s",
};
let SnakeStyle = {
  position: "absolute",
  display: "flex",
  width: "fit-content",
};
let SnakeItemStyle = {
  position: "absolute",
  width: "1em",
  height: "1em",
  backgroundColor: "skyblue",
  transition: "all .5s",
  zIndex: "10",
};
let SnakeFoodStyle = {
  position: "absolute",
  width: "1em",
  height: "1em",
  borderRadius: "5em",
  backgroundColor: "#fff",
};
let DirectionControlContainerStyle = {
  width: "100%",
  position: "absolute",
  bottom: "0",
  left: "0",
  zIndex: "10",
};
const initialSnake = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];
const initialState = {
  isStart: false,
  Score: 0,
  direction: "RIGHT",
  snake: initialSnake,
  dirPath: ["+H", "+H", "+H"],
};
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, isStart: !state.isStart };
    case "dir":
      return { ...state, direction: action.payload };
    case "score":
      return { ...state, Score: Number(state.Score) + 1 };
    case "move":
      const newDirPath = [...state.dirPath];
      let newDirection;
      switch (state.direction) {
        case "RIGHT":
          newDirection = "+H";
          break;
        case "LEFT":
          newDirection = "-H";
          break;
        case "TOP":
          newDirection = "-V";
          break;
        case "BOTTOM":
          newDirection = "+V";
          break;
        default:
          newDirection = "+H"; // Default to +H if no valid direction
      }

      newDirPath.push(newDirection); // Add the new direction
      newDirPath.shift(); // Shift after adding the new direction

      const updatedSnake = state.snake.map((item, i) => {
        const dir = newDirPath[i];
        switch (dir) {
          case "+H":
            return { ...item, x: item.x + 1 };
          case "-H":
            return { ...item, x: item.x - 1 };
          case "+V":
            return { ...item, y: item.y + 1 };
          case "-V":
            return { ...item, y: item.y - 1 };
          default:
            return item;
        }
      });

      return {
        ...state,
        dirPath: newDirPath,
        snake: updatedSnake,
      };
    case "eat":
      let newSegment;
      switch (state.dirPath[0]) {
        case "+H":
          newSegment = { x: state.snake[0].x - 1, y: state.snake[0].y };
          break;
        case "-H":
          newSegment = { x: state.snake[0].x + 1, y: state.snake[0].y };
          break;
        case "+V":
          newSegment = { x: state.snake[0].x, y: state.snake[0].y - 1 };
          break;
        case "-V":
          newSegment = { x: state.snake[0].x, y: state.snake[0].y + 1 };
          break;
      }
      if (newSegment) {
        return {
          ...state,
          Score: state.Score + 1,
          snake: [newSegment, ...state.snake],
          dirPath: [state.dirPath[0], ...state.dirPath],
        };
      } else {
        return new Error("null new segment");
      }
    case "reset":
      return {
        isStart: false,
        Score: 0,
        direction: "RIGHT",
        snake: initialSnake,
        dirPath: ["+H", "+H", "+H"],
      };
  }
}
function SnakeGame() {
  const [bestScore, setBestScore] = useLocalStorageState(0, "BestScore");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isStart, Score, direction, snake, dirPath } = state;
  const boardEL = useRef(null);
  function handleStart() {
    dispatch({ type: "start" });
  }
  function RandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function RandomPosition() {
    const X = RandomNumber(0, boardEL.current.offsetWidth / 16 - 10);
    const Y = RandomNumber(0, boardEL.current.offsetHeight / 16 - 10);
    return { x: X, y: Y };
  }
  function hasHitEdge(position) {
    return (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= boardEL.current.offsetWidth / 16 ||
      position.y >= boardEL.current.offsetHeight / 16
    );
  }
  function hasEatenFood(snakeHead, foodPosition) {
    const distance = Math.sqrt(
      Math.pow(snakeHead.x - foodPosition.x, 2) +
        Math.pow(snakeHead.y - foodPosition.y, 2)
    );
    const threshold = 1; // Adjust this value as needed
    return distance < threshold;
  }
  function ScoreInc() {
    dispatch({ type: "score" });
  }
  function directionSet(direction) {
    dispatch({ type: "dir", payload: direction });
  }
  function Move() {
    dispatch({ type: "move" });
  }
  function ResetGame() {
    dispatch({ type: "reset" });
  }
  useKey("ArrowUp", () => {
    // setDirection("TOP");
    if (direction != "BOTTOM") {
      directionSet("TOP");
    }
  });
  useKey("ArrowDown", () => {
    // setDirection("BOTTOM");
    if (direction != "TOP") {
      directionSet("BOTTOM");
    }
  });
  useKey("ArrowRight", () => {
    // setDirection("RIGHT");
    if (direction != "LEFT") {
      directionSet("RIGHT");
    }
  });
  useKey("ArrowLeft", () => {
    // setDirection("LEFT");
    if (direction != "RIGHT") {
      directionSet("LEFT");
    }
  });
  useKey("Enter", () => {
    // setIsStart(!isStart);
    dispatch({ type: "start" });
  });
  return (
    <div style={{ width: "100%" }}>
      <h1>SnakeGame</h1>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <ControlContainer>
          <ControlBtn
            hoverStyle={ControlBtnStyleOnHover}
            style={ControlBtnStyle}
            onChange={handleStart}
          >
            {isStart ? "Pause" : "Start"}
          </ControlBtn>
          <DirectionControlContainer>
            <ControlBtn
              onChange={() => {
                if (direction != "RIGHT") directionSet("LEFT");
              }}
            >
              🢀
            </ControlBtn>
            <ControlBtn
              onChange={() => {
                if (direction != "BOTTOM") directionSet("TOP");
              }}
            >
              🡹
            </ControlBtn>
            <ControlBtn
              onChange={() => {
                if (direction != "TOP") directionSet("BOTTOM");
              }}
            >
              🢃
            </ControlBtn>
            <ControlBtn
              onChange={() => {
                if (direction != "LEFT") directionSet("RIGHT");
              }}
            >
              🢂
            </ControlBtn>
          </DirectionControlContainer>
        </ControlContainer>
        <ScoreBoard Score={Score} bestScore={bestScore} />
      </div>
      <Board ref={boardEL}>
        <Snake
          direction={direction}
          isStart={isStart}
          RandomFood={RandomPosition}
          setIsStart={handleStart}
          setScore={ScoreInc}
          hasHitEdge={hasHitEdge}
          setDirection={directionSet}
          setBestScore={setBestScore}
          score={Score}
          bestScore={bestScore}
          hasEatenFood={hasEatenFood}
          move={Move}
          eatFood={() => dispatch({ type: "eat" })}
          snake={snake}
          dirPath={dirPath}
          ResetGame={ResetGame}
        ></Snake>
      </Board>
    </div>
  );
}
const Board = forwardRef(function (props, ref) {
  return (
    <div ref={ref} style={boardStyle}>
      {props.children}
    </div>
  );
});
function Snake({
  isStart,
  direction,
  RandomFood,
  setIsStart,
  setScore,
  hasHitEdge,
  setDirection,
  score,
  bestScore,
  hasEatenFood,
  setBestScore,
  snake,
  dirPath,
  move,
  ResetGame,
  eatFood,
}) {
  const [FoodPosition, setFoodPosition] = useState({ x: 0, y: 0 });
  const headSnake = useRef(null);
  const IntervalId = useRef(null);
  function hasHitSelf(snake) {
    const head = snake[snake.length - 1];
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    const head = snake[snake.length - 1];
    if (hasEatenFood(head, FoodPosition) && isStart) {
      setFoodPosition(RandomFood());
      eatFood();
    }
    if (
      hasHitEdge({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y,
      }) ||
      hasHitSelf(snake)
    ) {
      setIsStart();
      if (score > bestScore) {
        setBestScore(score);
      }
      alert("you lose the game");
      ResetGame();
    }
  }, [snake, dirPath, FoodPosition]);

  useEffect(() => {
    setFoodPosition(RandomFood());
  }, [setFoodPosition]);
  useEffect(() => {
    if (isStart) {
      IntervalId.current = setInterval(move, 500);
    }
    return () => {
      if (IntervalId.current) {
        clearInterval(IntervalId.current);
      }
    };
  }, [isStart, direction]);
  return (
    <div style={SnakeStyle}>
      {snake &&
        snake.map((pos, i) =>
          i + 1 === snake.length ? (
            <span
              ref={headSnake}
              key={i}
              style={Object.assign({}, SnakeItemStyle, {
                left: pos.x + "em",
                top: pos.y + "em",
                backgroundColor: "blue",
                borderRadius: "0 .1em .1em 0",
              })}
            ></span>
          ) : (
            <span
              key={i}
              style={Object.assign({}, SnakeItemStyle, {
                left: pos.x + "em",
                top: pos.y + "em",
              })}
            ></span>
          )
        )}
      <span
        style={Object.assign({}, SnakeFoodStyle, {
          left: FoodPosition.x + "em",
          top: FoodPosition.y + "em",
        })}
      ></span>
    </div>
  );
}

function ScoreBoard({ Score, bestScore }) {
  return (
    <ul style={ScoreBoardStyle}>
      <li style={ScoreBoardItemsStyle}>
        <span>Score</span>:<span>{Score}</span>
      </li>
      <li style={ScoreBoardItemsStyle}>
        <span>High Score</span>:<span>{bestScore}</span>
      </li>
    </ul>
  );
}
function ControlContainer({ children }) {
  return <div>{children}</div>;
}
function DirectionControlContainer({ children }) {
  return <div style={DirectionControlContainerStyle}>{children}</div>;
}
function ControlBtn({ children, style, hoverStyle, onChange }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={hover ? hoverStyle : style}
      onClick={() => onChange()}
    >
      {children}
    </button>
  );
}
export default SnakeGame;
