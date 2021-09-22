import { BaseModel } from "./base-model";

export interface GameBoardState {
  stockOfMaterials: number;
  manufacturing: number;
  assembly: number;
  stock: number;
  goodsSold: number;
  cash: number;
  accounts: number;
  RMP: number;
  dividends: number;
  equity: number;
  interest: number;
  liabilities: number;
  taxes: number;
}

export interface GameState {
  id: string;
  gameBoard: GameBoardState;
  currentPlayer: number;
  myId: number;
  team: "team1" | "team2";
}

class Game extends BaseModel {
  constructor() {
    super("game");
  }
}

export const GameModel = new Game();
