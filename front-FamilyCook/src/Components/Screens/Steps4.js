import React from 'react';

import { makeStyles } from '@material-ui/core';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

// Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  addIngredient: {
    margin: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2),
    },
  },
}));

const Steps4 = (props) => {
  const { ingredientsList, setIngredientsList, ingredientFormat } = props;
  const classes = useStyles(props);

  const addIngredient = () => {
    setIngredientsList([...ingredientsList, { ...ingredientFormat }]);
  };

  const deleteIngredient = (e) => {
    const uptatedIngredientsList = [...ingredientsList];
    uptatedIngredientsList.splice(
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.idx,
      1
    );
    setIngredientsList(uptatedIngredientsList);
  };

  const updateIngredient = (e) => {
    const uptatedIngredientsList = [...ingredientsList];
    uptatedIngredientsList[
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.idx
    ][e.target.name] = e.target.value;
    setIngredientsList(uptatedIngredientsList);
  };

  return (
    <Grid container component='main' direction='row' justify='center' alignItems='center'>
      <CssBaseline />

      <Grid container direction='row' justify='center' alignItems='center'>
        <Typography className={classes.addIngredient} variant='h6'>
          Ajouter un ingrédient
        </Typography>
        <Fab color='primary' aria-label='add' onClick={addIngredient}>
          <AddIcon />
        </Fab>
      </Grid>
      <Grid container direction='row' justify='space-around' alignItems='center'>
        {ingredientsList.map((val, idx) => {
          return (
            <Grid data-idx={idx} key={`ingredient-${idx}`} item xs={12} md={5}>
              <Grid container direction='row' justify='space-evenly' alignItems='center'>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={`Ingredient n°:${idx + 1}`}
                    name='name'
                    margin='normal'
                    type='text'
                    variant='outlined'
                    value={ingredientsList[idx].name}
                    onChange={updateIngredient}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label='Quantité'
                    name='quantity'
                    margin='normal'
                    type='text'
                    variant='outlined'
                    value={ingredientsList[idx].quantity}
                    onChange={updateIngredient}
                  />
                </Grid>
                <Grid item xs={1}>
                  <DeleteIcon onClick={deleteIngredient} />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Steps4;
