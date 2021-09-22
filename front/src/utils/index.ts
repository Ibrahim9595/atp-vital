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
  team: "team1" | "team2"
}

type CoinContainerId = keyof GameBoardState;

export enum DraggableTypes {
  Coin = "Coin",
}

export interface DraggedItem {
  id: CoinContainerId;
  value: number;
}

export interface DroppedTarget {
  id: CoinContainerId;
  value: number;
}

export interface SharedCoinProps {
  radius: number;
  value: number;
  invert?: boolean;
}

export interface ValueChange {
  id: CoinContainerId;
  value: number;
  op: "+" | "-";
}

export type CoinContainerProps = SharedCoinProps & {
  id: CoinContainerId;
  title: string;
  bolder?: boolean;
  position: "top" | "bottom";
  onValueChange: (changes: ValueChange[]) => void;
};
