import { forwardRef, useEffect, useRef, useState } from "react";
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
function SnakeGame() {
  const [isStart, setIsStart] = useState(false);
  //const [snakeLength, setSnakeLength] = useState(3);
  const [direction, setDirection] = useState("RIGHT");
  const [Score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageState(0, "BestScore");
  const boardEL = useRef(null);
  function handleStart() {
    setIsStart(!isStart);
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

  useKey("ArrowUp", () => {
    setDirection("TOP");
  });
  useKey("ArrowDown", () => {
    setDirection("BOTTOM");
  });
  useKey("ArrowRight", () => {
    setDirection("RIGHT");
  });
  useKey("ArrowLeft", () => {
    setDirection("LEFT");
  });
  useKey("Enter", () => {
    setIsStart(!isStart);
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
                if (direction != "RIGHT") setDirection("LEFT");
              }}
            >
              🢀
            </ControlBtn>
            <ControlBtn
              onChange={() => {
                if (direction != "BOTTOM") setDirection("TOP");
              }}
            >
              🡹
            </ControlBtn>
            <ControlBtn
              onChange={() => {
                if (direction != "TOP") setDirection("BOTTOM");
              }}
            >
              🢃
            </ControlBtn>
            <ControlBtn
              onChange={() => {
                if (direction != "LEFT") setDirection("RIGHT");
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
          setIsStart={setIsStart}
          setScore={setScore}
          hasHitEdge={hasHitEdge}
          setDirection={setDirection}
          setBestScore={setBestScore}
          score={Score}
          bestScore={bestScore}
          hasEatenFood={hasEatenFood}
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
}) {
  const initialSnake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  const initialDir = Array(3).fill("+H");
  const [FoodPosition, setFoodPosition] = useState({ x: 0, y: 0 });
  const [snake, setSnake] = useState(initialSnake);
  const [dirPath, setDirPath] = useState(initialDir);
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

  const moveSnake = () => {
    if (direction === "RIGHT") {
      dirPath.push("+H");
      dirPath.shift();
    } else if (direction === "LEFT") {
      dirPath.push("-H");
      dirPath.shift();
    } else if (direction === "TOP") {
      dirPath.push("-V");
      dirPath.shift();
    } else if (direction === "BOTTOM") {
      dirPath.push("+V");
      dirPath.shift();
    }

    setSnake((currentSnake) => {
      return currentSnake.map((item, i) => {
        return dirPath[i] === "+H"
          ? { ...item, x: item.x + 1 }
          : dirPath[i] === "-H"
          ? { ...item, x: item.x - 1 }
          : dirPath[i] === "+V"
          ? { ...item, y: item.y + 1 }
          : dirPath[i] === "-V" && { ...item, y: item.y - 1 };
      });
    });
  };
  useEffect(() => {
    const head = snake[snake.length - 1];
    if (hasEatenFood(head, FoodPosition) && isStart) {
      setFoodPosition(RandomFood());
      setScore((s) => s + 1);
      let newSegment;
      switch (dirPath[0]) {
        case "+H":
          newSegment = { x: snake[0].x - 1, y: snake[0].y };
          break;
        case "-H":
          newSegment = { x: snake[0].x + 1, y: snake[0].y };
          break;
        case "+V":
          newSegment = { x: snake[0].x, y: snake[0].y - 1 };
          break;
        case "-V":
          newSegment = { x: snake[0].x, y: snake[0].y + 1 };
          break;
      }
      if (newSegment) {
        setSnake((prevSnake) => [newSegment, ...prevSnake]);
        dirPath.unshift(dirPath[0]);
      }
    }
    if (
      hasHitEdge({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y,
      }) ||
      hasHitSelf(snake)
    ) {
      setIsStart(false);
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
      IntervalId.current = setInterval(moveSnake, 500);
    }
    return () => {
      if (IntervalId.current) {
        clearInterval(IntervalId.current);
      }
    };
  }, [isStart, direction]);
  function ResetGame() {
    setDirection("RIGHT");
    setScore(0);
    setSnake(initialSnake);
    setDirPath(initialDir);
  }
  return (
    <div style={SnakeStyle}>
      {snake.map((pos, i) =>
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
