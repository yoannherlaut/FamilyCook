import React from 'react';

import { makeStyles } from '@material-ui/core';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

// Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  addSteps: {
    margin: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
    },
  },
}));

const Steps5 = (props) => {
  const { stepsArray, setStepsArray, stepFormat } = props;
  const classes = useStyles(props);

  const addStep = () => {
    setStepsArray([...stepsArray, { ...stepFormat }]);
  };

  const deleteStep = (e) => {
    const updatedSteps = [...stepsArray];
    updatedSteps.splice(e.target.parentNode.id, 1);
    setStepsArray(updatedSteps);
  };

  const updateStep = (e) => {
    const updatedSteps = [...stepsArray];
    updatedSteps[e.target.id][e.target.name] = e.target.value;
    updatedSteps[e.target.id].step = e.target.id;
    setStepsArray(updatedSteps);
  };

  return (
    <Grid container component='main' direction='row' justify='center' alignItems='center'>
      <CssBaseline />
      <Grid item xs={11}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Typography className={classes.addSteps} variant='h6'>
            Ajouter une étape
          </Typography>
          <Fab color='primary' aria-label='add' onClick={addStep}>
            <AddIcon />
          </Fab>
        </Grid>

        <Grid container direction='row' justify='space-evenly' alignItems='center'>
          {stepsArray.map((val, idx) => {
            return (
              <Grid key={`étapes-${idx}`} item xs={12} md={5}>
                <FormControl variant='outlined' fullWidth margin='normal'>
                  <InputLabel>{`étapes n°:${idx + 1}`}</InputLabel>
                  <OutlinedInput
                    style={{ width: '100%', fontSize: 16 }}
                    placeholder='Ex : Couper les tomates et le poivron en petits dés.'
                    name='content'
                    rows='8'
                    multiline
                    margin='normal'
                    type='text'
                    id={idx}
                    className='content'
                    variant='outlined'
                    value={stepsArray[idx].content}
                    onChange={updateStep}
                    endAdornment={
                      <InputAdornment position='end'>
                        <DeleteIcon id={idx} onClick={deleteStep} />
                      </InputAdornment>
                    }
                    labelWidth={90}
                  />
                </FormControl>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Steps5;
