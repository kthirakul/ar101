import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import List from "@material-ui/core/List";
import PaperContext from "../context/PaperContext";
import {
  CHANGE_TEXT_VERIFY,
  VERIFY_SHOW,
  EVENT_CHANGE,
  CLEAR_VERIFIED,
  CLEAR_EDIT_PAPER_REGIS,
  SHOW_VERIFIED,
  FROM_VERIFIED
} from "../context/reducers";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import RTextFields from "./RTextFields";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  fab: {
    margin: theme.spacing(1),
    width: 137,
    height: 54
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VerifyPaper() {
  const Context = useContext(PaperContext);
  const classes = useStyles();
  const [showEmpty, setShowEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    verify,
    dispatch,
    verifyNo,
    verifyData,
    verifyId,
    onEdit,
    fromVerified
  } = Context;

  const onChangeText = (even, type) => {
    dispatch({
      type: CHANGE_TEXT_VERIFY,
      payload: { [type]: even.target.value }
    });
  };


  const onVerifyPaper = () => {
    const isEmpty = Object.values(verifyData).some(
      cur => cur.trim() === null || cur.trim() === ""
    );

    if (isEmpty) {
      setShowEmpty(true);
    } else {
      if (fromVerified === true) {
        setLoading(true);
        axios
          .put(`/verified/${verifyId}`, verifyData)
          .then(() => {
      
            dispatch({ type: EVENT_CHANGE });
            setLoading(false);
            setShowEmpty(false);
            dispatch({ type: VERIFY_SHOW, payload: false });
            dispatch({ type: CLEAR_VERIFIED });
            if (onEdit) {
              dispatch({ type: CLEAR_EDIT_PAPER_REGIS });
            }
          })
          .then(() => {
            dispatch({ type: FROM_VERIFIED, payload: false });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        setLoading(true);
        axios
          .post(`/verify/${verifyId}`, verifyData)
          .then(() => {
            dispatch({ type: EVENT_CHANGE });
            setLoading(false);
            setShowEmpty(false);
            dispatch({ type: VERIFY_SHOW, payload: false });
            dispatch({ type: CLEAR_VERIFIED });
            if (onEdit) {
              dispatch({ type: CLEAR_EDIT_PAPER_REGIS });
            }
          })
          .then(() => {
            setTimeout(() => {
              dispatch({
                type: SHOW_VERIFIED,
                payload: true
              });
            }, 600);
            setTimeout(() => {
              dispatch({
                type: SHOW_VERIFIED,
                payload: false
              });
            }, 2000);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };

  const onCloseAddPaper = () => {
    dispatch({ type: VERIFY_SHOW, payload: false });
    dispatch({ type: FROM_VERIFIED, payload: false });
    if (onEdit) {
      dispatch({ type: CLEAR_EDIT_PAPER_REGIS });
    }
  };
  return (
    <Dialog
      fullScreen
      open={verify}
      onClose={onCloseAddPaper}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ตรวจสอบหนังสือเลขที่ {verifyNo}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCloseAddPaper}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <RTextFields
          showEmpty={showEmpty}
          loading={loading}
          onChangeText={onChangeText}
          onVerifyPaper={onVerifyPaper}
        />
      </List>
    </Dialog>
  );
}
