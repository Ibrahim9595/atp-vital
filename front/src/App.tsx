import "./App.css";
import { useEffect, useState } from "react";
import { Game } from "./components/game";
import { io } from "socket.io-client";
import { GameBoardState, GameState, ValueChange } from "./utils";

const socket = io(process.env.REACT_APP_SERVER_URL || "");

const getChangedAttributes = (changes: ValueChange[], state: GameBoardState) =>
  changes.reduce((p, el) => {
    const current = state[el.id];
    const newVal = el.op === "+" ? current + el.value : current - el.value;
    return Object.assign(p, { [el.id]: newVal });
  }, {});

function App() {
  const [state, setState] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.user_id && params.team_id) {
      const { team_id: team, user_id: userId } = params;
      socket.emit("start-game", {
        userId: parseInt(userId),
        team: parseInt(team),
      });
      socket.on("game-started", (gameState: GameState) =>
        setState({ ...gameState, myId: parseInt(userId) })
      );
      socket.on("played", (gameState: GameState) =>
        setState({ ...gameState, myId: parseInt(userId) })
      );
      socket.on("error", (error) => {
        alert("The team is not available");
        setError(error);
      });
    } else {
      setError(
        `Please use one of the following urls 
        http://localhost:3000?team_id=1&user_id=1, 
        http://localhost:3000?team_id=1&user_id=2, 
        http://localhost:3000?team_id=2&user_id=3, 
        http://localhost:3000?team_id=2&user_id=4`
      );
    }
  }, []);

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
              const toBeCommitted = getChangedAttributes(e, state.gameBoard);
              setState({
                ...state,
                gameBoard: { ...state.gameBoard, ...toBeCommitted },
              });
              socket.emit("play", toBeCommitted);
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
