import React, { useContext, useState, Fragment } from "react";
import PaperContext from "../context/PaperContext";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Paper,
  Button,
  Table,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  MoveToInbox,
  DeleteOutline,
  AssignmentTurnedInOutlined,
  AssignmentOutlined,
  AssignmentReturnOutlined,
  ErrorOutline,
  DeleteForeverOutlined
} from "@material-ui/icons";
import dayjs from "dayjs";
import { CSVLink } from "react-csv";
import NoListData from "../util/NoListData";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: window.innerHeight - 100,
    overflow: "auto"
  }
});

function ViewAll() {
  const classes = useStyles();
  const Context = useContext(PaperContext);
  const [openDialog, setopenDialog] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [backupType, setBackupType] = useState(null);
  const [docType, setDocType] = useState("ทั้งหมด");
  const [deleteAll, setDeleteAll] = useState(false);

  const {
    paperData: { papers },
    systemData,
    getData
  } = Context;

  const checkPapersDone = () => {
    return (
      papers.length > 0 &&
      papers.every(cur => {
        return cur.verified && cur.checked && cur.send;
      })
    );
  };

  // data

  const columns = () => {
    const data = [
      {
        id: "month",
        label: "เดือน",
        minWidth: 100,
        format: value => dayjs(value).format("MMMM")
      },
      { id: "faculty", label: "คณะ", minWidth: 200 },
      {
        id: "educational",
        label: "วุฒิการศึกษา",
        minWidth: 110
      },
      {
        id: "studentId",
        label: "รหัสนักศึกษา",
        minWidth: 130
      },
      {
        id: "studentName",
        label: "ชื่อ-สกุล",
        minWidth: 160
      },
      {
        id: "birthDate",
        label: "วันเกิด",
        minWidth: 120,
        format: value => value && dayjs(value).format("DD/MM/YYYY")
      },
      {
        id: "gradDate",
        label: "วันจบการศึกษา",
        minWidth: 140,
        format: value => value && dayjs(value).format("DD/MM/YYYY")
      },
      {
        id: "grade",
        label: "เกรด",
        minWidth: 80
      },
      {
        id: "agencyName",
        label: "จากหน่วยงาน",
        minWidth: 180
      },
      {
        id: "provice",
        label: "จังหวัด",
        minWidth: 100
      },
      {
        id: "agencyType",
        label: "ประเภทหน่วยงาน",
        minWidth: 158
      },
      {
        id: "reason",
        label: "เหตุที่ตรวจสอบ",
        minWidth: 144
      },
      {
        id: "result",
        label: "ผลการตรวจสอบ",
        minWidth: 148
      },
      {
        id: "paperNo",
        label: "เลขที่หนังสือตรวจสอบ",
        minWidth: 185
      },
      {
        id: "dateAt",
        label: "ลงวันที่",
        minWidth: 100,
        format: value => value && dayjs(value).format("DD/MM/YYYY")
      },
      {
        id: "verifyDate",
        label: "วันที่ตรวจสอบ",
        minWidth: 130
        // format: value => value && dayjs(value).format("D/MM/YYYY")
      },
      {
        id: "verifyNote",
        label: "หมายเหตุ",
        minWidth: 140
      },
      {
        id: "docTypes",
        label: "สถานะหนังสือ",
        minWidth: 140
      },
      {
        id: "sentNo",
        label: "เลขที่หนังสือรายงานผล",
        minWidth: 185
      },
      {
        id: "sentDate",
        label: "วันที่ส่งรายงานผล",
        minWidth: 140,
        format: value => value && dayjs(value).format("DD/MM/YYYY")
      },
      {
        id: "endorser",
        label: "ผู้ลงนาม",
        minWidth: 160
      }
    ];

    if (docType === "ทั้งหมด" || docType === "รายงานผล") {
      return data;
    } else {
      return data.filter(
        res =>
          res.id !== "sentNo" && res.id !== "sentDate" && res.id !== "endorser"
      );
    }
  };

  // >

  const onDeletePapers = () => {
    setLoading(true);
    const data = papers.filter(
      res => res.docTypes === "ตรวจสอบ" || res.docTypes === "รายงานผล"
    );

    data.forEach((res, i) => {
      axios.delete(`/delete/${res.paperId}`).then(res => {
        if (data.length === i + 1) {
          setTimeout(() => {
            window.location.reload();
            setLoading(false);
          }, 3000);
          setTimeout(() => {
            setopenDialog(false);
          }, 2000);
        }
      });
    });
  };

  const handleClose = () => {
    setopenDialog(false);
    setTimeout(() => {
      setDeleteAll(false);
    }, 700);
  };

  const createData = () => {
    let dataFilter = [];
    switch (docType) {
      case "ทั้งหมด":
        dataFilter = papers.filter(
          res => res.docTypes === "ตรวจสอบ" || res.docTypes === "รายงานผล"
        );
        break;

      case "ตรวจสอบ":
        dataFilter = papers.filter(res => res.docTypes === "ตรวจสอบ");
        break;

      case "รายงานผล":
        dataFilter = papers.filter(res => res.docTypes === "รายงานผล");
        break;

      default:
        break;
    }

    const paperNew = dataFilter.map(res => {
      let year = dayjs(res.verifyDate)
        .format("DD/MM/YYYY")
        .substring(6, 10);
      let date = dayjs(res.verifyDate)
        .format("DD/MM/YYYY")
        .substring(0, 6);
      let useDate = `${date}${Number(year) + 543}`;

      const newData = {
        ...res,
        month: res.verifyDate,
        verifyDate: useDate
      };
      return newData;
    });

    return paperNew;
  };

  const countSelect = () => {
    const dataFilter = papers.filter(
      res => res.docTypes === "ตรวจสอบ" || res.docTypes === "รายงานผล"
    );
    let count = [];
    dataFilter.forEach((res, i) => {
      count[res.docTypes] = (count[res.docTypes] || 0) + 1;
      count["ทั้งหมด"] = i + 1;
    });
    return count;
  };
  const rows = createData();

  const selectChange = e => {
    setDocType(e.target.value);
  };

  const swiftIconBook = () => {
    switch (docType) {
      case "ทั้งหมด":
        return <AssignmentOutlined />;
      case "ตรวจสอบ":
        return <AssignmentTurnedInOutlined />;

      case "รายงานผล":
        return <AssignmentReturnOutlined />;
      default:
        break;
    }
  };

  const OpenDialog = type => {
    getData();
    if (type === "ล้างข้อมูล") {
      setDocType("ทั้งหมด");
    }

    setBackupType(type);
    setopenDialog(true);
  };
  const onChangeDataDownload = type => {
    setDocType(type);
    setopenDialog(false);
  };
  const forDownload = () => {
    const csvFormat = createData().map(res => {
      return {
        เดือน: dayjs(res.month).format("MMMM"),
        คณะ: res.faculty,
        วุฒิการศึกษา: res.educational,
        สาขาวิชา: res.major,
        รหัสนักศึกษา: res.studentId,
        "ชื่อ-สกุล": res.studentName,
        "วัน/เดือน/ปีเกิด": dayjs(res.birthDate).format("DD/MM/YYYY"),
        วันจบการศึกษา: dayjs(res.gradDate).format("DD/MM/YYYY"),
        เกรดเฉลี่ย: res.grade,
        หน่วยงานที่ส่งหนังสือมาตรวจสอบ: res.agencyName,
        จังหวัด: res.provice,
        ประเภทหน่วยงาน: res.agencyType,
        เหตุที่ตรวจสอบ: res.reason,
        ผลการตรวจสอบ: res.result,
        เลขที่หนังสือส่งมาตรวจสอบ: res.paperNo,
        ลงวันที่: dayjs(res.dateAt).format("DD/MM/YYYY"),
        วันที่ตรวจสอบ: res.verifyDate,
        หมายเหตุ: res.verifyNote,
        สถานะหนังสือ: res.docTypes,
        "เลขที่หนังสือ(รายงานผล)": res.sentNo,
        วันที่ส่งรายงานผล: res.sentDate,
        ผู้ลงนาม: res.endorser
      };
    });

    if (docType === "ทั้งหมด" || docType === "รายงานผล") {
      return csvFormat;
    } else {
      let data = csvFormat;
      data.forEach(res => {
        delete res["เลขที่หนังสือ(รายงานผล)"];
        delete res["วันที่ส่งรายงานผล"];
        delete res["ผู้ลงนาม"];
      });
      return data;
    }
  };

  const onDeleteData = () => {
    setDocType("ทั้งหมด");
    setDeleteAll(true);
  };

  const dialogBackup = () => {
    return (
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <ErrorOutline fontSize="large" style={{ marginRight: 4 }} />
            <span>{backupType}</span>
          </div>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 10
              }}
            >
              <CircularProgress />
              <DialogContentText
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 24
                }}
                id="alert-dialog-description"
              >
                กำลังล้างข้อมูล
              </DialogContentText>
            </div>
          ) : (
            <DialogContentText
              id="alert-dialog-description"
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              {backupType === "บันทึกข้อมูล"
                ? "กรุณาเลือกประเภทหนังสือที่ต้องการบันทึก"
                : deleteAll
                ? "ล้างข้อมูลทั้งหมดจากฐานข้อมูล คุณต้องการล้างข้อมูลหรือไม่?"
                : checkPapersDone()
                ? "เพื่อให้แน่ใจว่าคุณไม่ลืมที่จะสำรองไฟล์ก่อนที่จะทำการล้างข้อมูล เราจะสำรองไฟล์ทั้งหมดให้คุณอัตโนมัติก่อนทำการล้างข้อมูลทั้งหมด"
                : "มีรายการที่ยังไม่เสร็จ กรุณาทำรายการให้ถึงขั้นตอนส่งหนังสือรายงานผล ถึงจะสามารถล้างข้อมูลได้"}
            </DialogContentText>
          )}
        </DialogContent>
        {backupType === "บันทึกข้อมูล" ? (
          <DialogActions
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            {countSelect()["ตรวจสอบ"] && (
              <CSVLink
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black"
                }}
                filename={`หนังสือตรวจสอบ บันทึกเมื่อ ${dayjs(
                  new Date()
                ).format(
                  "D MMM YYYY เวลา HH mm"
                )} น. (AR URU ${systemData}).csv`}
                data={forDownload()}
                asyncOnClick={true}
                onClick={() => onChangeDataDownload("ตรวจสอบ")}
              >
                <Button>
                  <AssignmentTurnedInOutlined style={{ marginRight: 6 }} />
                  หนังสือตรวจสอบ
                </Button>
              </CSVLink>
            )}
            {countSelect()["รายงานผล"] && (
              <CSVLink
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black"
                }}
                filename={`หนังสือรายงานผล บันทึกเมื่อ ${dayjs(
                  new Date()
                ).format(
                  "D MMM YYYY เวลา HH mm"
                )} น. (AR URU ${systemData}).csv`}
                data={forDownload()}
                asyncOnClick={true}
                onClick={() => onChangeDataDownload("รายงานผล")}
              >
                <Button>
                  <AssignmentReturnOutlined style={{ marginRight: 6 }} />
                  หนังสือรายงานผล
                </Button>
              </CSVLink>
            )}

            {countSelect()["ทั้งหมด"] && (
              <CSVLink
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black"
                }}
                filename={`หนังสือทั้งหมด บันทึกเมื่อ ${dayjs(
                  new Date()
                ).format(
                  "D MMM YYYY เวลา HH mm"
                )} น. (AR URU ${systemData}).csv`}
                data={forDownload()}
                asyncOnClick={true}
                onClick={() => onChangeDataDownload("ทั้งหมด")}
              >
                <Button>
                  <AssignmentOutlined style={{ marginRight: 6 }} />
                  หนังสือทั้งหมด
                </Button>
              </CSVLink>
            )}
          </DialogActions>
        ) : loading ? null : (
          <DialogActions
            style={{
              display: "flex",
              justifyContent: loading ? "center" : "flex-end"
            }}
          >
            {deleteAll ? (
              <Button
                onClick={loading ? null : () => onDeletePapers()}
                style={{ display: "flex", alignItems: "center" }}
                color="primary"
              >
                <DeleteForeverOutlined style={{ marginRight: 4 }} />
                ล้างข้อมูลทั้งหมด
              </Button>
            ) : (
              <Fragment>
                {checkPapersDone() ? (
                  <CSVLink
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "black"
                    }}
                    filename={`สำรองไฟล์หนังสือทั้งหมด บันทึกเมื่อ ${dayjs(
                      new Date()
                    ).format(
                      "D MMM YYYY เวลา HH mm"
                    )} น. (AR URU ${systemData}).csv`}
                    data={forDownload()}
                    asyncOnClick={true}
                    onClick={() => onDeleteData()}
                  >
                    <Button>
                      <AssignmentOutlined style={{ marginRight: 6 }} />
                      ตกลง
                    </Button>
                  </CSVLink>
                ) : null}

                <Button onClick={handleClose} color="primary">
                  กลับ
                </Button>
              </Fragment>
            )}
          </DialogActions>
        )}
      </Dialog>
    );
  };

  return rows.length > 0 ? (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {dialogBackup()}
      {papers && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
            onClick={() => OpenDialog("บันทึกข้อมูล")}
          >
            <Button>
              <MoveToInbox style={{ marginRight: 6 }} />
              บันทึกข้อมูล
            </Button>
          </div>

          {localStorage.getItem("userWork") === "ฝ่ายธุรการ" && (
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => OpenDialog("ล้างข้อมูล")}
            >
              <Button>
                <DeleteOutline style={{ marginRight: 2 }} />
                ล้างข้อมูล
              </Button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Button>
              {swiftIconBook()}
              <Select onChange={e => selectChange(e)} value={docType} id="">
                {["ทั้งหมด", "ตรวจสอบ", "รายงานผล"].map((res, i) => {
                  return (
                    countSelect()[res] && (
                      <option key={i} value={res}>
                        หนังสือ{res} ({countSelect()[res]})
                      </option>
                    )
                  );
                })}
              </Select>
            </Button>
          </div>
        </div>
      )}

      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns().map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#EAEDF9"
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.paperId}
                  >
                    {columns().map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  ) : (
    <WrapNodata>
      <NoListData page={"ภาพรวม"} />
    </WrapNodata>
  );
}

const WrapNodata = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 22px;
  font-size: 22px;
`;

const Select = styled.select`
  font-family: "Kanit", sans-serif;
  outline: none;
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

export default ViewAll;
