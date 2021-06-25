import React from 'react';
import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
import { PermMedia } from '@material-ui/icons';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  button: {
    position: 'absolute',
    bottom: '5% ',
    right: '5%',
    zIndex: 1000,
    color: '#313646',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

const AddPicButton = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <input
        accept='image/*'
        onChange={props.image}
        className={classes.input}
        id='icon-button-file'
        type='file'
      />
      <label htmlFor='icon-button-file'>
        <Tooltip title='Ajouter une image' placement='left'>
          <IconButton className={classes.button} aria-label='upload picture' component='span'>
            <PermMedia />
          </IconButton>
        </Tooltip>
      </label>
    </>
  );
};

export default AddPicButton;
