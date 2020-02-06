import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import List from "@material-ui/core/List";
import PaperContext from "../context/PaperContext";
import {
  CHANGE_SENT_PAPER,
  EVENT_CHANGE,
  SENT_SHOW,
  CLEAR_SENT
} from "../context/reducers";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import STextFields from "./STextFields";

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

export default function SentPaper() {
  const Context = useContext(PaperContext);
  const classes = useStyles();
  const [showEmpty, setShowEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    dispatch,
    sentData,
    sentBool,
    sentRef,
    sentId,
    paperData: { papers }
  } = Context;

  const beforePaper = papers
    .filter(res => res.docTypes === "รายงานผล")
    .find(res => res.paperNo === sentRef);


  const onChangeText = (even, type) => {
    dispatch({
      type: CHANGE_SENT_PAPER,
      payload: { [type]: even.target.value }
    });
  };

  const onSentPaper = () => {
    const isEmpty = Object.values(sentData).some(
      cur => cur.trim() === null || cur.trim() === ""
    );

    if (isEmpty) {
      setShowEmpty(true);
    } else {
      setLoading(true);
      axios
        .post(`/sent/${sentId}`, sentData)
        .then(() => {
          dispatch({ type: EVENT_CHANGE });
          setLoading(false);
          setShowEmpty(false);
          dispatch({ type: SENT_SHOW, payload: false });
          dispatch({ type: CLEAR_SENT });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const onCloseAddPaper = () => {
    dispatch({ type: SENT_SHOW, payload: false });
    dispatch({ type: CLEAR_SENT });
  };
  return (
    <Dialog
      fullScreen
      open={sentBool}
      onClose={onCloseAddPaper}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            หนังสือรายงานผล อ้างอิงถึง หนังสือเลขที่ {sentRef}
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
        <STextFields
          dispatch={dispatch}
          showEmpty={showEmpty}
          loading={loading}
          onChangeText={onChangeText}
          onSentPaper={onSentPaper}
          beforePaper={beforePaper}
        />
      </List>
    </Dialog>
  );
}
