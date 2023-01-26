import { Peice, createPeice, Pawn, Bishop, King, Castle } from "./Peice";
import { clearPath, examinePath, inBounds, validateMove } from "./PeiceLogic";
import { Board, PeiceADT, PeiceType, Player, peices, MoveValidator, Moves, Move } from "./types";

const startingPos = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle"];

export const cloneChess = (map: Map<string, Peice>): [Board, Map<string, Peice>] => {
    let newBoard: Board = Array.from(Array(8), () => Array.from(Array(8), () => ""));
    let newMap = new Map<string, Peice>();

    for (const [key, value] of map) {
        let copy = value.clone() as Peice;
        newMap.set(key, copy);
        let pos = copy.getPosition();
        newBoard[pos[0]][pos[1]] = copy;
    }

    return [newBoard, newMap];
};

const boardAndMapAreSame = (board: Board, map: Map<string, Peice>) => {
    for (const [key, value] of map) {
        let currentPos = value.getPosition();
        if (board[currentPos[0]][currentPos[1]] !== value) {
            throw new Error("map is off");
        }
    }
    board.forEach((row) => [
        row.forEach((peice) => {
            if (peice instanceof Peice) {
                if (map.has(peice.getMapName())) {
                    if ((map.get(peice.getMapName()) as Peice) !== peice) {
                        throw new Error("map doesnt have board peice");
                    }
                } else {
                    throw new Error("map doesnt have board peice");
                }
            }
        }),
    ]);
};

export default class ChessBoard {
    private turn: Player;
    private board: Board;
    private peices: Map<string, Peice>;
    private check: Peice | undefined;
    private winner?: Player;

