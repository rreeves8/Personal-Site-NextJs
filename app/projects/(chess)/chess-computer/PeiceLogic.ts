import { Peice } from "./Peice";
import { Board, Move, Vector } from "./types";

export const validateMove = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    return inBounds(nextI, nextJ) && !peiceInTheWay(board, i, j, nextI, nextJ) && peiceIsNotSame(board, i, j, nextI, nextJ);
};

export const peiceIsNotSame = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    if (board[nextI][nextJ] instanceof Peice) {
        if ((board[nextI][nextJ] as Peice).getPlayer() === (board[i][j] as Peice).getPlayer()) {
            return false;
        }
    }
    return true;
};

export const clearPath = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    let test = true;
    examinePath(board, i, j, nextI, nextJ, (peice) => {
        if (peice instanceof Peice) {
            test = false;
        }
    });

    return test;
};

export const examinePath = (board: Board, i: number, j: number, nextI: number, nextJ: number, callBack: (peice: Peice) => void) => {
    let vector = toVector(i, j, nextI, nextJ);
    let magnitude = positive(vector);

    const inc = (value: number) => value + 1;
    const dec = (value: number) => value - 1;
    const nothing = (value: number) => value;

    const getFunction = (direction: number) => {
        return direction === 0 ? nothing : isPositive(direction) ? inc : dec;
    };

    const determine = {
        dxFunction: getFunction(vector.dx),
        dyFunction: getFunction(vector.dy),
    };

    const counters = {
        x: 0,
        y: 0,
        incr: function () {
            this.x = this.x + 1;
            this.y = this.y + 1;
        },
    };

    const determineCounters = (counterX: number, counterY: number): boolean => {
        let xSolution = vector.dx === 0;
        let ySolution = vector.dy === 0;

        return (xSolution ? true : counterX < magnitude.dx - 1) && (ySolution ? true : counterY < magnitude.dy - 1);
    };

    for (
        let x = determine.dxFunction(i), y = determine.dyFunction(j);
        determineCounters(counters.x, counters.y);
        counters.incr(), x = determine.dxFunction(x), y = determine.dyFunction(y)
    ) {
        if (board[x][y] instanceof Peice) {
            callBack(board[x][y] as Peice);
        }
    }
};

export const peiceInTheWay = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    let vector = toVector(i, j, nextI, nextJ);
    let magnitude = positive(vector);

    const inc = (value: number) => value + 1;
    const dec = (value: number) => value - 1;
    const nothing = (value: number) => value;

    const getFunction = (direction: number) => {
        return direction === 0 ? nothing : isPositive(direction) ? inc : dec;
    };

    const determine = {
        dxFunction: getFunction(vector.dx),
        dyFunction: getFunction(vector.dy),
    };

    const counters = {
        x: 0,
        y: 0,
        incr: function () {
            this.x = this.x + 1;
            this.y = this.y + 1;
        },
    };

    const determineCounters = (counterX: number, counterY: number): boolean => {
        let xSolution = vector.dx === 0;
        let ySolution = vector.dy === 0;

        return (xSolution ? true : counterX < magnitude.dx - 1) && (ySolution ? true : counterY < magnitude.dy - 1);
    };

    for (
        let x = determine.dxFunction(i), y = determine.dyFunction(j);
        determineCounters(counters.x, counters.y);
        counters.incr(), x = determine.dxFunction(x), y = determine.dyFunction(y)
    ) {
        if (board[x][y] instanceof Peice) {
            return true;
        }
    }

    return false;
};

export const inBounds = (nextI: number, nextJ: number) => {
    if (nextI > 7 || nextI < 0) {
        return false;
    }
    if (nextJ > 7 || nextI < 0) {
        return false;
    }
    return true;
};

export const toVector = (i: number, j: number, nextI: number, nextJ: number): Vector => {
    return {
        dx: nextI - i,
        dy: nextJ - j,
    };
};

export const isStraight = (vector: Vector): boolean => (vector.dx === 0 && vector.dy !== 0) || (vector.dy === 0 && vector.dx !== 0);
export const isDiagonal = (vector: Vector): boolean => {
    let converted = positive(vector);
    return converted.dx === converted.dy;
};

const isPositive = (change: number) => change > 0;

export const toPositive = (change: number) => (change < 0 ? change * -1 : change);

export const positive = (vector: Vector): Vector => ({
    dx: toPositive(vector.dx),
    dy: toPositive(vector.dy),
});

export const pythagrous = (vector: Vector) => Math.sqrt(Math.pow(vector.dx, 2) + Math.pow(vector.dy, 2));
