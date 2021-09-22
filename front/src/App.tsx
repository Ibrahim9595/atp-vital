import "./App.css";
import { useEffect, useState } from "react";
import { Game } from "./components/game";
import { io } from "socket.io-client";
import { GameBoardState, GameState } from "./utils";

const socket = io("http://localhost:5000");

function App() {
  const [state, setState] = useState<GameState | null>(null);
  useEffect(() => {
    socket.emit("start-game", { userId: 1, team: 1 });
    socket.on("game-started", (gameState: GameState) => setState(gameState));
    socket.on("played", (gameState: GameState) => setState(gameState));
    socket.on("error", (d) => {
      console.log(d);
    });
  }, []);

  const emitChange = (change: Partial<GameBoardState>) => {
    socket.emit("play", change);
  };

  return (
    <div className="App">
      {state ? (
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
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default App;
