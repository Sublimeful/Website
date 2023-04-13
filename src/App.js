import classes from "./App.module.scss"
import HomePage from 'pages/homepage/HomePage';
import PageContext from "contexts/PageContext";
import TicTacToe from "components/tictactoe/TicTacToe";
import NavBar from "components/navbar/NavBar";
import { useState } from "react";



export default function() {
  const [currentPage, setPage] = useState("HomePage");

  return (
    <PageContext.Provider value={{ currentPage, setPage }}>
      <div className={classes["App"]}>
        <NavBar />
        {
          (() => {
            switch(currentPage) {
              case "TicTacToe":
                return <TicTacToe />
              case "HomePage":
              default:
                return <HomePage />
            }
          })()
        }
      </div>
    </PageContext.Provider>
  );
}
