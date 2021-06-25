import React from 'react';
import { Button as ButtonMaterial } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    // '&:hover': {
    //   color: '#FFF',
    //   backgroundColor: '#e94e27',
    // },
    borderColor: (props) => props.bordercolor,
    color: (props) => props.color,
    backgroundColor: (props) => props.backgroundcolor,
    margin: (props) => props.margin,
    borderRadius: 5,
    height: 36,
    textTransform: 'capitalize',
    textDecoration: 'none',
  },
}));

const Button = (props) => {
  const { ...otherProps } = props;
  const classes = useStyles(props);
  return <ButtonMaterial className={classes.root} {...otherProps} />;
};

/**
|--------------------------------------------------
| Défault Value
|--------------------------------------------------
*/
Button.defaultProps = {
  color: 'primary',
  variant: 'contained',
};

/**
|--------------------------------------------------
| Défault Type
|--------------------------------------------------
*/
Button.propTypes = {
  backgroundcolor: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'outlined']),
};

export default Button;
