import classes from "./App.module.scss"
import HomePage from "pages/homepage/HomePage";
import TicTacToe from "pages/projects/tictactoe/TicTacToe";
import Projects from "pages/projects/Projects";
import About from "pages/about/About";
import NavBar from "components/navbar/NavBar";
import Aniguess from "pages/projects/aniguess/Aniguess";
import { Route, Routes } from "react-router-dom";



export default function() {
  return (
    <div className={classes["App"]}>
      <NavBar />
      <div className={classes["page"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/aniguess" element={<Aniguess />} />
          <Route path="/projects/tictactoe" element={<TicTacToe />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
