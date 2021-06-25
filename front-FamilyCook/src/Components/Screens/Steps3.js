import React from 'react';

import { makeStyles } from '@material-ui/core';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// //SimpleComponents
import AddPicButton from './SimpleComponents/addPicButton';

const useStyles = makeStyles((theme) => ({
  cadre: {
    width: 500,
    height: 500,
    border: 'solid 1px',
    position: 'relative',
    borderColor: 'lightGray',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: 400,
    },
  },
}));

const Steps3 = (props) => {
  const { img, setImg } = props;
  const classes = useStyles(props);

  return (
    <Grid container component='main' justify='center' alignItems='center' direction='column'>
      <CssBaseline />
      <Typography align='center' variant='h6' gutterBottom>
        Choissisez une photo pour votre recette (optionnel)
      </Typography>
      <Box className={classes.cadre}>
        {img && (
          <img
            alt='Plat'
            style={{ height: '100%', width: '100%' }}
            src={URL.createObjectURL(img)}
          />
        )}
        <AddPicButton image={(e) => setImg(e.target.files[0])} />
      </Box>
    </Grid>
  );
};

export default Steps3;
