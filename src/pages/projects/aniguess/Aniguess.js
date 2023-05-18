import classes from "./Aniguess.module.scss"
import { Button } from "react-bootstrap";
import { useState } from "react";
import Game from "components/aniguess/Aniguess";


export default function Aniguess() {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0);

  function startGame() {
    setGameStart(true);
  }

  function gameOver() {
    setHighScore(Math.max(score, highScore));
    setScore(0);
  }

  return (
    <main className={classes["page"]}>
      {
        gameStart ?
        <>
          <Game score={score} setScore={setScore} gameOver={gameOver}/>
          <div className={classes["statusline"]}>
            <h1>Score: {score}</h1>
            <h1>HighScore: {highScore}</h1>
          </div>
        </>
        :
        <Button variant="secondary" onClick={startGame}>Start game!</Button>
      }
    </main>
  );
}
