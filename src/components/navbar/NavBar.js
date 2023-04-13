import "./NavBar.css"
import PageContext from "contexts/PageContext";
import { useContext } from "react";


export default function() {
  const { currentPage, setPage } = useContext(PageContext);

  return (
    <header className="navbar">
      <a href="#" className="logo">Logo</a>
      <nav className="nav-links">
        <ul>
          <li><a href="#" onClick={() => setPage("HomePage")}>Home</a></li>
          <li className="dropdown">
            <a href="#" onClick={() => setPage("Projects")}>My Projects</a>
            <ul className="dropdown-content">
              <li><a href="#" onClick={() => setPage("TicTacToe")}>Tic-Tac-Toe</a></li>
            </ul>
          </li>
          <li><a href="#" onClick={() => setPage("About")}>About</a></li>
        </ul>
      </nav>
    </header>
  );
}


