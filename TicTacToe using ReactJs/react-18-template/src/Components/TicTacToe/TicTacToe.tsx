import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe: React.FC = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState<"x" | "o" | null>(null);

    const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
        if (lock || data[num] !== "") return;

        const player = count % 2 === 0 ? "x" : "o";
        e.currentTarget.innerHTML = `<img src='${player === "x" ? cross_icon : circle_icon}' />`;
        data[num] = player;
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const [a, b, c] of wins) {
            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                won(data[a] as "x" | "o");
                return;
            }
        }
    };

    const won = (winner: "x" | "o") => {
        setLock(true);
        setWinner(winner);
    };

    const handleReset = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        setWinner(null);

        // Clear images from boxes manually
        const boxes = document.querySelectorAll(".boxes");
        boxes.forEach((box) => (box.innerHTML = ""));
    };

    return (
        <div className="container">
            <h1 className="title">
                {winner ? (
                    <>
                        Congratulations: {" "}
                        <img src={winner === "x" ? cross_icon : circle_icon} alt={winner} />
                    </>
                ) : (
                    <>
                        Tic Tac Toe Game In <span>React</span>
                    </>
                )}
            </h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={handleReset}>
                Reset
            </button>
        </div>
    );
};

export default TicTacToe;
