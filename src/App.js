import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import TicTacToe from './components/tictactoe/TicTacToe.js'

function MyButton({ count, onClick }) {
	return (
		<button type='button' onClick={onClick}>Hi, my number is {count}</button>
	);
}

function App() {
  let [ myCounter, setCounter ] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <TicTacToe />
      </header>
    </div>
  );
}

export default App;
