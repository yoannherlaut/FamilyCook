import React, { useState, Fragment } from 'react';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { url } from '../../Config/Connecturl';

import uploadImage from '../../Components/Functions/uploadImages';

import { makeStyles } from '@material-ui/core';

//Materials
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

//SimpleComponents
import Button from './SimpleComponents/Button';

//Screens
import Container from './Container';
import Steps1 from './Steps1';
import Steps2 from './Steps2';
import Steps3 from './Steps3';
import Steps4 from './Steps4';
import Steps5 from './Steps5';
import Steps6 from './Steps6';

// Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//Color
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      width: '100%', // Overrides inline-style
    },
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  buttonFinish: {
    margin: theme.spacing(3),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
  },
  buttonBackEnd: {
    margin: theme.spacing(1),
  },
  containerStepper: {
    display: 'inline',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  stepCategorie: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  containerFinalStep: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const AddRecipe = (props) => {
  const classes = useStyles(props);
  const { User, recipes } = props;
  const history = useHistory();

  // Recipe Data
  const [categorieRecipe, setCategorieRecipe] = useState([]);
  const [nameRecipe, setNameRecipe] = useState('defaultValue');
  const [numberPerson, setNumberPerson] = useState(4);
  const [vegetarien, setVegetarien] = useState(false);

  const ingredientFormat = { name: '', quantity: '' };
  const [ingredientsList, setIngredientsList] = useState([{ ...ingredientFormat }]);

  const stepFormat = { step: '', content: '' };
  const [stepsArray, setStepsArray] = useState([{ ...stepFormat }]);

  const [notaBene, setNotaBene] = useState(null);

  const [img, setImg] = useState(null);

  const addRecipe = async () => {
    var imageSecureUrl = null;
    if (img) {
      imageSecureUrl = await uploadImage(img);
    }

    const newRecipe = JSON.stringify({
      nameRecipe,
      categorieRecipe,
      img: imageSecureUrl,
      numberPerson,
      ingredientsList,
      vegetarien,
      steps: stepsArray,
      notaBene,
      user: User,
    });

    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: newRecipe,
    };
    try {
      const fetchResponse = await fetch(`${url}/addRecipe`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        recipes(data.allRecipes);
        history.push('/home');
      }
    } catch (err) {
      console.log('ERROR FETCH addRecipe --->', err);
    }
  };

  function getSteps() {
    return ['Catégorie', 'Informations', 'Photo', 'Ingredients', 'étapes', 'Nota Bene'];
  }

  const updateCategorie = (image) => {
    if (categorieRecipe.length === 0) {
      setCategorieRecipe([...categorieRecipe, image.title]);
    } else {
      if (categorieRecipe.indexOf(image.title) === -1) {
        setCategorieRecipe([...categorieRecipe, image.title]);
      } else {
        const updatedCategorie = [...categorieRecipe];
        updatedCategorie.splice(updatedCategorie.indexOf(image.title), 1);
        setCategorieRecipe(updatedCategorie);
      }
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Typography align='center' variant='h6' gutterBottom className={classes.stepCategorie}>
              Cliquer sur une ou plusieurs catégories pour votre recette
            </Typography>
            <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
              {images.map((image, i) => {
                let opa = 0.5;
                for (const iterator of categorieRecipe) {
                  if (iterator === image.title) {
                    opa = 0.05;
                  }
                }
                return (
                  <Grid key={i} onClick={() => updateCategorie(image)} item xs={11} md={6} lg={3}>
                    <Steps1 image={image} opacity={opa} />
                  </Grid>
                );
              })}
            </Grid>
          </Fragment>
        );
      case 1:
        return (
          <Steps2
            setNameRecipe={setNameRecipe}
            nameRecipe={nameRecipe}
            setVegetarien={setVegetarien}
            vegetarien={vegetarien}
            numberPerson={numberPerson}
            setNumberPerson={setNumberPerson}
          />
        );
      case 2:
        return <Steps3 setImg={setImg} img={img} />;
      case 3:
        return (
          <Steps4
            setIngredientsList={setIngredientsList}
            ingredientsList={ingredientsList}
            ingredientFormat={ingredientFormat}
          />
        );
      case 4:
        return (
          <Steps5 stepsArray={stepsArray} stepFormat={stepFormat} setStepsArray={setStepsArray} />
        );
      case 5:
        return <Steps6 notaBene={notaBene} setNotaBene={setNotaBene} />;
      default:
        return 'étapes inconnu';
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 2 || step === 5;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const images = [
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520519/amuse-bouche.jpg',
      title: 'Amuse-bouches',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/entr%C3%A9es.jpg',
      title: 'Entrées',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/Soupes.jpg',
      title: 'Soupes',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/salade.jpg',
      title: 'Salades',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589519531/viandes.jpg',
      title: 'Viandes',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/poissons.jpg',
      title: 'Poissons',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/autrePlat.jpg',
      title: 'Autres plats',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/petitDejeuner.jpg',
      title: 'Petits déjeuner',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/Sauces.jpg',
      title: 'Sauces',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/boissons.jpg',
      title: 'Boissons',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/dessert.jpg',
      title: 'Desserts',
    },
    {
      url: 'https://res.cloudinary.com/ddb9lp3zy/image/upload/v1589520518/noel.webp',
      title: 'Noel / Fetes',
    },
  ];

  return (
    <Container>
      <CssBaseline />
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        style={{ marginTop: 50 }}>
        <div className={classes.root}>
          <div className={classes.containerStepper}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant='caption'>Optionnel</Typography>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps} className={classes.containerStepper}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          <div>
            {activeStep === steps.length ? (
              <Box className={classes.containerFinalStep}>
                <Typography align='center' gutterBottom variant='h6'>
                  Toutes les étapes sont completés, vous pouvez créer votre recette
                </Typography>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.buttonBackEnd}>
                  Retour
                </Button>
                <Button onClick={addRecipe} className={classes.buttonFinish}>
                  Créer la recette
                  <CheckCircleIcon style={{ marginLeft: 5 }} />
                </Button>
              </Box>
            ) : (
              <div>
                <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}>
                    Retour
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button onClick={handleSkip} className={classes.button}>
                      Passer
                    </Button>
                  )}
                  <Button
                    disabled={nameRecipe.length >= 44 || nameRecipe.length === 0 || categorieRecipe.length === 0 ? true : null}
                    onClick={handleNext}
                    className={classes.button}>
                    Suivant
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Grid>
    </Container >
  );
};

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recipes: (allRecipes) => {
      dispatch({ type: 'recipes', allRecipes });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
