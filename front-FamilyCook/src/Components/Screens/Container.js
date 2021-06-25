import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

//Materials
import { Container as MyContainer } from '@material-ui/core';
import Box from '@material-ui/core/Box';

// simpleComponents
import Footer from './SimpleComponents/Footer';
import Header from './SimpleComponents/Header';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    flex: '1 0 auto',
    flexGrow: 11,
  },
});

const Container = (props) => {
  const { User, children } = props;
  const classes = useStyles(props);

  return (
    <MyContainer className={classes.root} maxWidth={false}>
      {User ? <Header User={User} /> : <Redirect to={`/`} />}
      <Box className={classes.box}>{children}</Box>
      <Footer />
    </MyContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps, null)(Container);
