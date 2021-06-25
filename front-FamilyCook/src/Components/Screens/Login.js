import React, { useState } from 'react';

import { connect } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { url } from '../../Config/Connecturl';

import { makeStyles } from '@material-ui/core';

// Components
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

// //SimpleComponents
import Button from './SimpleComponents/Button';

// // Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const { Connexion } = props;
  const classes = useStyles(props);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const connexion = async () => {
    const data = JSON.stringify({
      email,
      password,
    });

    const settings = {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const fetchResponse = await fetch(`${url}/login`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        if (data.data) {
          Connexion(data.data);
          history.push('/home');
        } else {
        }
      }
    } catch (err) {
      console.log('ERROR FETCH login --->', err);
    }
  };

  const pressEnter = (e) => {
    if (e.key === 'Enter') {
      connexion();
    }
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            FamilyCook
          </Typography>
          <TextField
            label='Email'
            margin='normal'
            variant='outlined'
            required
            type='email'
            fullWidth
            autoComplete='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            variant='outlined'
            margin='normal'
            required
            fullWidth
            autoComplete='current-password'>
            <InputLabel htmlFor='outlined-adornment-password'>Mot de passe</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onKeyPress={pressEnter}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={110}
            />
          </FormControl>
          {/* <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              /> */}
          <Button fullWidth className={classes.submit} onClick={connexion}>
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <a style={{ textDecoration: 'none' }} href='mailto:y.herlaut@gmail.com'>
                Mot de passe oublié ?
              </a>
            </Grid>
            <Grid item>
              <Link to='/createAccount' variant='body2'>
                Créer un compte
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant='body2' color='textSecondary' align='center'>
              Copyright © FamilyCook {new Date().getFullYear()}.
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    Connexion: (dataUser) => {
      dispatch({ type: 'user', user: dataUser });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
