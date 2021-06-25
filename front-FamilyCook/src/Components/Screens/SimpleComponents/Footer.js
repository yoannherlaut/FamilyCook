import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//Materials
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    msFlexDirection: 'column',
    borderTop: '1px #e0e0e0 solid',
    marginTop: 50,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = (props) => {
  const classes = useStyles(props);

  return (
    <Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Typography variant='subtitle1' align='center' gutterBottom>
          Des idées, des réclamations{'  '}
          <a href='mailto:y.herlaut@gmail.com'>Cliquer ici</a>
        </Typography>
        <Typography variant='body2' color='textSecondary' align='center'>
          © FamilyCook {new Date().getFullYear()}
        </Typography>
      </footer>
    </Fragment>
  );
};

export default Footer;
