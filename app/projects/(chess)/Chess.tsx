"use client";
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { boardColors, pieces, PeiceWholeBoard } from "./constants";
import { PeiceType, ChessBoard, Peice, Move, Board, Player } from "./chess-computer/";
import Image from "next/image";
import { getAiMove } from "./chess-computer/DecisionTree";

type Coord = [number, number];

type CellProps = {
    color: string;
    size: number;
    peice: Peice | "";
    coord: [number, number];
    dragStart: (coord: Coord) => void;
    dragEnter: (coord: Coord) => void;
    drop: () => void;
};

type Draggables = {
    dragStart: (coord: Coord) => void;
    dragEnter: (coord: Coord) => void;
    drop: () => void;
};

const PeiceComponent = ({ peice, size, dragStart, dragEnter, drop }: { peice: Peice; size: number } & Draggables) => {
    return (
        <div
            draggable={peice.getPlayer() === "white"}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
            onDrop={(e) => drop()}
            onDragStart={(e) => {
                if (peice.getPlayer() === "black") e.preventDefault();
                dragStart(peice.getPosition() as Coord);
            }}
            onDragEnter={(e) => dragEnter(peice.getPosition() as Coord)}
            style={{
                opacity: 1,
                height: `${size / 8}px`,
                width: `${size / 8}px`,
                position: "relative",
            }}
        >
            <Image src={pieces[peice.getName() as PeiceWholeBoard]} alt="peice" fill />
        </div>
    );
};

const Cell = ({ color, size, coord, peice, dragStart, dragEnter, drop }: CellProps) => {
    return (
        <div
            draggable={peice instanceof Peice && peice.getPlayer() === "white"}
            style={{ backgroundColor: color, height: `${size / 8}px`, width: `${size / 8}px`, outline: "none" }}
            onDragEnter={() => dragEnter(coord)}
            onDrop={(e) => drop()}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {peice instanceof Peice ? (
                <PeiceComponent peice={peice as Peice} size={size} dragStart={dragStart} drop={drop} dragEnter={() => dragEnter(coord)} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default function BoardComponent({ size }: { size: string }) {
    const [ref, { height }] = useMeasure();
    const [turn, setTurn] = useState<Player>("white");
    const [gameLogic, setGameLogic] = useState<ChessBoard>(() => new ChessBoard());
    const [board, setBoard] = useState<Board | undefined>(() => [...gameLogic.getboard()]);
    const [winner, setWinner] = useState<Player | undefined>();
    const [awaitingAi, setAwaitingAi] = useState(false);

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (position: Coord) => {
        //@ts-ignore
        dragItem.current = position;
    };

    const dragEnter = (position: Coord) => {
        //@ts-ignore
        dragOverItem.current = position;
    };

    const drop = () => {
        let oldPos = dragItem.current as unknown as Coord;
        let newPos = dragOverItem.current as unknown as Coord;

        let moveMade = gameLogic.makeMove(...oldPos, ...newPos, turn);

        if (moveMade) {
            setBoard((oldBoard) => [...gameLogic.getboard()]);
            setTurn(() => gameLogic.getPlayerMove());
        }
    };

    useEffect(() => {
        const updater = () => {
            setBoard((oldBoard) => [...gameLogic.getboard()]);
        };

        if (gameLogic.getWinner()) {
            setWinner(gameLogic.getWinner() as Player);
        } else if (turn === "black" && !awaitingAi) {
            setAwaitingAi(true);
            setTimeout(() =>
                gameLogic.testMode().then(() => {
                    updater();
                    setTurn(() => gameLogic.getPlayerMove());
                    setAwaitingAi(false);
                })
            );
        }

        window.addEventListener("move-made", updater);

        return () => window.removeEventListener("move-made", updater);
    }, [awaitingAi, gameLogic, board, turn]);

    // if (turn === "black") {
    //     getAiMove(gameLogic);
    // }

    return (
        <div ref={ref} style={{ height: size, width: size, padding: 25 / 2 }}>
            {winner ? (
                <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque Regular, sans-serif", position: "relative" }}>white</text>
            ) : (
                <></>
            )}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "fit-content",
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                    border: "2px solid #a97a65",
                }}
            >
                {boardColors.map((row, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "row" }}>
                        {row.map((color, j) => (
                            <Cell
                                coord={[i, j]}
                                key={j}
                                color={color}
                                peice={(board as Board)[i][j]}
                                size={height - 50}
                                dragEnter={dragEnter}
                                dragStart={dragStart}
                                drop={drop}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
