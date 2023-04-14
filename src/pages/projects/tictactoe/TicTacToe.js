import classes from "./TicTacToe.module.scss"
import TicTacToe from "components/tictactoe/TicTacToe";

export default function() {
  return (
    <main className={classes["page"]}>
      <h1>Created: Apr 5, 2023</h1>
      <TicTacToe />
    </main>
  );
}
