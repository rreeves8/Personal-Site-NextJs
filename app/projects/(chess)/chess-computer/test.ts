import ChessBoard from "./Chess";
import { peiceInTheWay } from "./PeiceLogic";
// class Parent {
//     b: any

//     constructor(b: any){
//         this.b = b
//     }

//     getType(){
//         return this.constructor.name
//     }
// }

// class Child extends Parent {
//     cool(){
//         console.log('fire')
//     }
// }

// class Child2 extends Parent {
//     dope(){
//         console.log('fire')
//     }
// }

// let child2 = new Child(23)

// console.log(child2.getType())

let chess = new ChessBoard();

const testPawn = (chess: ChessBoard) => {
    chess.printBoard();
    console.log(chess.makeMove(6, 0, 4, 0, "white"));
    chess.printBoard();
};

const testKnight = (chess: ChessBoard) => {
    chess.printBoard();

    console.log(chess.makeMove(7, 1, 5, 0, "white"));

    chess.printBoard();

    console.log(chess.makeMove(5, 0, 3, 1, "white"));

    chess.printBoard();
};

const testCastle = (chess: ChessBoard) => {
    testPawn(chess)

    console.log(chess.makeMove(7, 0, 5, 0, "white"));

    chess.printBoard();

    console.log(chess.makeMove(5, 0, 4, 1, "white"));

    chess.printBoard();
};

const testPeiceInWay = (chess: ChessBoard) => {
    testPawn(chess)
}

const testBishop = (chess: ChessBoard) => {
    console.log(chess.makeMove(1, 6, 2, 6, "black"));

    chess.printBoard();

    console.log(chess.makeMove(0, 5, 1, 6, "black"));

    chess.printBoard();

    console.log(chess.makeMove(1, 6, 3, 4, "black"));

    chess.printBoard();
}

const testQueen = (chess: ChessBoard) => {
    console.log(chess.makeMove(6, 3, 4, 3, "white"));

    chess.printBoard();

    console.log(chess.makeMove(7, 3, 5, 3, "white"));

    chess.printBoard();

    console.log(chess.makeMove(5, 3, 4, 2, "white"));

    chess.printBoard();

}

const testKing = (chess: ChessBoard) => {
    testQueen(chess)

    console.log(chess.makeMove(7, 4, 7, 3, "white"));

    chess.printBoard();

    console.log(chess.makeMove(7, 3, 6, 3, "white"));

    chess.printBoard();
}

const testCheck = (chess: ChessBoard) => {
    chess.printBoard();

    //move pawns away
    console.log(chess.makeMove(1, 4, 3, 4, "black"));
    chess.printBoard();
    console.log(chess.makeMove(6, 0, 5, 0, "white"));
    chess.printBoard();
    console.log(chess.makeMove(3, 4, 4, 4, "black"));
    chess.printBoard();
    console.log(chess.makeMove(5, 0, 4, 0, "white"));
    chess.printBoard();
    console.log(chess.makeMove(4, 4, 5, 4, "black"));
    chess.printBoard();

    console.log('moving white to take pawn')
    console.log(chess.makeMove(6, 3, 5, 4, 'white'));
    chess.printBoard();
    console.log(chess.makeMove(1, 7, 2, 7, "black"));
    chess.printBoard();
    console.log(chess.makeMove(7, 3, 4, 3, 'white'));
    chess.printBoard();
    console.log(chess.makeMove(2, 7, 3, 7, "black"));
    chess.printBoard();
    console.log(chess.makeMove(4, 3, 4, 4, 'white'));
    chess.printBoard();

    console.log(chess.makeMove(3, 7, 4, 7, 'black'));
    chess.printBoard();

}

