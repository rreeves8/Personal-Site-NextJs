import {
    inBounds,
    isDiagonal,
    isStraight,
    peiceInTheWay,
    peiceIsNotSame,
    positive,
    pythagrous,
    toPositive,
    toVector,
    validateMove,
} from "./PeiceLogic";
import { PeiceType, PeiceADT, Player, Board, Move, MoveValidator, Moves } from "./types";

//greasy but whatever
const iterateOverBoard = (board: Board, callback: (nextI: number, nextJ: number) => void) => {
    board.forEach((row, nextI) => {
        row.forEach((currentPeice, nextJ) => {
            callback(nextI, nextJ);
        });
    });
};

export class Peice implements PeiceADT {
    private player: Player;
    private cost: number;
    private i: number;
    private j: number;
    private number?: number;

    constructor(player: Player, cost: number, i: number, j: number, number?: number) {
        this.player = player;
        this.cost = cost;
        this.i = i;
        this.j = j;
        this.number = number ? number : undefined;
    }

    getValidMoves(board: Board): Moves {
        let [i, j] = this.getPosition();
        let validMoves = [] as Moves;

        let moveValidator = this.validateMove(board);

        iterateOverBoard(board, (nextI, nextJ) => {
            if (moveValidator(i, j, nextI, nextJ)) {
                validMoves.push({ i: nextI, j: nextJ });
            }
        });
        return validMoves;
    }

    getCost() {
        return this.cost as number;
    }

    getPlayer() {
        return this.player;
    }

    setNumber(number: number) {
        this.number = number;
    }

    getNumber(): number {
        return this.number as number;
    }

    getName(): string {
        return this.constructor.name.toLowerCase() + "-" + this.getPlayer();
    }

    getMapName(): string {
        let number = this.number ? "-" + this.number : "";
        return this.constructor.name.toLowerCase() + number + "-" + this.getPlayer();
    }

    getType(): PeiceType {
        return this.constructor.name.toLowerCase() as PeiceType;
    }

    validateMove(board: Board): MoveValidator {
        throw new Error("not implemented");
    }

    isCheck(board: Board, king: Peice): boolean {
        if (!(king instanceof King)) {
            throw new Error("king isnt a king or is undefined");
        }

        let moveValidator = this.validateMove(board);
        let kingPositions = king.getPosition();

        return moveValidator(this.i, this.j, kingPositions[0], kingPositions[1]);
    }

    updatePosition(i: number, j: number) {
        this.i = i;
        this.j = j;
    }

    getPosition() {
        return [this.i, this.j];
    }

    clone(): Peice {
        throw new Error("not overridden");
    }
}

export class Pawn extends Peice {
    hasMoved = false;

    reset() {
        this.hasMoved = false;
    }

    override validateMove(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let nextSpot = board[nextI][nextJ];
            let vector = toVector(i, j, nextI, nextJ);
            let magnitude = positive(vector);

            let directionVector = nextSpot instanceof Peice ? magnitude.dx === magnitude.dy : isStraight(vector);

            let direction = this.getPlayer() === "white" ? vector.dx < 0 : vector.dx > 0;
            let distance = this.hasMoved ? magnitude.dx === 1 : magnitude.dx === 1 || magnitude.dx === 2;
            this.hasMoved = true;

            return validateMove(board, i, j, nextI, nextJ) && directionVector && direction && distance;
        };
    }

    clone() {
        let pos = this.getPosition();
        return new Pawn(this.getPlayer(), this.getCost(), pos[0], pos[1], this.getNumber());
    }
}

export class Knight extends Peice {
    override validateMove(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);
            let magnitude = positive(vector);

            let up = magnitude.dx === 2 && magnitude.dy === 1;
            let down = magnitude.dx === 1 && magnitude.dy === 2;

