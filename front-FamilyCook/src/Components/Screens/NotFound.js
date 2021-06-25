import React from 'react';

import Container from '@material-ui/core/Container';

//SimpleComponents
import Button from './SimpleComponents/Button';

import { Link } from 'react-router-dom';

const Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  code: {
    fontSize: 80,
    color: '#e94e27',
  },
};

const NotFound = () => {
  return (
    <Container className={Styles.container}>
      <h1 className={Styles.code}>404</h1>
      <p>Oops, Page Not Found </p>
      <Link to='/'>
        <Button backgroundcolor='#313646' color='#fff'>
          Return to Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
