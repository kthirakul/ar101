import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import List from "@material-ui/core/List";
import PaperContext from "../context/PaperContext";
import {
  SET_ADDPAPER,
  CLEAR_EDIT_PAPER,
  CHANGE_EDIT_PAPER,
  EVENT_CHANGE
} from "../context/reducers";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AddIcon from "@material-ui/icons/Add";
import ATextFields from "./ATextFields";

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

const AddPaper = ({ history }) => {
  const Context = useContext(PaperContext);
  const classes = useStyles();
  const [showEmpty, setShowEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addPaper, dispatch, handlePaper, onEdit, showAddPaper } = Context;

  const onChangeText = (even, type) => {
    dispatch({
      type: CHANGE_EDIT_PAPER,
      payload: { [type]: even.target.value }
    });
  };

  const onAddPaper = () => {
    const paperData = Object.assign({}, handlePaper);
    delete paperData.paperId;

    const isEmpty = Object.values(paperData).some(
      cur => cur.trim() === null || cur.trim() === ""
    );
    if (onEdit) {
      if (isEmpty) {
        setShowEmpty(true);
      } else {
        setLoading(true);
        axios
          .put(`/edit/${handlePaper.paperId}`, handlePaper)
          .then(() => {
            dispatch({ type: CLEAR_EDIT_PAPER });
          })
          .then(() => {
            dispatch({ type: EVENT_CHANGE });
            setLoading(false);
            setShowEmpty(false);
            dispatch({ type: SET_ADDPAPER, payload: false });
          })
          .catch(err => {
            console.error(err);
          });
      }
    } else {
      if (isEmpty) {
        setShowEmpty(true);
      } else {
        setLoading(true);
        axios
          .post("/paper", handlePaper)
          .then(() => {
            dispatch({ type: CLEAR_EDIT_PAPER });
          })
          .then(() => {
            history.push("/รอตรวจสอบ");
            dispatch({ type: EVENT_CHANGE });
            setLoading(false);
            setShowEmpty(false);
            dispatch({ type: SET_ADDPAPER, payload: false });
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };

  const onCloseAddPaper = () => {
    dispatch({ type: CLEAR_EDIT_PAPER });
    setShowEmpty(false);
  };
  return (
    <div>
      {showAddPaper ? (
        <Button
          variant="contained"
          className={classes.fab}
          onClick={() => dispatch({ type: SET_ADDPAPER, payload: true })}
        >
          <AddIcon />
          <span style={{ fontSize: 16, marginLeft: 4 }}>เพิ่มเอกสาร</span>
        </Button>
      ) : null}

      <Dialog
        fullScreen
        open={addPaper}
        onClose={onCloseAddPaper}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {onEdit ? "แก้ไขหนังสือตรวจสอบ" : "เพิ่มหนังสือตรวจสอบ"}
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
          <ATextFields
            showEmpty={showEmpty}
            loading={loading}
            onChangeText={onChangeText}
            onAddPaper={onAddPaper}
          />
        </List>
      </Dialog>
    </div>
  );
};
export default withRouter(AddPaper);
