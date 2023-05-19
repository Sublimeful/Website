import classes from "./Aniguess.module.scss"
import { Button } from "react-bootstrap";
import { useRef, useState } from "react";
import Game from "components/aniguess/Aniguess";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Aniguess() {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const options = useRef({"min_score": 0});

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
          <Game score={score} setScore={setScore} gameOver={gameOver} searchOptions={options.current}/>
          <div className={classes["statusline"]}>
            <h1>Score: {score}</h1>
            <h1>HighScore: {highScore}</h1>
          </div>
        </>
        :
        <div className={classes["pre-game"]}>
          <Button variant="secondary" onClick={startGame} className={classes["start-game"]}>Start game!</Button>
          <div className={classes["filter"]}>
            <h1>Filters</h1>
            <h3>Date</h3>
            <ReactDatePicker placeholderText="Start Date" selected={startDate} onChange={(date) => {
              const start_date = date.toISOString().split("T")[0]
              options.current["start_date"] = start_date
              setStartDate(date)
            }} />
            <ReactDatePicker placeholderText="End Date" selected={endDate} onChange={(date) => {
              const end_date = date.toISOString().split("T")[0]
              options.current["end_date"] = end_date
              setEndDate(date)
            }} />
          </div>
        </div>
      }
    </main>
  );
}
