"use client";
import kingWhite from "../../../public/imgs/king-white.png";
import kingBlack from "../../../public/imgs/king-black.png";
import queenWhite from "../../../public/imgs/queen-white.png";
import queenBlack from "../../../public/imgs/queen-black.png";
import bishopWhite from "../../../public/imgs/bishop-white.png";
import bishopBlack from "../../../public/imgs/bishop-black.png";
import castleWhite from "../../../public/imgs/castle-white.png";
import castleBlack from "../../../public/imgs/castle-black.png";
import pawnWhite from "../../../public/imgs/pawn-white.png";
import pawnBlack from "../../../public/imgs/pawn-black.png";
import knightWhite from "../../../public/imgs/knight-white.png";
import knightBlack from "../../../public/imgs/knight-black.png";

export type PeiceWholeBoard =
    | "king-white"
    | "king-black"
    | "queen-white"
    | "queen-black"
    | "bishop-white"
    | "bishop-black"
    | "castle-white"
    | "castle-black"
    | "pawn-white"
    | "pawn-black"
    | "knight-white"
    | "knight-black";

type Peices = {
    [key in PeiceWholeBoard]: any;
};

export const pieces: Peices = {
    "king-white": kingWhite,
    "king-black": kingBlack,
    "queen-white": queenWhite,
    "queen-black": queenBlack,
    "bishop-white": bishopWhite,
    "bishop-black": bishopBlack,
    "castle-white": castleWhite,
    "castle-black": castleBlack,
    "pawn-white": pawnWhite,
    "pawn-black": pawnBlack,
    "knight-white": knightWhite,
    "knight-black": knightBlack,
};

function* generator(i: number) {
    let index = i;
    while (true) {
        index++;
        yield index % 2 === 0 ? "smoke-white" : "#a97a65";
    }
}

export const boardColors = Array.from(new Array(8), (v, i) => {
    const GEN = generator(i);
    return new Array(8).fill(null).map((_) => GEN.next().value as string);
});
