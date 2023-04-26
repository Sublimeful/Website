import classes from "./TicTacToe.module.scss"
import Game from "components/tictactoe/TicTacToe";

export default function TicTacToe() {
  return (
    <main className={classes["page"]}>
      <h1>Created: Apr 5, 2023</h1>
      <Game />
    </main>
  );
}
