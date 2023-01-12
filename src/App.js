import { useState, useEffect } from 'react';
import Board from './components/Board';
import Box from './components/Box';

const App = () => {
  //initial state for column box elements
  const initialState = ['', '', '', '', '', '', '', '', ''];
  //inital count for number of wins
  const initialCount = { O: 0, X: 0 };
  const [itemState, setItemState] = useState(initialState);
  const [isXplayer, setIsXplayer] = useState(false);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // console.log('state update');//
    let winner = checkWinner();
    console.log('check winner' + winner);
    if (winner) {
      setWinner(winner);
      resetGame();
    } else if (!itemState.includes('')) {
      setDraw(true);
      resetGame();
    }
    // eslint-disable-next-line
  }, [itemState]);

  // useEffect(() => {
  //   if
  // }, [itemState]);

  useEffect(() => {
    if (winner === 'O') {
      setCount({ ...count, O: count.O + 1 });
    } else if (winner === 'X') {
      setCount({ ...count, X: count.X + 1 });
    }
    // eslint-disable-next-line
  }, [winner]);

  // for auto restart
  const resetGame = () => {
    // console.log('reset');
    setTimeout(() => {
      setItemState(initialState);
      setWinner(null);
      setDraw(false);
    }, 1500);
  };

  // for checking the winner
  const checkWinner = () => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        itemState[a] &&
        itemState[a] === itemState[b] &&
        itemState[a] === itemState[c]
      ) {
        return itemState[a];
      }
    }
    return null;
  };

  // Box click event if the square is empty
  const handleItemClick = (index) => {
    // console.log('clicked');
    const newState = [...itemState];
    if (newState[index] === '') {
      newState[index] = isXplayer ? 'X' : 'O';
      setIsXplayer(!isXplayer);
      setItemState(newState);
    }
  };

  return (
    <div className="main-section">
      <h2 className="heading-text">tic tac toe - game</h2>
      <div className="winner-box">
        <p className="win-count w-color">
          Player O - <span className="O">{count.O}</span>
        </p>
        <p className="win-count w-color">
          Player X - <span className="O">{count.X}</span>
        </p>
      </div>
      {draw && <h3 className="next-text w-color">Match Tie</h3>}
      {!winner ? (
        <h3 className="next-text">
          Next turn -{' '}
          <span className={isXplayer ? 'X' : 'O'}>{isXplayer ? 'X' : 'O'}</span>
        </h3>
      ) : (
        <h3 className="next-text w-color">
          Congrats!! Player - <span className={winner}>{winner} </span> won
        </h3>
      )}
      <Board>
        {itemState.map((item, i) => {
          return (
            <Box
              key={i}
              className="border-b-r"
              value={item}
              onClick={() => handleItemClick(i)}
            />
          );
        })}
      </Board>
      <button
        className="btn-restart"
        onClick={() => {
          setItemState(initialState);
          setWinner(null);
          setCount(initialCount);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default App;
