import React from 'react';
import Button from './Button';
import { ArrowBackIos } from '@material-ui/icons';
const BackButton = (props) => {
  return (
    <Button onClick={() => props.history.goBack()}>
      <ArrowBackIos />
      Retour
    </Button>
  );
};

export default BackButton;
