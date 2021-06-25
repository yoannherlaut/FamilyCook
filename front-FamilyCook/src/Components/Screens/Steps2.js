import React from 'react';

import { makeStyles } from '@material-ui/core';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '90%',
    margin: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(3),
    },
  },
}));

const Steps2 = props => {
  const {
    setNameRecipe,
    nameRecipe,
    setVegetarien,
    vegetarien,
    numberPerson,
    setNumberPerson,
  } = props;
  const classes = useStyles(props);

  return (
    <Grid container component='main' justify='center' alignItems='center' direction='column'>
      <CssBaseline />
      <Typography align='center' variant='h6' gutterBottom>
        Remplissez les informations de base pour votre recette
      </Typography>
      <TextField
        className={classes.input}
        error={nameRecipe && nameRecipe.length >= 44 ? true : null}
        helperText={
          nameRecipe && nameRecipe.length >= 44
            ? 'Le nom de votre recette est trop long (max 44 caractères)'
            : null
        }
        label='Nom de la recette'
        margin='normal'
        variant='outlined'
        required
        fullWidth
        value={nameRecipe == 'defaultValue' ? setNameRecipe('') : null}
        autoFocus
        onChange={(e) => setNameRecipe(e.target.value)}
      />

      <FormControl className={classes.input} variant='outlined'>
        <InputLabel id='demo-simple-select-outlined-label'>Nombre de personnes</InputLabel>
        <Select
          value={numberPerson}
          onChange={(e) => setNumberPerson(e.target.value)}
          label='Nombre de personnes'>
          <MenuItem value={1}>Un</MenuItem>
          <MenuItem value={2}>Deux</MenuItem>
          <MenuItem value={3}>Trois</MenuItem>
          <MenuItem value={4}>Quatre</MenuItem>
          <MenuItem value={5}>Cinq</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Sept</MenuItem>
          <MenuItem value={8}>Huit</MenuItem>
          <MenuItem value={9}>Neuf</MenuItem>
          <MenuItem value={10}>Dix</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        className={classes.input}
        control={
          <Switch
            checked={vegetarien}
            onChange={(e) => setVegetarien(e.target.checked)}
            name='végétarien'
            color='primary'
          />
        }
        label='Cochez si votre recette est compatible avec le régime végétarien'
      />
    </Grid>
  );
};

export default Steps2;
