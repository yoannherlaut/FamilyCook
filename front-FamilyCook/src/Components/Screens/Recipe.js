import React, { useState, useEffect, Fragment } from 'react';

import { url } from '../../Config/Connecturl';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

//Materials
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Pagination from '@material-ui/lab/Pagination';

//SimpleComponents
import Button from './SimpleComponents/Button';
import Comment from './SimpleComponents/Comment';
import AddPicButton from './SimpleComponents/addPicButton';

//Screens
import Container from './Container';

// // Icons
import DeleteIcon from '@material-ui/icons/Delete';

//Functions
import uploadImage from '../../Components/Functions/uploadImages';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHead: {
    color: '#000',
  },
  cadre: {
    marginTop: 20,
    marginBottom: 20,
  },
  actionIcons: {
    cursor: 'pointer',
  },
  containerImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerImage2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
    borderRadius: 5,
  },
  imageRecipe: {
    width: 500,
    borderRadius: 5,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  paper: {
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
  container: {
    marginTop: 50,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
    },
  },
  nameRecipe: {
    fontSize: 40,
    display: 'flex',
    fontWeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
  },
  imageVege: {
    marginLeft: 10,
    width: 40,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      width: 25,
      height: 25,
    },
  },
  containerNotaBene: {
    marginTop: theme.spacing(8),
    border: '2px inset #4a00e0',
    padding: 20,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  containerComments: {
    marginTop: 50,
    backgroundColor: '#eeeeee',
    padding: 50,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));

