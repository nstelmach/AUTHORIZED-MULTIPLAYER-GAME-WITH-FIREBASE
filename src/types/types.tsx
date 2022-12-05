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
  playerXId?: string;
  playerOId?: string;
  owner: string;
}
