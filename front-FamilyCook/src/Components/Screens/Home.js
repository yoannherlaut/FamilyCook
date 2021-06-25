import React, { useState, useEffect } from 'react';

import { url } from '../../Config/Connecturl';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

// Materials
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

// simpleComponents
import Card from '../Screens/SimpleComponents/Card';

//Screens
import Container from './Container';

//Icons
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(to top, #8e2de2, #4a00e0)',
    paddingBottom: 10,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  autocomplete: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 5,
    outline: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginBottom: 10,
    },
  },
  containerCards: {
    marginTop: 40,
  },
  searchText: {
    padding: 30,
    fontFamily: 'Lato, sans-serif',
    fontSize: 45,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      padding: 10,
      fontSize: 35,
    },
  },
  buttonSearch: {
    width: '10%',
    backgroundColor: '#fff',
    padding: 16,
    marginLeft: 5,
    color: '#8e2de2',
    '&:hover': {
      backgroundColor: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginLeft: 0,
      marginBottom: 20,
      fontSize: 15,
      padding: 5,
    },
  },
  categorieFilter: {
    width: '10%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginRight: 0,
      marginBottom: 10,
    },
  },
  buttonfilterIngredient: {
    color: '#fff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const Home = (props) => {
  const classes = useStyles(props);
  const history = useHistory();
  const { recipes, allRecipes } = props;

  const [recipeAutocomplete, setRecipeAutocomplete] = useState('');

  const [categorieFilter, setCategorieFilter] = useState('');

  const [filterIngredient, setFilterIngredient] = useState(false);

  const fetchAllRecipes = async () => {
    if (allRecipes.length <= 0) {
      try {
        const fetchResponse = await fetch(`${url}/getAllRecipe`);
        const data = await fetchResponse.json();
        if (data.result) {
          recipes(data.allRecipes);
        }
      } catch (err) {
        console.log('ERROR FETCH Home --->', err);
      }
    }
  };

  const recipeChooseAutocomplete = async () => {
    for (const recipe of allRecipes) {
      if (recipe.nameRecipe === recipeAutocomplete) {
        history.push(`/recipe/${recipe._id}`);
      }
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const categories = [
    'Amuse-bouches',
    'Entrées',
    'Soupes',
    'Salades',
    'Viandes',
    'Poissons',
    'Autres plats',
    'Petits déjeuner',
    'Sauces',
    'Boissons',
    'Desserts',
    'Noel / Fetes',
  ];

  var recipesFiltered = [];
  if (categorieFilter.length > 0) {
    recipesFiltered = allRecipes.filter((data) => {
      for (const categorie of data.categorie) {
        if (categorie === categorieFilter) {
          return data;
        }
      }
    });
  }

  return (
    <Container>
      <CssBaseline />

      <Box className={classes.root}>
        <Typography align='center' variant='h5' gutterBottom className={classes.searchText}>
          Trouver une recette
        </Typography>
        <Box className={classes.containerSearch}>
          <FormControl variant='filled' className={classes.categorieFilter}>
            <InputLabel htmlFor='filled-age-native-simple'>Catégorie</InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              value={categorieFilter}
              onChange={(e) => setCategorieFilter(e.target.value)}>
              <MenuItem value=''>
                <em>Aucun</em>
              </MenuItem>
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            options={categorieFilter.length > 0 ? recipesFiltered : allRecipes}
            getOptionLabel={(option) => option.nameRecipe}
            className={classes.autocomplete}
            inputValue={recipeAutocomplete}
            onInputChange={(e, newInputValue) => setRecipeAutocomplete(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Je cherche...'
                variant='outlined'
                onChange={(e) => setRecipeAutocomplete(e.target.value)}
              />
            )}
          />
          <Button onClick={recipeChooseAutocomplete} className={classes.buttonSearch}>
            Recherche
          </Button>
        </Box>
        {/* -------------------------------------------------------------------------- */
        /*
        Recherche par ingredient en attente */
        /*
        -------------------------------------------------------------------------- */}
        {/* <Typography
          align='center'
          variant='h6'
          gutterBottom
          className={classes.buttonfilterIngredient}
          onClick={() => setFilterIngredient(true)}>
          Dans mon frigo j'ai ...
        </Typography>

        {filterIngredient && (
          <Box>
            {ingredients.map((ing, i) => {
              return (
                <FormControl variant='outlined' margin='normal'>
                  <OutlinedInput
                    name='content'
                    type='text'
                    variant='outlined'
                    value={ing.i}
                    onChange={(e) => setIngredients(e.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <CloseIcon
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => setIngredients(e.target.value)}
                        />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              );
            })}
          </Box>
        )} */}
      </Box>

      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.containerCards}>
        {allRecipes && allRecipes.length > 0 ? (
          categorieFilter && categorieFilter.length > 0 ? (
            recipesFiltered.length > 0 ? (
              recipesFiltered.map((data) => {
                return (
                  <Card key={data._id} _id={data._id} nameRecipe={data.nameRecipe} img={data.img} />
                );
              })
            ) : (
              <Box className={classes.center}>
                <Typography align='center' variant='h6'>
                  Aucune recette dans cette catégorie : (
                </Typography>
              </Box>
            )
          ) : (
            allRecipes.map((data) => {
              return (
                <Card key={data._id} _id={data._id} nameRecipe={data.nameRecipe} img={data.img} />
              );
            })
          )
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    allRecipes: state.allRecipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recipes: (allRecipes) => {
      dispatch({ type: 'recipes', allRecipes });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
