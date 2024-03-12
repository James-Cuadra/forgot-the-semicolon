import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { makeStyles } from '@mui/styles';
import { CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  button: {
    '&:hover': {
      backgroundColor: '#005082'
    },
    marginBottom: '30px !important'
  },
  header: {
    marginBottom: '15px'
  },
  backButton: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#005082'
  }
});

const PasswordGenerator = () => {
  const classes = useStyles();
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    specialChars: '!@#$%^&*()_+-=[]{}|;\':",./<>?'
  };

  const handleGeneratePassword = () => {
    let password = '';
    let validChars = '';

    if (includeUppercase) validChars += characters.uppercase;
    if (includeLowercase) validChars += characters.lowercase;
    if (includeNumbers) validChars += characters.numbers;
    if (includeSpecialChars) validChars += characters.specialChars;

    if (validChars === '')
      return alert('Please select at least one character type');

    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      password += validChars[index];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className={classes.container}>
      <CardHeader
        title="Week 1: Password Generator"
        className={classes.header}
      />
      <FormGroup className={classes.formGroup}>
        <TextField
          label="Password Length"
          type="number"
          InputProps={{ inputProps: { min: 4 } }}
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
        />
      </FormGroup>
      <FormGroup className={classes.formGroup}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
          }
          label="Include Uppercase"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
          }
          label="Include Lowercase"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
          }
          label="Include Numbers"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            />
          }
          label="Include Special Characters"
        />
      </FormGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGeneratePassword}
        className={classes.button}>
        Generate Password
      </Button>
      <TextField
        label="Generated Password"
        value={generatedPassword}
        InputProps={{ readOnly: true }}
        multiline={true}
        sx={{ maxHeight: '70px', paddingBottom: '15px' }} // account for super long passwords
      />
      <Button component={Link} className={classes.backButton} raised to="/">
        {'Back to Homepage'}
      </Button>
    </div>
  );
};

export default PasswordGenerator;
