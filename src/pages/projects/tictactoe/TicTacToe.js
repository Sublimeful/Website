import classes from "./TicTacToe.module.scss"
import TicTacToe from "components/tictactoe/TicTacToe";

export default function() {
  return (
    <main className={classes["page"]}>
      <TicTacToe />
    </main>
  );
}
