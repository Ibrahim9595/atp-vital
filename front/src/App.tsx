import "./App.css";
import { useEffect, useState } from "react";
import { Game } from "./components/game";
import { io } from "socket.io-client";
import { GameBoardState, GameState } from "./utils";

const socket = io(process.env.REACT_APP_SERVER_URL || "");

function App() {
  const [state, setState] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.userId && params.team) {
      socket.emit("start-game", {
        userId: parseInt(params.userId),
        team: parseInt(params.team),
      });
      socket.on("game-started", (gameState: GameState) =>
        setState({ ...gameState, myId: parseInt(params.userId) })
      );
      socket.on("played", (gameState: GameState) =>
        setState({ ...gameState, myId: parseInt(params.userId) })
      );
      socket.on("error", (error) => {
        alert("The team is not available");
        setError(error);
      });
    } else {
      setError(
        `Please use one of the following urls 
        http://localhost:3000?team=1&userId=1, 
        http://localhost:3000?team=1&userId=2, 
        http://localhost:3000?team=2&userId=3, 
        http://localhost:3000?team=2&userId=4`
      );
    }
  }, []);

  const emitChange = (change: Partial<GameBoardState>) => {
    socket.emit("play", change);
  };

  console.log(state?.currentPlayer, state?.myId);

  return error ? (
    <pre>{error}</pre>
  ) : (
    <div className="App">
      {state ? (
        <>
          <p>
            currentPlayer:{" "}
            {state.currentPlayer === state.myId ? "You" : "Your college"}
          </p>
          <Game
            boardState={state.gameBoard}
            onValueChange={(e) => {
              const toBeCommitted = e.reduce((p, el) => {
                const current = state.gameBoard[el.id];
                const newVal =
                  el.op === "+" ? current + el.value : current - el.value;
                return Object.assign(p, { [el.id]: newVal });
              }, {});

              setState({
                ...state,
                gameBoard: { ...state.gameBoard, ...toBeCommitted },
              });
              emitChange(toBeCommitted);
            }}
          />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default App;
