import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PaperContext from "../context/PaperContext";

import {
  Send,
  Explore,
  MenuBook,
  DateRange,
  Contacts,
  Room
} from "@material-ui/icons";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const ATextFields = ({
  onChangeText,
  onAddPaper,
  loading,
  showEmpty
}) => {
  const classes = useStyles();

  const Context = useContext(PaperContext);

  const { handlePaper } = Context;
  const { paperNo, dateAt, agencyName, provice, district, topic } = handlePaper;

  return (
    <div className={classes.margin}>
      <Grid container alignItems="flex-end">
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
            padding: "0 12px"
          }}
        >
          <Contacts
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
          <TextField
            value={paperNo}
            autoComplete={"off"}
            onChange={e => onChangeText(e, "paperNo")}
            fullWidth
            id="paperNo"
            label="หนังสือตรวจสอบเลขที่"
            helperText={showEmpty ? (paperNo ? null : "กรุณาใส่ข้อมูล") : null}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
            padding: "0 12px"
          }}
        >
          <MenuBook
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
          <TextField
            value={topic}
            autoComplete={"off"}
            onChange={e => onChangeText(e, "topic")}
            fullWidth
            id="topic"
            label="เรื่อง"
            helperText={showEmpty ? (topic ? null : "กรุณาใส่ข้อมูล") : null}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
            padding: "0 12px"
          }}
        >
          <DateRange
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
          <TextField
            value={dateAt}
            autoComplete={"off"}
            onChange={e => onChangeText(e, "dateAt")}
            fullWidth
            id="dateAt"
            type="date"
            InputLabelProps={{ shrink: true }}
            label="ลงวันที่"
            helperText={showEmpty ? (dateAt ? null : "กรุณาใส่ข้อมูล") : null}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
            padding: "0 12px"
          }}
        >
          <Send
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
          <TextField
            value={agencyName}
            autoComplete={"off"}
            onChange={e => onChangeText(e, "agencyName")}
            fullWidth
            id="agencyName"
            label="จาก"
            helperText={
              showEmpty ? (agencyName ? null : "กรุณาใส่ข้อมูล") : null
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
            padding: "0 12px"
          }}
        >
          <Explore
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
          <TextField
            value={district}
            autoComplete={"off"}
            onChange={e => onChangeText(e, "district")}
            fullWidth
            id="district"
            label="อำเภอ/เขต"
            helperText={showEmpty ? (district ? null : "กรุณาใส่ข้อมูล") : null}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
            padding: "0 12px"
          }}
        >
          <Room
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
          <TextField
            value={provice}
            autoComplete={"off"}
            onChange={e => onChangeText(e, "provice")}
            fullWidth
            id="province"
            label="จังหวัด"
            helperText={showEmpty ? (provice ? null : "กรุณาใส่ข้อมูล") : null}
          />
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
              onClick={loading ? null : () => onAddPaper()}
              fullWidth
              style={{ backgroundColor: "#aa00ff" }}
            >
              <span style={{ color: "white ", fontSize: 16 }}>บันทึก</span>
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default ATextFields;
