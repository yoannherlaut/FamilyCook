import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: (props) => props.bordercolor,
    backgroundColor: (props) => props.backgroundcolor,
    borderRadius: '50%',
    display: 'inline-block',
    height: 30,
    width: 30,
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
}));

const CircleColorProfil = (props) => {
  const { ...otherProps } = props;
  const classes = useStyles(props);
  return <span className={classes.root} {...otherProps}></span>;
};

export default CircleColorProfil;
