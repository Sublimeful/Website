import classes from "./Aniguess.module.scss"
import { Button } from "react-bootstrap";
import { useState } from "react";
import Game from "components/aniguess/Aniguess";


export default function Aniguess() {
  const [gameStart, setGameStart] = useState(false);
  function startGame() {
    setGameStart(true);
  }
  return (
    <main className={classes["page"]}>
      {
        gameStart ?
        <Game /> :
        <Button variant="secondary" onClick={startGame}>Start game!</Button>
      }
    </main>
  );
}