    constructor(board?: Board, map?: Map<string, Peice>, move?: Player) {
        const setMap = (peice: Peice) => {
            this.peices.set(peice.getMapName(), peice);
        };

        this.turn = move ? move : "white";

        this.peices = map ? map : new Map();

        this.board = board
            ? board
            : [
                  Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "black", 0, k, setMap)),
                  Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "black", 1, k, setMap)),
                  ...Array.from(Array(4), (v: any, k: number) => new Array(8).fill("")),
                  Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "white", 6, k, setMap)),
                  Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "white", 7, k, setMap)),
              ];
    }

    getWinner() {
        if (typeof this.winner === "undefined") {
            return false;
        } else {
            return this.winner;
        }
    }

    getAllMovesCoordinates(turn: Player) {
        let moves = Array.from(this.peices, ([name, value]) => value).reduce((accumulator, current) => {
            if (current instanceof Peice && current.getPlayer() === turn) {
                let oldPos = current.getPosition();

                return accumulator.concat(
                    current.getValidMoves(this.board).map((move) => ({
                        oldPos: {
                            i: oldPos[0],
                            j: oldPos[1],
                        },
                        newPos: move,
                    }))
                );
            } else {
                return accumulator;
            }
        }, new Array<{ oldPos: Move; newPos: Move }>());

        moves.forEach((move) => {
            if (
                !(this.board[move.oldPos.i][move.oldPos.j] as Peice).validateMove(this.board)(
                    move.oldPos.i,
                    move.oldPos.j,
                    move.newPos.i,
                    move.newPos.j
                )
            ) {
                throw new Error("valid moves are no consitent with board");
            }
        });

        return moves;
    }

    getAllMoves() {
        return Array.from(this.peices, ([name, value]) => value).reduce((accumulator, current) => {
            if (current instanceof Peice) {
                return accumulator.concat(current.getValidMoves(this.board));
            } else {
                return accumulator;
            }
        }, new Array<Move>());
    }

    /*
        Can you move the king to get out ? 
        Can you take the peice thats put it in check to fully resovle it ?
    */
    isCheckMate() {
        let otherPlayer: Player = this.turn === "white" ? "black" : "white";

        for (const [key, value] of this.peices) {
            if (key.includes(otherPlayer)) {
                for (const move of value.getValidMoves(this.board)) {
                    let pos = value.getPosition();
                    if (this.resolvedCheck(pos[0], pos[1], move.i, move.j, otherPlayer, this.turn)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    getOtherPlayer(turn: Player) {
        return turn === "white" ? "black" : "white";
    }

    isChecked() {
        return this.check instanceof Peice;
    }

    isCheck(peice: Peice) {
        let opponent = this.turn === "white" ? "black" : "white";

        let king = this.peices.get("king-" + opponent) as Peice;

        let isCheck = peice.isCheck(this.board, king);

        if (isCheck) {
            //breakpoint
            console.log(isCheck);
        }
        return isCheck;
    }

    resolvedCheck(i: number, j: number, nextI: number, nextJ: number, checkedKing: Player, playerWhoChecked: Player) {
        let [newBoard, newMap] = cloneChess(this.peices);
        boardAndMapAreSame(newBoard, newMap);

        let currentPeice = newBoard[i][j] as Peice;
        let positionToMove = newBoard[nextI][nextJ];
        currentPeice.updatePosition(nextI, nextJ);

        if (positionToMove instanceof Peice) {
            newMap.delete(positionToMove.getMapName());
        }

        newBoard[nextI][nextJ] = currentPeice;
        newBoard[i][j] = "";

        for (const [key, value] of newMap) {
            if ((value as Peice).getPlayer() === playerWhoChecked) {
                if (value.getPosition()[0] === 1) {
                    console.log(value);
                }

                let isChecked = (value as Peice).isCheck(newBoard as Board, newMap.get("king-" + checkedKing) as Peice);

                if (isChecked) {
                    return false;
                }
            }
        }

        return true;
    }

    makeMove(i: number, j: number, nextI: number, nextJ: number, player: Player): boolean {
        if (typeof this.winner === "undefined") {
            const checkPass = () => {
                if (this.check) {
                    if (this.resolvedCheck(i, j, nextI, nextJ, this.turn, this.getOtherPlayer(this.turn))) {
                        this.check = undefined;
                        return true;
                    } else {
                        console.error("cant move as checked and move does not resolve check");
                        return false;
                    }
                }
                return true;
            };

            let currentPosition = this.board[i][j];
            let nextPos = this.board[nextI][nextJ];

            if (currentPosition instanceof Peice && currentPosition.getPlayer() === player && player === this.turn) {
                let validateMove = currentPosition.validateMove(this.board);

                if (validateMove(i, j, nextI, nextJ)) {
                    if (!checkPass()) {
                        return false;
                    }
                    this.updateBoard(i, j, nextI, nextJ);
                    return true;
                }
            }

            console.error(
                "errored cause: current position is instance of peice: ",
                currentPosition instanceof Peice,
                "   it is not the players turn: ",
                player,
                "   player does not equal this turn,",
                player === this.turn
            );

            return false;
        } else {
            console.error("a winner is defined");
            return false;
        }
    }

    updateFeilds(i: number, j: number, nextI: number, nextJ: number) {
        let peice = this.board[i][j] as Peice;
        let newPosition = this.board[nextI][nextJ];

        peice.updatePosition(nextI, nextJ);

        if (newPosition instanceof Peice) {
            this.peices.delete(newPosition.getMapName());
        }

        this.board[nextI][nextJ] = peice;
        this.board[i][j] = "";
    }

    private updateBoard(i: number, j: number, nextI: number, nextJ: number) {
        let currentPeice = this.board[i][j] as Peice;
        let positionToMove = this.board[nextI][nextJ];

        // if (currentPeice instanceof King) {
        //     if ((i === 0 && nextI === 0 && this.turn === "black") || (i === 7 && nextI === 7 && this.turn === "white")) {
        //         if (!currentPeice.hasCastled) {
        //             //queen side
        //             let kingPos = nextJ < j ? currentPeice.queenSide : currentPeice.kingSide;
        //             let castle = this.peices.get("castle-" + (nextJ < j ? "" : "1-") + this.turn) as Castle;
        //             let castlePos = nextJ < j ? castle.queenSide : castle.kingSide;
        //             if (nextJ === kingPos[1] && j === kingPos[0]) {
        //                 if (!castle.hasCastled && clearPath(this.board, i, j, nextI, nextJ)) {
        //                     let castlePos = castle.getPosition();
        //                     let kingPos = currentPeice.getPosition();
        //                     this.updateFeilds(castlePos[0], castlePos[1], castlePos[0], castlePos[1]);
        //                     this.updateFeilds(kingPos[0], kingPos[1], kingPos[0], kingPos[1]);
        //                     currentPeice.hasCastled = true;
        //                     castle.hasCastled = true;
        //                 } else {
        //                     console.error("castling issues");
        //                 }
        //             } else {
        //                 console.error("castling issues");
        //             }
        //         } else {
        //             this.updateFeilds(i, j, nextI, nextJ);
        //         }
        //     } else {
        //         console.error("castling issues");
        //     }
        // } else {

        // }

        // if (currentPeice instanceof King || currentPeice instanceof Castle) {
        //     currentPeice.hasCastled = true;
        // }

        this.updateFeilds(i, j, nextI, nextJ);

        this.check = this.isCheck(currentPeice) ? currentPeice : undefined;

        if (this.check) {
            if (this.isCheckMate()) {
                this.winner = this.turn;
            }
        }
        this.turn = this.turn === "white" ? "black" : "white";
    }

    printBoard() {
        console.table(
            this.board.map((row) => {
                return row.map((peice) => {
                    if (peice instanceof Peice) {
                        return peice.getName();
                    } else {
                        return peice;
                    }
                });
            })
        );
    }

    getboard() {
        return this.board;
    }

    getPlayerMove() {
        return this.turn;
    }

    getPeices() {
        return this.peices;
    }

    getTurn() {
        return this.turn;
    }

    emitBoardChange() {
        window.dispatchEvent(new CustomEvent("move-made"));
    }

    revertMove(i: number, j: number, nextI: number, nextJ: number, oldPeice: Peice | "") {
        let peice = this.board[i][j] as Peice;
        let newPosition = this.board[nextI][nextJ];

        peice.updatePosition(nextI, nextJ);

        if (oldPeice instanceof Peice) {
            this.peices.set(oldPeice.getMapName(), oldPeice);
        }

        this.board[nextI][nextJ] = peice;
        this.board[i][j] = oldPeice;
    }

    forceMakeMove(i: number, j: number, nextI: number, nextJ: number) {
        let peice = this.board[i][j] as Peice;
        let newPosition = this.board[nextI][nextJ];

        peice.updatePosition(nextI, nextJ);

        if (newPosition instanceof Peice) {
            this.peices.delete(newPosition.getMapName());
        }

        this.board[nextI][nextJ] = peice;
        this.board[i][j] = "";

        return newPosition;
    }

    async testMode() {
        let moves = this.getAllMovesCoordinates("black");

        // for (const move of moves) {
        //     let i = move.oldPos.i;
        //     let j = move.oldPos.j;
        //     let nextI = move.newPos.i;
        //     let nextJ = move.newPos.j;
        //     let oldPeice = this.board[nextI][nextJ];

        //     await new Promise((resolve) => setTimeout(resolve, 200));

        //     let wasMade = this.makeMove(i, j, nextI, nextJ, "black");
        //     if (!wasMade) {
        //         if (typeof this.check === "undefined") {
        //             throw new Error("failed move");
        //         }
        //     }

        //     this.emitBoardChange();

        //     await new Promise((resolve) => setTimeout(resolve, 200));

        //     this.revertMove(nextI, nextJ, i, j, oldPeice);
        //     this.turn = "black";
        //     await new Promise((resolve) => setTimeout(resolve, 200));
        // }

        let randomMove = moves[Math.floor(Math.random() * moves.length)];
        let i = randomMove.oldPos.i;
        let j = randomMove.oldPos.j;
        let nextI = randomMove.newPos.i;
        let nextJ = randomMove.newPos.j;

        let wasMade = this.makeMove(i, j, nextI, nextJ, "black");
    }
}
