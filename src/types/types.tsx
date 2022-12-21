// dziwne do poprawy
export type CircleOrCross = SYMBOL | null;

export type SYMBOL = "X" | "O";

export enum GameStatus {
  Draw = "draw",
  XWinner = "xWinner",
  OWinner = "oWinner",
  XTurn = "xTurn",
  OTurn = "oTurn",
}

export interface Room {
  id: string;
  game: CircleOrCross[];
  gameStatus: GameStatus;
  startingTurn: "xTurn" | "oTurn";
  playerXId?: string;
  playerOId?: string;
  playerXDisplayName?: string | null;
  playerODisplayName?: string | null;
  owner: string;
}

export interface Computer {
  game: CircleOrCross[];
  gameStatus: GameStatus;
  startingTurn: "xTurn" | "oTurn";
  playerXId?: string;
  playerOId?: string;
  playerXDisplayName?: string | null;
  playerODisplayName?: string | null;
  owner: string;
}

export interface Table {
  oponent: string;
  date: string;
  winner: string;
}
