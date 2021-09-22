import { useState } from "react";
import "./App.css";
import { Game } from "./components/game";

const GAME_STATE = {
  stockOfMaterials: 8,
  manufacturing: 6,
  assembly: 8,
  stock: 20,
  goodsSold: 24,
  cash: 14,
  accounts: 0,
  RMP: 60,
  dividends: 0,
  equity: 0,
  interest: 6,
  liabilities: 60,
  taxes: 2,
};

function App() {
  const [state, setState] = useState(GAME_STATE);
  return (
    <div className="App">
      <Game
        boardState={state}
        onValueChange={(e) => {
          const toBeCommitted = e.reduce((p, el) => {
            const current = state[el.id];
            const newVal =
              el.op === "+" ? current + el.value : current - el.value;
            return Object.assign(p, { [el.id]: newVal });
          }, {});

          setState({ ...state, ...toBeCommitted });
        }}
      />
    </div>
  );
}

export default App;
