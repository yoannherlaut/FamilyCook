import React, { useState } from 'react';

import { connect } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

import { url } from '../../Config/Connecturl';

import { makeStyles } from '@material-ui/core/styles';

// Components
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

//SimpleComponents
import Button from './SimpleComponents/Button';

// Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const CreateUser = (props) => {
  const classes = useStyles(props);
  const { Connexion } = props;

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [accountAllReadyExist, setAccountAllReadyExist] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const history = useHistory();

  const connect = async () => {
    var pass = false;
    var mail = false;
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      mail = true;
      setErrorEmail(true);
    } else {
      mail = false;
      setErrorEmail(false);
    }
    if (password.length >= 8) {
      pass = false;
      setErrorPassword(false);
    } else {
      pass = true;
      setErrorPassword(true);
    }
    if (!mail && !pass) {
      const data = JSON.stringify({
        name,
        firstName,
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
        const fetchResponse = await fetch(`${url}/createUser`, settings);
        const data = await fetchResponse.json();
        if (data.result) {
          if (data.allReadyExist) {
            setAccountAllReadyExist(data.data);
            setShowAlert(true);
          } else {
            Connexion(data.data);
            history.push('/home');
          }
        }
      } catch (err) {
        console.log('ERROR FETCH CreateUser --->', err);
      }
    }
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' gutterBottom>
          Créer un compte
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Prénom'
              variant='outlined'
              required
              fullWidth
              autoComplete='fname'
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nom'
              variant='outlined'
              required
              fullWidth
              autoComplete='lname'
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              error={errorEmail ? true : null}
              helperText={errorEmail ? "Le format de votre email n'est pas bon" : null}
              variant='outlined'
              type='email'
              required
              fullWidth
              autoComplete='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              error={errorPassword ? true : null}
              variant='outlined'
              required
              fullWidth
              autoComplete='current-password'>
              <InputLabel htmlFor='outlined-adornment-password'>Mot de passe</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={password}
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
              {errorPassword ? (
                <FormHelperText id='component-error-text'>
                  Votre mot de passe doit contenir au minimum 8 caractères
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type='submit'
          onClick={connect}
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}>
          Inscription
        </Button>
        <Grid container justify='flex-end'>
          <Grid item>
            <Link to='/' variant='body2'>
              Vous avez déjà un compte? Connexion
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Typography variant='body2' color='textSecondary' align='center'>
          Copyright © FamilyCook {new Date().getFullYear()}.
        </Typography>
      </Box>
      {accountAllReadyExist ? (
        <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleCloseSnackBar}>
          <Alert variant='filled' severity='warning'>
            Le mail "{accountAllReadyExist.email}" est déjà utilisé !
          </Alert>
        </Snackbar>
      ) : null}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    Connexion: (dataUser) => {
      dispatch({ type: 'user', user: dataUser });
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
