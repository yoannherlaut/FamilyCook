import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

//Materials
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkCreateRecipe: {
    textDecoration: 'none',
    color: '#fff',
    border: '3px #fff solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
    height: 30,
    padding: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 28,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: theme.spacing(2),
    cursor: 'pointer',
    backgroundColor: deepOrange[500],
  },
  containerHead: {
    backgroundColor: '#4a00e0',
    padding: 15,
  },
  itemMoreOptions: {
    color: '#fff',
    cursor: 'pointer',
    padding: 15,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCreateRecipe: {
    padding: 10,
    border: '1px solid #fff',
    backgroundColor: '#4a00e0',
    color: '#fff',
  },
}));

const Header = (props) => {
  const { deconnexion, User } = props;
  const history = useHistory();
  const classes = useStyles(props);

  const [optionPopover, setOptionPopover] = useState(false);

  const [drawer, setDrawer] = useState(false);

  return (
    <Grid container direction='row' alignItems='center' className={classes.containerHead}>
      <Grid container item xs={2} justify='flex-start'>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='open drawer'
          onClick={() => setDrawer(true)}>
          <MenuIcon style={{ color: '#fff' }} />
        </IconButton>
      </Grid>
      <Grid item xs={8}>
        <Link
          style={{ textDecoration: 'none', color: '#fff' }}
          className={classes.center}
          to='/home'>
          <Typography className={classes.title} variant='h6' noWrap>
            FamilyCook
          </Typography>
        </Link>
      </Grid>
      <Grid container item xs={2} justify='flex-end'>
        <Grid container direction='row' alignItems='center' justify='flex-end'>
          <Hidden only={['sm', 'xs', 'md']}>
            <Button
              className={(classes.center, classes.buttonCreateRecipe)}
              endIcon={<MenuBookIcon style={{ marginRight: 5 }} />}
              onClick={() => history.push('/addRecipe')}>
              Créer une recette
            </Button>
          </Hidden>
          <Hidden only={['lg', 'xl']}>
            <IconButton aria-label='show more' aria-haspopup='true' color='inherit'>
              <MoreIcon style={{ color: '#fff' }} onClick={() => setOptionPopover(true)} />
            </IconButton>
          </Hidden>
          <Hidden only={['sm', 'xs', 'md']}>
            <Avatar
              onClick={() => setOptionPopover(true)}
              alt={User.name}
              className={classes.avatar}>
              {User ? User.firstName[0] + User.name[0] : null}
            </Avatar>
          </Hidden>
        </Grid>
      </Grid>
      <Popover
        open={optionPopover}
        onClose={() => {
          setOptionPopover(false);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Paper
          elevation={3}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#424242',
          }}>
          <Hidden only={['lg', 'xl']}>
            <Typography
              className={classes.itemMoreOptions}
              variant='body1'
              onClick={() => history.push('/addRecipe')}>
              <MenuBookIcon style={{ marginRight: 15 }} />
              Créer une recette
            </Typography>
          </Hidden>
          <Typography
            className={classes.itemMoreOptions}
            variant='body1'
            onClick={(() => deconnexion(), () => history.push('/'))}>
            <PowerSettingsNewIcon style={{ marginRight: 15 }} /> Déconnexion
          </Typography>
        </Paper>
      </Popover>

      <Drawer variant='persistent' anchor='left' open={drawer}>
        <Grid container direction='row' alignItems='center' style={{ padding: 10 }}>
          <Grid item xs={4}>
            <IconButton onClick={() => setDrawer(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h6'>FamilyCook</Typography>
          </Grid>
        </Grid>
        <Divider />
        <List style={{ width: 250 }}>
          <ListItem onClick={(() => deconnexion(), () => history.push('/home'))} button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Accueil</Typography>} />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Accueil</Typography>} />
          </ListItem> */}
        </List>
      </Drawer>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deconnexion: () => {
      dispatch({ type: 'deconnexion' });
    },
  };
};

export default connect(null, mapDispatchToProps)(Header);
