import { useEffect, useReducer, useRef } from "react";
const controller = {
  width: "90%",
  padding: ".5em",
  borderRadius: ".5em",
  backgroundColor: "gray",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  marginTop: "5em",
  gap: ".5em",
};
const btnStyle = {};
function reducer(state, action) {
  switch (action.type) {
    case "setCTX":
      return { ...state, canvasCTX: action.payload };
    case "setMouseData":
      return { ...state, mouse: action.payload };
    case "setColor":
      return { ...state, color: action.payload };
    case "setSize":
      return { ...state, size: action.payload };
  }
}
function Painting() {
  const [state, dispatch] = useReducer(reducer, {
    mouse: { x: 0, y: 0 },
    canvasCTX: null,
    color: "#000",
    size: "10",
  });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { mouse, canvasCTX, color, size } = state;
  useEffect(function () {
    ResetCanva();
  }, []);
  function ResetCanva() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dispatch({ type: "setCTX", payload: context });
  }
  function Draw(e) {
    if (e.buttons !== 1) return;
    const ctx = canvasCTX;
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    dispatch({ type: "setMouseData", payload: { x: e.clientX, y: e.clientY } });
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={controller}>
        <h2 style={{ color: "#fff" }}>Painting</h2>
        <label style={{ color: "#fff" }}>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) =>
            dispatch({ type: "setColor", payload: e.target.value })
          }
        />
        <label style={{ color: "#fff" }}>Size:</label>
        <input
          type="range"
          min={0}
          value={size}
          onChange={(e) =>
            dispatch({ type: "setSize", payload: e.target.value })
          }
        />
        <button onClick={() => ResetCanva()}>Clear🧹</button>
      </div>
      <div ref={containerRef} style={{ height: "100%" }}>
        <canvas
          width="100%"
          height="100%"
          ref={canvasRef}
          onMouseEnter={(e) =>
            dispatch({
              type: "setMouseData",
              payload: { x: e.clientX, y: e.clientY },
            })
          }
          onMouseMove={(e) => {
            dispatch({
              type: "setMouseData",
              payload: { x: e.clientX, y: e.clientY },
            });
            Draw(e);
          }}
          onMouseDown={(e) =>
            dispatch({
              type: "setMouseData",
              payload: { x: e.clientX, y: e.clientY },
            })
          }
        ></canvas>
      </div>
    </div>
  );
}
export default Painting;
