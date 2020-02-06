import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PaperContext from "../context/PaperContext";

import {
  AccountBalance,
  Class,
  LocalLibrary,
  FeaturedPlayList,
  AccountBox,
  Cake,
  School,
  LocalOffer,
  BusinessCenter,
  SpeakerNotes,
  AssistantPhoto,
  Feedback
} from "@material-ui/icons";
import { Button, CircularProgress, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const RTextFields = ({ onChangeText, onVerifyPaper, loading, showEmpty }) => {
  const classes = useStyles();

  const Context = useContext(PaperContext);

  const { verifyData } = Context;

  const styles = {
    gridWrap: {
      display: "flex",
      alignItems: "center",
      marginBottom: 36,
      padding: "0 12px"
    }
  };
  const { gridWrap } = styles;
  const data = Object.keys(verifyData);
  const iconData = res => {
    switch (res) {
      case "faculty":
        return (
          <AccountBalance
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "educational":
        return (
          <Class
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );
      case "major":
        return (
          <LocalLibrary
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "studentId":
        return (
          <FeaturedPlayList
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "studentName":
        return (
          <AccountBox
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "birthDate":
        return (
          <Cake
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "gradDate":
        return (
          <School
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "grade":
        return (
          <LocalOffer
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "agencyType":
        return (
          <BusinessCenter
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "reason":
        return (
          <SpeakerNotes
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "result":
        return (
          <AssistantPhoto
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      case "verifyNote":
        return (
          <Feedback
            color="secondary"
            fontSize="large"
            style={{ marginRight: 10 }}
          />
        );

      default:
        break;
    }
  };
  //  let date = dayjs(new Date()).format("DD/MM/YYYY HH:mm");
  //  let yaer = Number(date.substring(6, 10)) + 543;
  //  let useDate = `${date.substring(0, 6)}${yaer} ${date.substring(11, 16)}`;
  // <-- แก้ไขวันด้วย แสดงไม่ถูกต้อง

  const resTopic = res => {
    switch (res) {
      case "faculty":
        return "คณะ";

      case "educational":
        return "วุฒิการศึกษา";

      case "major":
        return "สาขาวิชา";

      case "studentId":
        return "รหัสนักศึกษา";

      case "studentName":
        return "ชื่อ-นามสกุล";

      case "birthDate":
        return "วัน/เดือน/ปีเกิด";

      case "gradDate":
        return "วันที่จบการศึกษา";

      case "grade":
        return "เกรด";

      case "agencyType":
        return "ประเภทหน่วยงาน";

      case "reason":
        return "เหตุผลที่ตรวจสอบ";

      case "result":
        return "ผลการตรวจสอบ";

      case "verifyNote":
        return "หมายเหตุ";

      default:
        break;
    }
  };

  const checkType = res => {
    if (res === "birthDate" || res === "gradDate") {
      return "date";
    } else return "text";
  };

  const labelProps = res => {
    if (res === "birthDate" || res === "gradDate") {
      return { shrink: true };
    } else return null;
  };

  const checkedSelect = res => {
    if (res === "result" || res === "reason" || res === "agencyType") {
      return true;
    } else return false;
  };

  const selectValues = res => {
    switch (res) {
      case "result":
        return [
          {
            value: "สำเร็จ",
            label: "สำเร็จ"
          },
          {
            value: "ไม่สำเร็จ",
            label: "ไม่สำเร็จ"
          }
        ];

      case "reason":
        return [
          {
            value: "ทำงาน",
            label: "ทำงาน"
          },
          {
            value: "ศึกษาต่อ",
            label: "ศึกษาต่อ"
          }
        ];
      case "agencyType":
        return [
          {
            value: "ราชการ",
            label: "ราชการ"
          },
          {
            value: "เอกชน",
            label: "เอกชน"
          }
        ];
      default:
        break;
    }
  };

  return (
    <div className={classes.margin}>
      <Grid container alignItems="flex-end">
        {data.map((res, index) => {
          return (
            <Grid key={index} item xs={12} style={gridWrap}>
              {iconData(res)}

              <TextField
                value={verifyData[res]}
                autoComplete={"off"}
                onChange={e => onChangeText(e, res)}
                fullWidth
                type={checkType(res)}
                InputLabelProps={labelProps(res)}
                id={res}
                select={checkedSelect(res)}
                label={resTopic(res)}
                helperText={
                  showEmpty ? (verifyData[res] ? null : "กรุณาใส่ข้อมูล") : null
                }
                // SelectProps={selectPropsFuc(res)}
              >
                {(res === "result" ||
                  res === "reason" ||
                  res === "agencyType") &&
                  selectValues(res).map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
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
            onClick={loading ? null : () => onVerifyPaper()}
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
export default RTextFields;
