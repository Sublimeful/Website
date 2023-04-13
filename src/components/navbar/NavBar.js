import classes from "./NavBar.module.scss"
import PageContext from "contexts/PageContext";
import { useContext } from "react";


export default function() {
  const { currentPage, setPage } = useContext(PageContext);

  return (
    <header className={classes.navbar}>
      <a href="#" className={classes.logo}>Logo</a>
      <nav className={classes.navLinks}>
        <ul>
          <li><a href="#" onClick={() => setPage("HomePage")}>Home</a></li>
          <li className={classes.dropdown}>
            <a href="#" onClick={() => setPage("Projects")}>My Projects</a>
            <ul className={classes.dropdownContent}>
              <li><a href="#" onClick={() => setPage("TicTacToe")}>Tic-Tac-Toe</a></li>
            </ul>
          </li>
          <li><a href="#" onClick={() => setPage("About")}>About</a></li>
        </ul>
      </nav>
    </header>
  );
}


