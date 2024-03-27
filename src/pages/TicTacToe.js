import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  Grid,
  Paper
} from '@mui/material';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    width: '300px',
    maxWidth: '75%',
    marginTop: '50px'
  },
  gameBoard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  square: {
    border: '1px solid #999',
    height: '80px',
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    cursor: 'pointer',
    backgroundColor: '#e0f2f7',
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: '#b3d9ea'
    }
  },
  status: {
    marginBottom: '20px',
    color: '#334567'
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  draw: {
    marginTop: '20px',
    color: '#334567',
    fontWeight: 'bold'
  },
  backButton: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#005082'
  },
  reset: {
    marginBottom: '15px'
  },
  newGame: {
    marginTop: '10px !important'
  }
});

const TicTacToe = () => {
  const classes = useStyles();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isOnePlayerMode, setIsOnePlayerMode] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [isAITurn, setIsAITurn] = useState(false);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  useEffect(() => {
    reset();
  }, [isOnePlayerMode]);

  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setPlayerXScore((prev) => prev + 1);
      } else {
        setPlayerOScore((prev) => prev + 1);
      }
    }
  }, [winner]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw || isAITurn) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkForWinner = (isAITurn) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6] // Diagonals
    ];

    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (isAITurn) return board[a];
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((square) => square !== null)) {
      if (isAITurn) return;
      setIsDraw(true);
    }
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const is_winner = checkForWinner(currentBoard);
    if (is_winner) {
      return is_winner === 'O' ? 10 : -10;
    } else if (currentBoard.every((square) => square !== null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const mediumAI = () => {
    const availableMoves = board.reduce((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, []);

    const randomMove =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];

    return randomMove;
  };

  const hardAI = () => {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'O';
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const findBestMove = () => {
    if (difficulty === 1) {
      return mediumAI();
    } else if (difficulty === 2) {
      return mediumAI();
    } else if (difficulty === 3) {
      return hardAI();
    }
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setPlayerOScore(0);
    setPlayerXScore(0);
  };

  const newGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  useEffect(() => {
    const winner = checkForWinner(board);
    if (winner) {
      setWinner(winner);
    } else if (board.every((square) => square !== null)) {
      setIsDraw(true);
    } else if (isOnePlayerMode && currentPlayer === 'O' && !winner && !isDraw) {
      setIsAITurn(true);
      setTimeout(() => {
        const bestMove = findBestMove();
        handleClick(bestMove);
        setIsAITurn(false);
      }, 1000);
    }
  }, [board, currentPlayer, isOnePlayerMode, isDraw, difficulty]);

  return (
    <Paper className={classes.container} elevation={3}>
      <Typography variant="h4" className={classes.status}>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a draw!"
          : `Next player: ${currentPlayer}`}
      </Typography>
      <h3>
        Score: Player X: {playerXScore} - Player O: {playerOScore}
      </h3>
      <FormControlLabel
        control={
          <Switch
            checked={isOnePlayerMode}
            onChange={() => setIsOnePlayerMode(!isOnePlayerMode)}
          />
        }
        label="1 Player Mode"
      />
      {isOnePlayerMode && (
        <Box sx={{ marginBottom: '10px' }}>
          <FormControlLabel
            control={
              <Select
                value={difficulty}
                onChange={handleDifficultyChange}
                label="Difficulty"
                sx={{ minWidth: 120 }}>
                <MenuItem value={1}>Easy</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>Hard</MenuItem>
              </Select>
            }
            label="Difficulty"
          />
        </Box>
      )}
      <Grid container className={classes.gameBoard}>
        {board.map((square, index) => (
          <Grid item xs={4} key={index}>
            <Box
              className={classes.square}
              data-testid={'square-' + index}
              onClick={() => handleClick(index)}>
              {square}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={reset}
        className={classes.reset}>
        Reset
      </Button>
      {(winner || isDraw) && (
        <Button
          variant="contained"
          color="secondary"
          onClick={newGame}
          className={classes.newGame}>
          Play Again
        </Button>
      )}
      <Button component={Link} className={classes.backButton} raised to="/">
        {'Back to Homepage'}
      </Button>
    </Paper>
  );
};

export default TicTacToe;
