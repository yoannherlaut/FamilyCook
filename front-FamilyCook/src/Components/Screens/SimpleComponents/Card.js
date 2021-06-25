import React, { Fragment } from 'react';

import Box from '@material-ui/core/Box';

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  divider: {
    margin: 30,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    '&:hover': {
      transform: 'scale(0.9, 0.9)',
      boxShadow: '3px 3px 20px 10px rgba(0,0,0,0.25),-3px -3px 20px 10px rgba(0,0,0,0.22)',
    },
    borderRadius: 40,
    boxShadow: '3px 3px 20px 3px rgba(0,0,0,0.25), -3px -3px 20px 3px rgba(0,0,0,0.22)',
    cursor: 'pointer',
    transition: '0.4s',
    margin: 30,
    width: 200,
    height: 200,
    [theme.breakpoints.down('md')]: {
      width: 180,
      height: 180,
      margin: 15,
    },
    [theme.breakpoints.down('sm')]: {
      width: 160,
      height: 160,
      margin: 10,
    },
  },
  cardTitle: {
    textAlign: 'center',
    borderRadius: '0px 0px 40px 40px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    marginTop: -55,
    height: 37,
    color: '#FFF',
    letterSpacing: 2,
    textShadow: '3px 3px 20px #000,-2px 1px 30px #000',
    paddingLeft: 1,
    paddingRight: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.6rem',
      marginTop: -45,
      height: 30,
      letterSpacing: 1.8,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
      marginTop: -50,
      height: 30,
      letterSpacing: 2,
    },
  },
  cardImage: {
    width: 'inherit',
    height: 'inherit',
    borderRadius: 40,
    objectFit: 'cover',
  },
  link: {
    textDecoration: 'none',
  },
}));

const Card = (props) => {
  const history = useHistory();
  const { nameRecipe, img, _id } = props;

  const classes = useStyles(props);

  const recipeDisplay = (_id) => {
    history.push(`/recipe/${_id}`);
  };

  return (
    <Fragment>
      <Box key={_id} className={classes.card}>
        <Box className={classes.cardImage}>
          <img
            onClick={() => recipeDisplay(_id)}
            className={classes.cardImage}
            alt={nameRecipe}
            src={img ? img : '../../../Images/no-image.jpg'}
          />
        </Box>
        <Box className={classes.cardTitle}>
          <p>{nameRecipe[0].toUpperCase() + nameRecipe.substr(1)}</p>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Card;
