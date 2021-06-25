import React, { useState, Fragment } from 'react';

import { connect } from 'react-redux';

import { url } from '../../../Config/Connecturl';

import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

// Components
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';

// Functions
import dateFormat from '../../Functions/dateFormat';

//Icons
import SendIcon from '@material-ui/icons/Send';
import MoreIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

/* -------------------------------------------------------------------------- */
/*                     Fournir en props {text, user, date, read}                    */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
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
  avatarSize: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      fontSize: 15,
    },
  },
  comment: {
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 15,
    },
  },
  containerComment: {
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 5,
      marginBottom: 15,
    },
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
  modal: {
    position: 'relative',
    top: `40%`,
    left: `40%`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      top: `0%`,
      left: `0%`,
      width: '100%',
    },
  },
  modalHeader: {
    margin: theme.spacing(4),
  },
}));

const Comment = (props) => {
  const { User } = props;

  const classes = useStyles(props);
  const { commentInfo, write, sendComment, user, deleteComment, modifyComment } = props;

  const [comment, setComment] = useState('');

  const [modify, setModify] = useState(false);

  const [commentModification, setCommentModification] = useState(commentInfo && commentInfo.text);

  const [anchorEl, setAnchorEl] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const sendNewComment = async () => {
    if (comment.length > 0) {
      sendComment(comment);
      setComment('');
    }
  };

  const sendCommentModification = async () => {
    if (commentInfo.text === commentModification) {
      setModify(false);
    } else {
      modifyComment(commentModification, commentInfo._id);
      setModify(false);
      setCommentModification(commentModification);
    }
  };

  const modal = (
    <Box className={classes.modal}>
      <Box className={classes.modalHeader}>
        <Typography align='center' variant='h6'>
          Voulez vous vraiment supprimer ce commentaire ?
        </Typography>
      </Box>
      <Grid container direction='row' justify='space-around' alignItems='center'>
        <Button variant='contained' color='default' onClick={() => setOpenModal(false)}>
          Annuler
        </Button>
        <Button
          variant='contained'
          style={{ backgroundColor: '#d32f2f', color: '#fff' }}
          onClick={() => deleteComment(commentInfo._id)}>
          Supprimer
        </Button>
      </Grid>
    </Box>
  );

  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.containerComment}>
        <Hidden xsDown>
          <Grid item xs={1}>
            <Avatar
              className={classes.avatarSize}
              alt='picture user profil'
              style={{ backgroundColor: user.color }}>
              {user.firstName[0] + user.name[0]}
            </Avatar>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={10}>
          <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Grid container direction='row' justify='flex-start' alignItems='center'>
              <Typography variant='h6'>
                {user.firstName} {user.name}
              </Typography>
              {!write && (
                <Fragment>
                  <Divider
                    orientation='vertical'
                    style={{ height: 20, color: 'gray', marginLeft: 10, marginRight: 10 }}
                  />
                  <Typography variant='caption'>{dateFormat(commentInfo.date)}</Typography>
                </Fragment>
              )}
            </Grid>
            <Grid container direction='row' justify='flex-start' alignItems='center'>
              <Grid item xs={12}>
                {write ? (
                  <FormControl variant='outlined' fullWidth margin='normal'>
                    <OutlinedInput
                      style={{ width: '100%' }}
                      placeholder='écrire un commentaire'
                      multiline
                      type='text'
                      variant='filled'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <SendIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => sendNewComment()}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                ) : (
                  <Paper elevation={3} className={classes.comment}>
                    <Grid container direction='row' justify='center' alignItems='center'>
                      <Grid item xs={user._id === User._id ? 11 : 12}>
                        {modify ? (
                          <FormControl variant='outlined' fullWidth margin='normal'>
                            <OutlinedInput
                              style={{ width: '100%' }}
                              name='content'
                              multiline
                              type='text'
                              variant='outlined'
                              value={commentModification}
                              onChange={(e) => setCommentModification(e.target.value)}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <CloseIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => setModify(false)}
                                  />
                                  <CheckIcon
                                    onClick={() => sendCommentModification()}
                                    style={{ cursor: 'pointer' }}
                                  />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        ) : (
                          <Typography align='left' variant='body1'>
                            {commentInfo.text}
                          </Typography>
                        )}
                      </Grid>
                      {user._id === User._id && !modify && (
                        <Grid item xs={1} container justify='flex-end'>
                          <Button
                            aria-controls='simple-menu'
                            aria-haspopup='true'
                            onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <MoreIcon />
                          </Button>
                          <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            getContentAnchorEl={null}
                            onClose={() => {
                              setAnchorEl(false);
                            }}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}>
                            <MenuItem onClick={() => (setModify(true), setAnchorEl(false))}>
                              <CreateIcon style={{ marginRight: 15 }} /> Modifier
                            </MenuItem>
                            <MenuItem onClick={() => setOpenModal(true)}>
                              <DeleteIcon style={{ marginRight: 15 }} /> Supprimer
                            </MenuItem>
                          </Menu>
                        </Grid>
                      )}
                      <Modal onClose={() => setOpenModal(false)} open={openModal}>
                        {modal}
                      </Modal>
                    </Grid>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

/**
|--------------------------------------------------
| Défault Value
|--------------------------------------------------
*/
Comment.defaultProps = {
  write: false,
};

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps, null)(Comment);
