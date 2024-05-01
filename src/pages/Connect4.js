import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import { CardHeader } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Connect4.css';

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
    width: 'fit-content',
    maxWidth: '75%',
    marginTop: '50px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  button: {
    '&:hover': {
      backgroundColor: '#005082'
    },
    marginBottom: '30px !important',
    marginTop: '20px'
  },
  header: {
    marginBottom: '15px'
  },
  backButton: {
    textDecoration: 'none',
    color: '#005082'
  }
});

function Connect4() {
  const classes = useStyles();
  const [grid, setGrid] = useState(
    Array(7)
      .fill(null)
      .map(() => Array(7).fill(null))
  );
  const [player, setPlayer] = useState('Red');
  const [winner, setWinner] = useState(null);
  const [isCpuTurn, setIsCpuTurn] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const gridRef = useRef(null);
  const [isOnePlayerMode, setIsOnePlayerMode] = useState(false);

  const handleClick = (col) => {
    if (winner) return;

    const newGrid = [...grid];
    for (let row = 0; row <= newGrid[col].length - 1; row++) {
      if (!newGrid[col][row]) {
        newGrid[col][row] = player;
        setGrid(newGrid);
        break;
      }
    }

    if (checkForWinner(col)) {
      setWinner(player);
    } else {
      setPlayer(player === 'Red' ? 'Yellow' : 'Red');
      if (isOnePlayerMode) setIsCpuTurn(true);
    }
  };

  const makeMove = (board, col, player) => {
    const newBoard = board.map((row) => [...row]);
    for (let row = 0; row < newBoard[col].length; row++) {
      if (!newBoard[col][row]) {
        newBoard[col][row] = player;
        break;
      }
    }
    return newBoard;
  };

  useEffect(() => {
    resetGame();
  }, [isOnePlayerMode, difficulty]);

  useEffect(() => {
    if (isCpuTurn && isOnePlayerMode) {
      setTimeout(handleCpuTurn, 500);
    }
  }, [isCpuTurn, isOnePlayerMode]);

  const checkForWinner = () => {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    // Check rows
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const player = grid[row][col];
        if (
          player &&
          player === grid[row][col + 1] &&
          player === grid[row][col + 2] &&
          player === grid[row][col + 3]
        ) {
          return player;
        }
      }
    }

    // Check columns
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        const player = grid[row][col];
        if (
          player &&
          player === grid[row + 1][col] &&
          player === grid[row + 2][col] &&
          player === grid[row + 3][col]
        ) {
          return player;
        }
      }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const player = grid[row][col];
        if (
          player &&
          player === grid[row + 1][col + 1] &&
          player === grid[row + 2][col + 2] &&
          player === grid[row + 3][col + 3]
        ) {
          return player;
        }
      }
    }

    // Check diagonals (bottom-left to top-right)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const player = grid[row][col];
        if (
          player &&
          player === grid[row - 1][col + 1] &&
          player === grid[row - 2][col + 2] &&
          player === grid[row - 3][col + 3]
        ) {
          return player;
        }
      }
    }

    // No winner found
    return null;
  };

  const handleCpuTurn = () => {
    console.log('CPU Turn');
    const bestMove = findBestMove(difficulty);
    handleClick(bestMove);
    setIsCpuTurn(false);
  };

  const findBestMove = (difficulty) => {
    if (difficulty === 1) return randomMove();
    if (difficulty === 2) return mediumAI();
    if (difficulty === 3) return hardAI(grid, 'Yellow');
  };

  function hardAI(board, playerColor) {
    const opponentColor = playerColor === 'Red' ? 'Yellow' : 'Red';

    // Minimax with Alpha-Beta Pruning
    function minimax(board, depth, alpha, beta, isMaximizing) {
      const winner = checkForWinner();
      if (winner) {
        return winner === playerColor ? 100 : -100;
      } else if (depth === 0) {
        return evaluateBoard(board, playerColor);
      }

      const possibleMoves = getValidMoves(board);

      if (isMaximizing) {
        let bestValue = -Infinity;
        for (const move of possibleMoves) {
          const newBoard = makeMove(board, move, playerColor);
          const value = minimax(newBoard, depth - 1, alpha, beta, false);
          bestValue = Math.max(bestValue, value);
          alpha = Math.max(alpha, bestValue);
          if (alpha >= beta) break; // Alpha-beta pruning
        }
        return bestValue;
      } else {
        let bestValue = Infinity;
        for (const move of possibleMoves) {
          const newBoard = makeMove(board, move, opponentColor);
          const value = minimax(newBoard, depth - 1, alpha, beta, true);
          bestValue = Math.min(bestValue, value);
          beta = Math.min(beta, bestValue);
          if (alpha >= beta) break; // Alpha-beta pruning
        }
        return bestValue;
      }
    }

    // Find the best move using Minimax
    let bestMove = null;
    let bestValue = -Infinity;
    const searchDepth = 6;
    const possibleMoves = getValidMoves(board);
    for (const move of possibleMoves) {
      const newBoard = makeMove(board, move, playerColor);
      const value = minimax(
        newBoard,
        searchDepth - 1,
        -Infinity,
        Infinity,
        false
      );
      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
    }

    return bestMove;

    function evaluateBoard(board, playerColor) {
      let score = countConnected(board, playerColor, 3) * 5;
      score += countConnected(board, playerColor, 2) * 2;
      score -= countConnected(board, opponentColor, 3) * 8;
      score -= countConnected(board, opponentColor, 2) * 3;
      return score;
    }

    function countConnected(board, playerColor, length) {
      let count = 0;
      const ROWS = board.length;
      const COLS = board[0].length;

      // Check rows
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS - length + 1; col++) {
          let connected = true;
          for (let i = 0; i < length; i++) {
            if (board[row][col + i] !== playerColor) {
              connected = false;
              break;
            }
          }
          if (connected) count++;
        }
      }

      // Check columns
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS - length + 1; row++) {
          let connected = true;
          for (let i = 0; i < length; i++) {
            if (board[row + i][col] !== playerColor) {
              connected = false;
              break;
            }
          }
          if (connected) count++;
        }
      }

      // Check diagonals (top-left to bottom-right)
      for (let row = 0; row < ROWS - length + 1; row++) {
        for (let col = 0; col < COLS - length + 1; col++) {
          let connected = true;
          for (let i = 0; i < length; i++) {
            if (board[row + i][col + i] !== playerColor) {
              connected = false;
              break;
            }
          }
          if (connected) count++;
        }
      }

      // Check diagonals (bottom-left to top-right)
      for (let row = length - 1; row < ROWS; row++) {
        for (let col = 0; col < COLS - length + 1; col++) {
          let connected = true;
          for (let i = 0; i < length; i++) {
            if (board[row - i][col + i] !== playerColor) {
              connected = false;
              break;
            }
          }
          if (connected) count++;
        }
      }

      return count;
    }

    function getValidMoves(board) {
      const moves = [];
      for (let col = 0; col < (board.length ? board[0].length : 0); col++) {
        if (board[0] && board[0][col] === null) {
          moves.push(col);
        }
      }
      return moves;
    }
  }

  const randomMove = () => {
    const availableCols = grid[0]
      .map((cell, col) => (cell === null ? col : null))
      .filter((x) => x !== null);
    return availableCols[Math.floor(Math.random() * availableCols.length)];
  };

  const mediumAI = () => {
    // Maybe should be more difficult
    return randomMove();
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const resetGame = () => {
    setGrid(
      Array(7)
        .fill(null)
        .map(() => Array(7).fill(null))
    );
    setPlayer('Red');
    setWinner(null);
    setIsCpuTurn(false);
  };
  return (
    <div className={classes.container}>
      <CardHeader title="Week 4: Connect 4" className={classes.header} />
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

      {winner ? (
        <div className="message">
          <h2>{winner} Wins!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="message">
          <h2>Current Player: {player}</h2>
        </div>
      )}

      <div className="game-board" ref={gridRef}>
        {grid.map((column, colIndex) => (
          <div
            className="column"
            key={colIndex}
            data-testid={`column-${colIndex}`}>
            {column.map((cell, rowIndex) => (
              <div
                className="token-container"
                key={rowIndex}
                onClick={() => handleClick(colIndex)}>
                <div
                  className={`token ${cell}`}
                  data-testid={`cell-${colIndex}-${rowIndex}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Button onClick={resetGame}>Reset Game</Button>

      <Button component={Link} className={classes.backButton} raised to="/">
        {'Back to Homepage'}
      </Button>
    </div>
  );
}

export default Connect4;
