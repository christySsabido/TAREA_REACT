//Agregar librería
import { useState } from 'react';
//Primero se crea una función llamada, es este caso es 'square'
//hace que esta función sea accesible fuera de este archivo
//El boton significa que lo que viene después se devuelve como un valor para la persona que llama de la función
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
//En este apartado podemos encontrar todas las funciones para poder crear las celdas

function Board({ xIsNext, squares, onPlay }) { //puede llamar con la matriz de cuadrados actualizada cada vez que un jugador hace un movimiento.
//llena el cuadro con un valor declarado cuando detecte un 'click'
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
//en este apartado podemos encontrar a los valores declarados que serán los mostrados en la pantalla
//cuando se detecte un 'click'
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
//Sirve para indicar los estados del juego, si es el siguiente jugador o si se ha ganado la partida y quien ha ganadoo
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
    //Aqui encontramos a las celdas divididos por 3 filas y 3 columnas
      <div className="status">{status}</div>
    //primera fila
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      //segunda fila
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      //tercera fila 
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//tiene la función de mostrar el historial de los movimientos de los jugadores
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // es una matriz con un solo elemento, que en sí mismo es una matriz de 9 nulls.
  const [currentMove, setCurrentMove] = useState(0); //Es el que detecta el estado en el que se encuentra
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];//crea un historial de los movimientos

  function handlePlay(nextSquares) {//actualiza el board cada que el usuario hace un 'click'
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); // crea una nueva matriz que contiene todos los elementos en history
    setCurrentMove(nextHistory.length - 1);
  }
//función para pasar al siguiente movimiento 
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
//son las impresiones que mostrará el historial cuando detecte algún movimiento
  const moves = history.map((squares, move) => {
    let description;//detecta un click en los cuadros e imprmirá la descripción en un boton
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
  //boton deifinido, es donde aparecerán los mensajes de historial
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
//muestra e imprime los movimientos pasados en un costado de las celdas
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//son las formas en las que se pueden ganar o mejor dicho, cuales son las combinaciones ganadoras
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //ciclo para detectar los valores que se encuentren en las casillas y sí son iguales, mostrará el mensaje de ganador
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
