const Board = () => {
    const [currentPlayer, setCurrentPlayer] = React.useState('X');
    const [currentBoard, setCurrentBoard] = React.useState(Array(9).fill(null));
    const [winner, setWinner] = React.useState(null);
  
    function updateGame(e) {
        if (winner || currentBoard[e.target.id]) return;
        currentBoard[e.target.id] = currentPlayer;
        setCurrentBoard(currentBoard);
        checkForWinner();
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  
    function checkForWinner() {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
  
        for (let combination of winCombinations) {
            const [a, b, c] = combination;
            if (
                currentBoard[a] === currentPlayer &&
                currentBoard[b] === currentPlayer &&
                currentBoard[c] === currentPlayer
            ) {
                setWinner(currentPlayer);
                return;
            }
        }
  
      if (currentBoard.every((value) => value !== null)) {
            setWinner('draw');
        }
    }
  
    return (
      <>
        <div className="board">
          <Square id={0} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={1} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={2} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={3} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={4} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={5} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={6} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={7} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
          <Square id={8} currentPlayer={currentPlayer} update={updateGame} disabled={winner !== null} />
        </div>
        <div className="statusBar text-center">
          {!winner && <h1 className="statusText">Current player: {currentPlayer}</h1>}
          {winner && (
          <h1 className={`statusText ${winner === 'X' ? 'textBlue' : 'textRed'}`}>
            {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
          </h1>
        )}
        </div>
      </>
    );
};
  
const Square = ({ id, currentPlayer, update, disabled }) => {
    const [status, setStatus] = React.useState();
  
    function playerTurn(e) {
        if (!status && !disabled) {
            setStatus(currentPlayer);
            update(e);
        }
    }

    const bgColor = status === 'X' ? 'bgBlue' : status === 'O' ? 'bgRed' : '';
  
    return (
        <div id={id} className={`square ${bgColor}`} onClick={playerTurn}>
            <h1 className="mark">{status}</h1>
        </div>
    );
};

  ReactDOM.render(<Board />, document.getElementById('root'));