            return inBounds(nextI, nextJ) && (up || down) && peiceIsNotSame(board, i, j, nextI, nextJ);
        };
    }

    clone() {
        let pos = this.getPosition();
        return new Knight(this.getPlayer(), this.getCost(), pos[0], pos[1], this.getNumber());
    }
}

export class Castle extends Peice {
    hasCastled: boolean = false;
    queenSide = [0, 3];
    kingSide = [7, 5];

    override validateMove(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);

            return validateMove(board, i, j, nextI, nextJ) && isStraight(vector) && !isDiagonal(vector);
        };
    }

    clone() {
        let pos = this.getPosition();
        return new Castle(this.getPlayer(), this.getCost(), pos[0], pos[1], this.getNumber());
    }
}

export class King extends Peice {
    hasCastled: boolean = false;
    kingSide = [4, 6];
    queenSide = [4, 2];

    override validateMove(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);
            let magnitude = positive(vector);

            return validateMove(board, i, j, nextI, nextJ) && magnitude.dx <= 1 && magnitude.dy <= 1;
        };
    }

    clone() {
        let pos = this.getPosition();
        return new King(this.getPlayer(), this.getCost(), pos[0], pos[1], this.getNumber());
    }
}

export class Bishop extends Peice {
    override validateMove(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);
            return validateMove(board, i, j, nextI, nextJ) && !isStraight(vector) && isDiagonal(vector);
        };
    }

    clone() {
        let pos = this.getPosition();
        return new Bishop(this.getPlayer(), this.getCost(), pos[0], pos[1], this.getNumber());
    }
}

export class Queen extends Peice {
    override validateMove(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);

            return validateMove(board, i, j, nextI, nextJ) && (isStraight(vector) || isDiagonal(vector));
        };
    }

    clone() {
        let pos = this.getPosition();
        return new Queen(this.getPlayer(), this.getCost(), pos[0], pos[1], this.getNumber());
    }
}

// const PeiceDirections: Map<PeiceADT, MoveValidator> = new Map()
//     .set("castle", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);
//         return inBounds(nextI, nextJ) && isStraight(vector) && !isDiagonal(vector);
//     })
//     .set("knight", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);

//         let up = toPositive(vector.dy) === 3 && toPositive(vector.dx) === 2;
//         let down = toPositive(vector.dy) === 2 && toPositive(vector.dx) === 3;

//         return inBounds(nextI, nextJ) && up && down;
//     })
//     .set("bishop", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);

//         return inBounds(nextI, nextJ) && !isStraight(vector) && isDiagonal(vector);
//     })
//     .set("queen", () => true)
//     .set("king", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);

//         return inBounds(nextI, nextJ) && pythagrous(vector) < Math.sqrt(2);
//     })
//     .set("pawn", (i: number, j: number, nextI: number, nextJ: number, special: Array<boolean>) => {});

const PeiceCost: Map<PeiceType, number> = new Map()
    .set("castle", 50)
    .set("knight", 30)
    .set("bishop", 30)
    .set("queen", 90)
    .set("king", 900)
    .set("pawn", 10);

const peiceLookUp: Map<PeiceType, typeof Peice> = new Map<PeiceType, typeof Peice>()
    .set("pawn", Pawn)
    .set("knight", Knight)
    .set("castle", Castle)
    .set("bishop", Bishop)
    .set("queen", Queen)
    .set("king", King);

const counters = new Map<string, number>();

export const createPeice = (peiceType: PeiceType, player: Player, i: number, j: number, callBack: (peice: Peice) => void): Peice => {
    let newPeice = new (peiceLookUp.get(peiceType) as typeof Peice)(player, PeiceCost.get(peiceType) as number, i, j);

    if (!(peiceType === "king" || peiceType === "queen")) {
        let name = newPeice.getName();

        if (counters.has(name)) {
            let count = counters.get(name) as number;
            counters.set(name, count + 1);
        } else {
            counters.set(name, 0);
        }
        newPeice.setNumber(counters.get(name) as number);
    }

    callBack(newPeice);
    return newPeice;
};
