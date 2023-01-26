import { Peice } from "./Peice";

export type Move = {
    i: number;
    j: number;
};
export interface PeiceADT {
    getType(): string;
    validateMove(board: Board): MoveValidator;
    getValidMoves(board: Board): Moves;
}
export const peices: Array<PeiceType> = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle", "pawn"];

export type PeiceType = "castle" | "knight" | "bishop" | "queen" | "king" | "pawn";
export type Player = "black" | "white";
export type Vector = {
    dx: number;
    dy: number;
};

export type Moves = Array<Move>;

export type Board = Array<Array<Peice | "">>;

export type MoveValidator = (i: number, j: number, nextI: number, nextJ: number) => boolean;
