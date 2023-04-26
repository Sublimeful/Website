import classes from "./NavBar.module.scss"
import { NavLink } from "react-router-dom";


export default function NavBar() {
  return (
    <header className={classes["navbar"]}>
      <a href="/" className={classes["logo"]}>Logo</a>
      <nav className={classes["nav-links"]}>
        <ul>
          <li><NavLink to="/">Homepage</NavLink></li>
          <li className={classes["dropdown"]}>
            <NavLink to="/projects">My Projects</NavLink>
            <ul className={classes["dropdown-content"]}>
              <li><NavLink to="/projects/tictactoe">Tic-Tac-Toe</NavLink></li>
              <li><NavLink to="/projects/aniguess">Aniguess</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}


