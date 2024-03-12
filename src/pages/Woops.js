import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

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
  backButton: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#005082'
  }
});

const Woops = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        className={classes.title}>
        Woops, you're lost!
      </Typography>
      <Button component={Link} className={classes.backButton} raised to="/">
        {'Back to Homepage'}
      </Button>
    </div>
  );
};

export default Woops;
