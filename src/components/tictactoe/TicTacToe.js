import { useState } from 'react';
import classes from "./TicTacToe.module.scss";


function Square({ marker, clickSquare }) {
  return (
    <button className={classes["square"]} onClick={clickSquare}>{marker}</button>
  )
}

function Board({ board, handleClick, gameStatus }) {
  return (
    <div className={classes["board"]}>
      <div className={classes["game-status"]}>{gameStatus}</div>
      <div className={classes["board-row"]}>
        <Square marker={board[0][0]} clickSquare={() => handleClick(0, 0)} />
        <Square marker={board[0][1]} clickSquare={() => handleClick(0, 1)} />
        <Square marker={board[0][2]} clickSquare={() => handleClick(0, 2)} />
      </div>
      <div className={classes["board-row"]}>
        <Square marker={board[1][0]} clickSquare={() => handleClick(1, 0)} />
        <Square marker={board[1][1]} clickSquare={() => handleClick(1, 1)} />
        <Square marker={board[1][2]} clickSquare={() => handleClick(1, 2)} />
      </div>
      <div className={classes["board-row"]}>
        <Square marker={board[2][0]} clickSquare={() => handleClick(2, 0)} />
        <Square marker={board[2][1]} clickSquare={() => handleClick(2, 1)} />
        <Square marker={board[2][2]} clickSquare={() => handleClick(2, 2)} />
      </div>
    </div>
  )
}



export default function() {
  // <{{ checkWinner
  /** Given any board and a player, determine whether the player has won */
  function checkWinner(board, player) {
    // Check horizontal
    for(const row of board) {
      if(row.join("") === player.repeat(3)) return true;
    }

    // Check vertical
    for(const column of board.map((_, i) => [board[0][i], board[1][i], board[2][i]])) {
      if(column.join("") === player.repeat(3)) return true;
    }

    // check diagonals
    let leftToRightDiag = ""
    let rightToLeftDiag = ""
    for(let i = 0; i < 3; i++) {
      // Left to right
      leftToRightDiag += board[i][i]
      // Right to left
      rightToLeftDiag += board[i][board.length - i - 1]
    }

    if(leftToRightDiag === player.repeat(3)) return true;
    if(rightToLeftDiag === player.repeat(3)) return true;

    return false;
  }
  // }}>
  // <{{ getOtherPlayer
  function getOtherPlayer(player) {
    return player === "X" ? "O" : "X";
  }
  // }}>

  const startingPlayer = Math.floor(Math.random() * 2) ? "X" : "O";
  const startingBoard = [["", "", ""], ["", "", ""], ["", "", ""]]

  const [currentBoard, setCurrentBoard] = useState(startingBoard);
  const [currentPlayer, setCurrentPlayer] = useState(startingPlayer);
  const [gameOver, setGameOver] = useState(false)
  const [gameHistory, setGameHistory] = useState([[startingBoard, startingPlayer]])
  const [currMoveNum, setCurrMoveNum] = useState(0);
  const otherPlayer = getOtherPlayer(currentPlayer);

  let gameStatus;
  if (!gameOver) {
    gameStatus = `Next Player: ${currentPlayer}`
  } else {
    gameStatus = `Game is over! Player ${otherPlayer} wins!`
  }

  function nextTurn() {
    setCurrentPlayer(otherPlayer);
    setCurrMoveNum(currMoveNum + 1);
  }

  function handleClick(r, c) {
    if(currentBoard[r][c] != "") return;
    if(gameOver) return;

    let boardCopy = currentBoard.map(row => [...row]);
    boardCopy[r][c] = currentPlayer;
    setCurrentBoard(boardCopy);

    let gameHistoryCopy = gameHistory.map(record => [...record]).slice(0, currMoveNum + 1)
    gameHistoryCopy.push([boardCopy, otherPlayer]);
    setGameHistory(gameHistoryCopy);
    
    if(checkWinner(boardCopy, currentPlayer)) {
      setGameOver(true);
    }

    nextTurn();
  }

  function jumpTo(moveNumber) {
    const board = gameHistory[moveNumber][0];
    const player = gameHistory[moveNumber][1]
    setCurrentBoard(board);
    setCurrentPlayer(player);
    setCurrMoveNum(moveNumber);
    setGameOver(checkWinner(board, getOtherPlayer(player)));
  }

  const moves = gameHistory.map((_, moveNumber) => {
    let description;

    if (moveNumber > 0) {
      description = "Go to move #" + moveNumber;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={moveNumber}>
        <button onClick={() => jumpTo(moveNumber)}>{description}</button>
      </li>
    )
  });

  return (
    <div className={classes["tictactoe"]}>
      <Board board = {currentBoard} handleClick = {handleClick} gameStatus = {gameStatus} />
      <ol>{moves}</ol>
    </div>
  );
}
