import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PaperContext from "../context/PaperContext";
import { CHANGE_SENT_PAPER } from "../context/reducers";

import { AccountBalance, Class, LocalLibrary } from "@material-ui/icons";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const STextFields = ({
  onChangeText,
  onSentPaper,
  loading,
  showEmpty,
  beforePaper
}) => {
  const classes = useStyles();

  const Context = useContext(PaperContext);

  const { sentData, dispatch } = Context;

  const styles = {
    gridWrap: {
      display: "flex",
      alignItems: "center",
      marginBottom: 36,
      padding: "0 12px"
    }
  };
  const { gridWrap } = styles;
  const data = Object.keys(sentData);
  const iconData = res => {
    switch (res) {
      case "sentNo":
        return (
          <AccountBalance
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "sentDate":
        return (
          <Class
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );
      case "endorser":
        return (
          <LocalLibrary
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      default:
        break;
    }
  };

  const resTopic = res => {
    switch (res) {
      case "sentNo":
        return "หนังสือรายงานผลเลขที่";

      case "sentDate":
        return "ส่งเมื่อวันที่";

      case "endorser":
        return "ผู้ลงนาม";

      default:
        break;
    }
  };

  const checkType = res => {
    if (res === "sentDate") {
      return "date";
    } else return "text";
  };

  const labelProps = res => {
    if (res === "sentDate") {
      return { shrink: true };
    } else return null;
  };

  useEffect(() => {
    beforePaper &&
      dispatch({
        type: CHANGE_SENT_PAPER,
        payload: {
          sentNo: beforePaper.sentNo,
          sentDate: beforePaper.sentDate,
          endorser: beforePaper.endorser
        }
      });
  }, []);

  return (
    <div className={classes.margin}>
      <Grid container alignItems="flex-end">
        {data.map((res, index) => {
          return (
            <Grid key={index} item xs={12} style={gridWrap}>
              {iconData(res)}

              <TextField
                value={sentData[res]}
                autoComplete={"off"}
                onChange={e => onChangeText(e, res)}
                fullWidth
                type={checkType(res)}
                InputLabelProps={labelProps(res)}
                id={res}
                label={resTopic(res)}
                helperText={
                  showEmpty ? (sentData[res] ? null : "กรุณาใส่ข้อมูล") : null
                }
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6
        }}
      >
        {loading ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: 36
            }}
          >
            <CircularProgress fontSize={"small"} />
            <span style={{ marginTop: 24 }}>กำลังบันทึก</span>
          </span>
        ) : (
          <Button
            onClick={loading ? null : () => onSentPaper()}
            fullWidth
            style={{ backgroundColor: "#aa00ff" }}
          >
            <span style={{ color: "white ", fontSize: 16 }}>บันทึก</span>
          </Button>
        )}
      </Grid>
    </div>
  );
};
export default STextFields;
