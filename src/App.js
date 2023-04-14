import classes from "./App.module.scss"
import HomePage from "pages/homepage/HomePage";
import TicTacToe from "pages/projects/tictactoe/TicTacToe";
import Projects from "pages/projects/Projects";
import About from "pages/about/About";
import PageContext from "contexts/PageContext";
import NavBar from "components/navbar/NavBar";
import { useState } from "react";



export default function() {
  const [currentPage, setPage] = useState("HomePage");

  return (
    <PageContext.Provider value={{ currentPage, setPage }}>
      <div className={classes["App"]}>
        <NavBar />
        <div className={classes["page"]}>
          {(() => {
            switch(currentPage) {
              case "Projects":
                return <Projects />
              case "TicTacToe":
                return <TicTacToe />
              case "About":
                return <About />
              case "HomePage":
              default:
                return <HomePage />
            }
          })()}
        </div>
      </div>
    </PageContext.Provider>
  );
}
