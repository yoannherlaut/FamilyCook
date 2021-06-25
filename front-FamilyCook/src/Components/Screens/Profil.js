import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { url } from '../../Config/Connecturl';

import { makeStyles, Typography, Paper } from '@material-ui/core';

// Components
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Container as ContainerMaterials } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

// //SimpleComponents
import Button from './SimpleComponents/Button';
import CircleColorProfil from './SimpleComponents/CircleColorProfil';

//Screens
import Container from './Container';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFluid: {
    marginTop: 50,
    padding: 50,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      padding: 20,
    },
  },
  avatarSize: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: 50,
    backgroundColor: (props) => props.backgroundcolor,
  },
  containerAvatar: {
    marginBottom: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 30,
    },
  },
  modal: {
    position: 'relative',
    top: `40%`,
    left: `40%`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      top: `0%`,
      left: `0%`,
      width: '100%',
    },
  },
  modalHeader: {
    margin: theme.spacing(4),
  },
}));

const Profil = (props) => {
  const { User, Connexion } = props;

  const classes = useStyles(props);
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [colorUser, setColorUser] = useState('');

  const [name, setName] = useState('');
  const [firstName, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modify, setModify] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const getUser = async () => {
    try {
      const fetchResponse = await fetch(`${url}/getAllUser/${User._id}`);
      const data = await fetchResponse.json();
      if (data.result) {
        setUser(data.user);
        setColorUser(data.user.color);
        setEmail(data.user.email);
        setFirstname(data.user.firstName);
        setPassword(data.user.password);
        setName(data.user.name);
      }
    } catch (err) {
      console.log('ERROR FETCH getALlUser --->', err);
    }
  };

  const sendModification = async () => {
    const userModification = {
      name: name,
      firstName: firstName,
      email: email,
      password: password,
      color: colorUser,
    };

    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newUser: userModification,
      }),
    };
    try {
      const fetchResponse = await fetch(`${url}/user/${User._id}`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        setModify(false);
        Connexion(data.user);
      }
    } catch (err) {
      console.log('ERROR FETCH sendModification Profil --->', err);
    }
  };

  const deleteUser = async () => {
    const settings = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const fetchResponse = await fetch(`${url}/user/${User._id}`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        history.push('/');
      }
    } catch (err) {
      console.log('ERROR FETCH deleteUser --->', err);
    }
  };

  useEffect(() => {
    User && getUser();
  }, [User]);

  const modal = (
    <Box className={classes.modal}>
      <Box className={classes.modalHeader}>
        <Typography align='center' variant='h6'>
          Voulez vous vraiment Supprimer votre compte définitivement !
        </Typography>
      </Box>
      <Grid container direction='row' justify='space-around' alignItems='center'>
        <Button variant='contained' color='default' onClick={() => setOpenModal(false)}>
          Annuler
        </Button>
        <Button
          variant='contained'
          style={{ backgroundColor: '#d32f2f', color: '#fff' }}
          onClick={() => deleteUser()}>
          Valider
        </Button>
      </Grid>
    </Box>
  );

  const colorProfilUser = [
    '#f44336',
    '#e91e63',
    '#ec27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ];

  return (
    <Container>
      <CssBaseline />
      <ContainerMaterials className={classes.containerFluid}>
        <Box className={classes.containerAvatar}>
          <Avatar
            style={{ backgroundColor: colorUser }}
            className={classes.avatarSize}
            alt='picture user profil'>
            {user ? user.firstName[0] + user.name[0] : null}
          </Avatar>
        </Box>

        <Box style={{ marginBottom: 30 }}>
          {modify ? (
            <Grid container direction='row' justify='space-around' alignItems='center'>
              <Button
                style={{ marginBottom: 10 }}
                variant='contained'
                color='default'
                onClick={() => setModify(false)}>
                Annuler
              </Button>
              <Button
                variant='contained'
                style={{ backgroundColor: 'green', marginBottom: 10 }}
                onClick={() => sendModification()}>
                Appliquer les modifications
              </Button>
            </Grid>
          ) : (
            <Grid container direction='row' justify='space-around' alignItems='center'>
              <Button
                variant='contained'
                style={{ backgroundColor: 'red', marginBottom: 10 }}
                onClick={() => setOpenModal(true)}>
                Supprimer le compte
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                variant='contained'
                color='primary'
                onClick={() => setModify(true)}>
                Modifier le compte
              </Button>
            </Grid>
          )}
        </Box>

        <Modal onClose={() => setOpenModal(false)} open={openModal}>
          {modal}
        </Modal>

        <Grid container direction='row' alignItems='center' justify='space-around'>
          <Grid item xs={5}>
            <TextField
              fullWidth
              disabled={modify ? false : true}
              label='Nom'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              disabled={modify ? false : true}
              label='Prénom'
              variant='outlined'
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>
          <Grid item xs={11} style={{ marginTop: 50 }}>
            <TextField
              fullWidth
              disabled={modify ? false : true}
              label='email'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={11} style={{ marginTop: 50 }}>
            <TextField
              fullWidth
              disabled={modify ? false : true}
              label='Mot de passe'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>

        {modify ? (
          <Grid container direction='row' alignItems='center' justify='center'>
            <Typography gutterBottom variant='h6' align='center' style={{ marginTop: 50 }}>
              Choissisez votre couleur
            </Typography>
            <Grid container item xs={12} justify='center' style={{ marginTop: 20 }}>
              <Paper elevation={3} style={{ padding: 20 }}>
                {colorProfilUser.map((color) => {
                  return (
                    <CircleColorProfil
                      key={color}
                      onClick={() => setColorUser(color)}
                      backgroundcolor={color}
                      bordercolor={color}
                    />
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </ContainerMaterials>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Connexion: (dataUser) => {
      dispatch({ type: 'user', user: dataUser });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
