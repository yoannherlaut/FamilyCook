import React from 'react';

import { makeStyles } from '@material-ui/core';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    margin: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
    },
  },
}));

const Steps6 = (props) => {
  const { setNotaBene, notaBene } = props;
  const classes = useStyles(props);

  return (
    <Grid container component='main' justify='center' alignItems='center' direction='column'>
      <CssBaseline />
      <Typography gutterBottom align='center' variant='h6'>
        Ajouter des détails, des variantes dans la recette
      </Typography>
      <Typography gutterBottom align='center' variant='overline'>
        optionnel
      </Typography>
      <TextField
        className={classes.input}
        id='outlined-multiline-static'
        label='Nota Bene'
        multiline
        value={notaBene}
        onChange={(e) => setNotaBene(e.target.value)}
        rows={3}
        variant='outlined'
      />
    </Grid>
  );
};

export default Steps6;
