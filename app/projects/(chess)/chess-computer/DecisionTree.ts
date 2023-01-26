import ChessBoard, { cloneChess } from "./Chess";
import { Board, Move, Player } from "./types";

export type Children<T> = Array<TreeNode<T>>;

export class TreeNode<T> {
    private children: Children<T>;
    private element?: T;

    constructor(element: T, children?: Children<T>) {
        this.children = children ? children : ([] as Children<T>);
        this.element = element;
    }

    addChild(child: TreeNode<T>) {
        this.children.push(child);
    }

    getChildren() {
        return this.children;
    }

    getElement(): T {
        if (typeof this.element === "undefined") {
            throw new Error("element not set");
        }
        return this.element;
    }

    terminateCondition(): boolean {
        return false;
    }
}

export const getAiMove = (chessBoard: ChessBoard) => {
    let decisionTree = new DecisionTree(chessBoard, 1);

    let root = decisionTree.root;
};

export default class DecisionTree {
    root: TreeNode<ChessBoard>;
    maxDepth: number;

    constructor(game: ChessBoard, maxDepth: number) {
        this.root = new TreeNode<ChessBoard>(game);
        this.maxDepth = maxDepth;
        this.buildTree(this.root, "black", 0);
    }

    buildTree(node: TreeNode<ChessBoard>, turn: Player, depth: number) {
        let board = node.getElement();

        let allMoves = board.getAllMovesCoordinates(turn);

        allMoves.forEach((move) => {
            let childBoard = new ChessBoard(...cloneChess(board.getPeices()), turn);
            let wasMade = childBoard.makeMove(move.oldPos.i, move.oldPos.j, move.newPos.i, move.newPos.j, turn);

            if (!wasMade) {
                throw new Error("move wasnt made");
            }
            node.addChild(new TreeNode<ChessBoard>(childBoard));
        });

        if (board.isChecked() || depth > this.maxDepth) {
            return;
        } else {
            node.getChildren().forEach((child) => this.buildTree(child, child.getElement().getTurn(), depth + 1));
        }
    }
}
