import React, { useEffect, useState } from "react";
import turnPlay from "./turnPlay.mp3";
import gameOver from "./gameOver.mp3";

const Home = () => {
  let winnerFound = false;
  const turnPlayObj = new Audio(turnPlay);
  const gameOverObj = new Audio(gameOver);
  const [NoOfDraw, SetNoOfDraw] = useState(0);
  const [winPlayer0, setWinPlayer0] = useState(0);
  const [winPlayerX, setWinPlayerX] = useState(0);

  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState("0");
  const initialState = ["", "", "", "", "", "", "", "", ""];
  const [gameField, setGameField] = useState(initialState);
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (e, index) => {
    const fieldElement = e.target;
    if (fieldElement.innerHTML == "") {
      turnPlayObj.play();
      // increment Count
      setCount((count) => count + 1);

      // clicked Element   & set innerHtml & color
      fieldElement.innerHTML = turn;
      fieldElement.style.color = turn == "0" ? "#223843" : "#8C3608";

      // setting GameField
      const copy = [...gameField];
      copy[index] = turn;
      setGameField(copy);

      // setting Turn
      setTurn(turn == "0" ? "X" : "0");
    }
  };

  useEffect(() => {
    const checkWinner = () => {
      // check for a winner
      winningPattern.forEach((pattern) => {
        const [a, b, c] = pattern;
        const field1 = gameField[a];
        const field2 = gameField[b];
        const field3 = gameField[c];

        if (field1 && field2 && field3 && field1 === field2 && field2 === field3) {
          winnerFound = true;
          gameOverObj.play();
          setTimeout(() => {
            if (field1 === "0") setWinPlayer0((prev) => prev + 1);
            else setWinPlayerX((prev) => prev + 1);
            resetAll();
            alert(` ${field1} Winner!  `);
          }, 500);
          return;
        }
      });

      if (winnerFound) return;

      // check for a draw
      if (count === gameField.length) {
        gameOverObj.play();
        setTimeout(() => {
          SetNoOfDraw((prev) => prev + 1);
          alert("It's a draw!");
          resetAll();
        }, 200);
      }
    };
    checkWinner();
  }, [gameField]);

  const resetAll = () => {
    setGameField(initialState);
    setTurn("0");
    setCount(0);
    winnerFound = false;
  };

  return (
    <div className="Container">
      <h1>TIK TAK TOE GAME</h1>
      <div className="gameBoard">
        {gameField.map((field, index) => {
          return (
            <div className="box" key={index} onClick={(e) => handleClick(e, index)}>
              {field}
            </div>
          );
        })}
      </div>

      <div className="resultBox">
        <table>
          <thead>
            <tr>
              <th>P:0</th>
              <th>P:X</th>
              <th>Tie</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{winPlayer0}</th>
              <th>{winPlayerX}</th>
              <th>{NoOfDraw}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
