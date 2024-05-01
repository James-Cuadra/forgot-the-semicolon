import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  },
  title: {
    marginBottom: '30px'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  card: {
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    },
    backgroundColor: '#f0f5f8'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#334567'
  }
});

const HomePage = () => {
  const classes = useStyles();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const solutionData = [
      { name: 'Challenge 1: Password Generator', path: '/challenge1' },
      { name: 'Challenge 2: Tic Tac Toe', path: '/challenge2' },
      { name: 'Challenge 3: Weather App', path: '/challenge3' },
      { name: 'Challenge 4: Connect 4', path: '/challenge4' }
    ];
    setSolutions(solutionData);
  }, []);

  return (
    <div className={classes.container}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        className={classes.title}>
        Forgot The Sem;colon
      </Typography>
      <div className={classes.cardGrid}>
        {solutions.map((solution) => (
          <Link to={solution.path} className={classes.card} key={solution.path}>
            <Typography variant="h5" className={classes.cardTitle}>
              {solution.name}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