const Recipe = (props) => {
  const { recipes, User } = props;

  const classes = useStyles(props);
  const history = useHistory();

  const [recipe, setRecipe] = useState(null);

  const [modify, setModify] = useState(false);

  const [loader, setLoader] = useState(true);

  const [img, setImg] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [commentList, setCommentList] = useState(null);

  const [pagination, setPagination] = useState(1);

  const [count, setCount] = useState(0);

  const fetchAllRecipes = async () => {
    try {
      const fetchResponse = await fetch(`${url}/getAllRecipe`);
      const data = await fetchResponse.json();
      if (data.result) {
        recipes(data.allRecipes);
      }
    } catch (err) {
      console.log('ERROR FETCH fetchAllRecipes --->', err);
    }
  };

  const getRecipe = async () => {
    try {
      const fetchResponse = await fetch(`${url}/getRecipe/${props.match.params.id}`);
      const data = await fetchResponse.json();
      if (data.result) {
        setRecipe(data.data);
        setCommentList(data.data.commentsList);
      }
    } catch (err) {
      console.log('ERROR FETCH getRecipe --->', err);
    }
  };

  const sendModification = async () => {
    var temp = { ...recipe };
    if (img) {
      var imageSecureUrl = null;
      imageSecureUrl = await uploadImage(img);
      temp.img = imageSecureUrl;
    }

    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newRecipe: temp }),
    };
    try {
      const fetchResponse = await fetch(`${url}/${recipe._id}`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        setModify(false);
        getRecipe();
        fetchAllRecipes();
      }
    } catch (err) {
      console.log('ERROR FETCH RECIPE MODIFICATION --->', err);
    }
  };

  const modifyNotaBene = async (e) => {
    var temp = { ...recipe };
    temp.notaBene = e;
    setRecipe(temp);
  };

  const modifyNameRecipe = async (e) => {
    var temp = { ...recipe };
    temp.nameRecipe = e;
    setRecipe(temp);
  };

  const deleteIngredient = async (id) => {
    var temp = { ...recipe };
    const index = temp.ingredientsList.findIndex((ing) => ing._id === id);
    temp.ingredientsList.splice(index, 1);
    setRecipe(temp);
  };

  const deleteSteps = async (id) => {
    var temp = { ...recipe };
    const index = temp.steps.findIndex((step) => step.step === id);
    temp.steps.splice(index, 1);
    setRecipe(temp);
  };

  const modifyIngredients = async (value, ingredient, input) => {
    var temp = { ...recipe };
    for (const val of temp.ingredientsList) {
      if (ingredient._id === val._id) {
        if (input === 'name') {
          val.name = value;
        } else {
          val.quantity = value;
        }
      }
    }
    setRecipe(temp);
  };

  const modifySteps = async (value, steps) => {
    var temp = { ...recipe };
    for (const val of temp.steps) {
      if (steps.step === val.step) {
        val.content = value;
      }
    }
    setRecipe(temp);
  };

  const deleteRecipe = async (_id) => {
    const settings = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const fetchResponse = await fetch(`${url}/${_id}`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        recipes(data.allRecipes);
        history.push('/home');
      }
    } catch (err) {
      console.log('ERROR FETCH Card --->', err);
    }
  };

  const sendComment = async (textComment) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipe_id: recipe._id,
        user: {
          name: User.name,
          firstName: User.firstName,
          color: User.color,
          _id: User._id,
        },
        text: textComment,
      }),
    };
    try {
      const fetchResponse = await fetch(`${url}/addComment`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        setCommentList(data.commentsList);
      }
    } catch (err) {
      console.log('ERROR FETCH Send comment --->', err);
    }
  };

  const deleteComment = async (commentId) => {
    const settings = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipe_id: recipe._id,
      }),
    };
    try {
      const fetchResponse = await fetch(`${url}/comment/${commentId}`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        setCommentList(data.commentsList);
      }
    } catch (err) {
      console.log('ERROR FETCH deleteComment --->', err);
    }
  };

  const modifyComment = async (newComment, _id) => {
    const settings = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newComment: newComment,
        recipe_id: recipe._id,
      }),
    };
    try {
      const fetchResponse = await fetch(`${url}/comment/${_id}`, settings);
      const data = await fetchResponse.json();
      if (data.result) {
        setCommentList(data.commentsList);
      }
    } catch (err) {
      console.log('ERROR FETCH modifyComment --->', err);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const modal = (
    <Box className={classes.paper}>
      <Box className={classes.modalHeader}>
        <Typography align='center' variant='h6'>
          Voulez vous vraiment Supprimer
        </Typography>
        <Typography align='center' variant='h6' gutterBottom>
          - {recipe && recipe.nameRecipe} -
        </Typography>
      </Box>
      <Grid container direction='row' justify='space-around' alignItems='center'>
        <Button variant='contained' color='default' onClick={() => setOpenModal(false)}>
          Annuler
        </Button>
        <Button
          variant='contained'
          style={{ backgroundColor: '#d32f2f', color: '#fff' }}
          onClick={() => deleteRecipe(recipe._id)}>
          Valider
        </Button>
      </Grid>
    </Box>
  );

  return (
    <Container>
      {recipe ? (
        <Box className={classes.container}>
          {modify ? (
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid item xs={11} md={6} lg={3}>
                <TextField
                  label='Nom'
                  fullWidth
                  value={recipe.nameRecipe}
                  onChange={(e) => modifyNameRecipe(e.target.value)}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          ) : (
            <Typography align='center' className={classes.nameRecipe} gutterBottom>
              {recipe.nameRecipe[0].toUpperCase() + recipe.nameRecipe.substr(1)}{' '}
              {recipe.vegetarien && (
                <img
                  className={classes.imageVege}
                  src='../../../Images/vagetarien.png'
                  alt='vegetarien'></img>
              )}
            </Typography>
          )}

          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item xs={12} md={6} lg={3}>
              {modify ? (
                img ? (
                  <Box className={classes.containerImage2}>
                    <img
                      alt='Plat'
                      className={classes.imageRecipe}
                      src={URL.createObjectURL(img)}
                    />
                    <AddPicButton image={(e) => setImg(e.target.files[0])} />
                  </Box>
                ) : (
                  <Box
                    className={classes.containerImage2}
                    style={
                      !img && !recipe.img
                        ? { border: '1px solid black', width: '100%', height: 400 }
                        : null
                    }>
                    <img className={classes.imageRecipe} src={recipe.img} />
                    <AddPicButton image={(e) => setImg(e.target.files[0])} />
                  </Box>
                )
              ) : (
                <Box className={classes.containerImage}>
                  <img
                    alt='Plat'
                    className={classes.imageRecipe}
                    src={recipe.img ? recipe.img : '../../../Images/no-image.jpg'}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          <Typography variant='body1' align='center' gutterBottom>
            Recette ajouté(e) par {recipe.user.firstName} {recipe.user.name}
          </Typography>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item xs={12} md={6} lg={3} align='center'>
              {modify ? (
                <Grid container direction='row' justify='space-around' alignItems='center'>
                  <Button
                    variant='contained'
                    color='default'
                    onClick={() => (setImg(null), setModify(false), getRecipe())}>
                    Annuler
                  </Button>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: 'green' }}
                    onClick={() => sendModification()}>
                    Appliquer les modifications
                  </Button>
                </Grid>
              ) : (
                <Fragment>
                  {recipe.user._id === User._id ? (
                    <Grid container direction='row' justify='space-around' alignItems='center'>
                      <Button
                        variant='contained'
                        style={{ backgroundColor: 'red' }}
                        onClick={() => setOpenModal(true)}>
                        Supprimer
                      </Button>
                      <Button variant='contained' color='primary' onClick={() => setModify(true)}>
                        Modifier la recette
                      </Button>
                    </Grid>
                  ) : null}
                </Fragment>
              )}
            </Grid>
          </Grid>

          <Modal onClose={() => setOpenModal(false)} open={openModal}>
            {modal}
          </Modal>

          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            style={{ margin: '20px 0px 20px 0px' }}>
            {recipe.categorie.map((cat, i) => {
              return (
                <Grid item xs={12} md={6} lg={3} style={{ border: 'thick double #000', margin: 2 }}>
                  <Typography variant='h6' align='center' style={{ padding: 20 }}>
                    {cat}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid container direction='row' justify='space-evenly' alignItems='center'>
            <Grid item xs={11} md={8} lg={4}>
              <Table className={classes.cadre}>
                <TableHead>
                  <TableRow>
                    <Fragment>
                      <TableCell align='left'>Ingredient</TableCell>
                      <TableCell align='left'>Quantité</TableCell>
                      {modify && <TableCell align='left'>Actions</TableCell>}
                    </Fragment>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipe.ingredientsList.map((ingredient) => (
                    <TableRow key={ingredient._id}>
                      <Fragment>
                        {modify ? (
                          <Fragment>
                            <TableCell align='left'>
                              <TextField
                                label='Nom'
                                value={ingredient.name}
                                onChange={(e) =>
                                  modifyIngredients(e.target.value, ingredient, 'name')
                                }
                                variant='outlined'
                              />
                            </TableCell>
                            <TableCell align='left'>
                              <TextField
                                label='Quantité'
                                value={ingredient.quantity}
                                onChange={(e) =>
                                  modifyIngredients(e.target.value, ingredient, 'quantity')
                                }
                                variant='outlined'
                              />
                            </TableCell>
                            <TableCell align='left'>
                              <DeleteIcon
                                className={classes.actionIcons}
                                onClick={() => deleteIngredient(ingredient._id)}
                              />
                            </TableCell>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <TableCell align='left'>{ingredient.name}</TableCell>
                            <TableCell align='left'>
                              {ingredient.quantity}
                              {ingredient.unit}
                            </TableCell>
                          </Fragment>
                        )}
                      </Fragment>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid className={classes.cadre} item xs={11} md={8} lg={5}>
              <Grid container direction='column' justify='center' alignItems='stretch'>
                {recipe.steps.map((steps, idx) => {
                  return (
                    <Grid key={steps.step} item xs={12}>
                      {modify ? (
                        <FormControl variant='outlined' fullWidth margin='normal'>
                          <InputLabel>{`étapes n°:${idx + 1}`}</InputLabel>
                          <OutlinedInput
                            style={{ width: '100%', fontSize: 16 }}
                            placeholder='Ex : Couper les tomates et le poivron en petits dés.'
                            name='content'
                            multiline
                            margin='normal'
                            type='text'
                            id={idx}
                            className='content'
                            variant='outlined'
                            value={steps.content}
                            onChange={(e) => modifySteps(e.target.value, steps)}
                            endAdornment={
                              <InputAdornment position='end'>
                                <DeleteIcon id={idx} onClick={() => deleteSteps(steps.step)} />
                              </InputAdornment>
                            }
                            labelWidth={90}
                          />
                        </FormControl>
                      ) : (
                        <Fragment>
                          <Typography variant='h6'>Étapes n°{idx + 1}</Typography>
                          <Typography style={{ wordWrap: 'break-word' }} variant='body1'>
                            {steps.content}
                          </Typography>
                        </Fragment>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item xs={11} lg={6}>
              {recipe.notaBene ? (
                modify ? (
                  <Box>
                    <Typography align='center' variant='h6' gutterBottom>
                      Nota Bene
                    </Typography>
                    {modify ? (
                      <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item xs={12}>
                          <TextField
                            label='Nota Bene'
                            multiline
                            fullWidth
                            value={recipe.notaBene}
                            onChange={(e) => modifyNotaBene(e.target.value)}
                            variant='outlined'
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item xs={11}>
                          <Typography style={{ wordWrap: 'break-word' }} variant='body1'>
                            {recipe.notaBene}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                ) : (
                  <Box className={classes.containerNotaBene}>
                    <Typography align='center' variant='h6' gutterBottom>
                      Nota Bene
                    </Typography>
                    {modify ? (
                      <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item xs={11}>
                          <TextField
                            label='Nota Bene'
                            multiline
                            fullWidth
                            value={recipe.notaBene}
                            onChange={(e) => modifyNotaBene(e.target.value)}
                            variant='outlined'
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item xs={11}>
                          <Typography
                            style={{ wordWrap: 'break-word' }}
                            align='center'
                            variant='body1'>
                            {recipe.notaBene}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                )
              ) : null}
            </Grid>
          </Grid>

          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.containerComments}>
            <Grid item xs={11} lg={6}>
              <Comment user={User} write={true} sendComment={sendComment} />
              {commentList && commentList.length > 0 ? (
                <Fragment>
                  {[...commentList]
                    .reverse()
                    .slice(count, count + 10)
                    .map((comment, i) => {
                      return (
                        <Comment
                          key={comment._id}
                          commentInfo={comment}
                          user={comment.user}
                          deleteComment={deleteComment}
                          modifyComment={modifyComment}
                        />
                      );
                    })}
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    style={{ padding: 50 }}>
                    <Pagination
                      count={
                        commentList.length / 10 > Math.round(commentList.length / 10)
                          ? Math.round(commentList.length / 10) + 1
                          : Math.round(commentList.length / 10)
                      }
                      color='primary'
                      onChange={(e, value) => (
                        setPagination(value),
                        value !== pagination && value === 1
                          ? setCount(0)
                          : setCount((value - 1) * 10)
                      )}
                    />
                  </Grid>
                </Fragment>
              ) : (
                <Typography variant='body1' align='center'>
                  Soyez le premier à écrire un commentaire sur cette recette
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Backdrop open={loader}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
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
    recipes: (allRecipes) => {
      dispatch({ type: 'recipes', allRecipes });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
