import React, { useState, useContext, Fragment } from "react";
import PaperContext from "../context/PaperContext";
import styled from "styled-components";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import dayjs from "dayjs";
import {
  EDIT_PAPER,
  VERIFY_SHOW,
  GET_VERIFYID,
  GET_VERIFYNO,
  EVENT_CHANGE,
  SENT_SHOW,
  SENT_REF,
  GET_SENT_ID,
  EDIT_PAPER_REGIS,
  SHOW_VERIFIED,
  FROM_VERIFIED
} from "../context/reducers";
import DatabaseDetailBox from "../util/DatabaseDetailBox";

import relativeTime from "dayjs/plugin/relativeTime";
import {
  Contacts,
  MenuBook,
  Send,
  DateRange,
  Room,
  Explore,
  Assessment,
  AccessTime,
  AccountBox,
  FeaturedPlayList,
  AccountBalance,
  AssistantPhoto,
  BusinessCenter,
  Class,
  Cake,
  Storage,
  SpeakerNotes,
  LocalLibrary,
  LocalOffer,
  School,
  Search,
  HourglassEmpty,
  SwapHoriz,
  PlaylistAddCheck,
  DeleteSweepOutlined,
  EditOutlined,
  DataUsage,
  LocationSearching,
  ErrorOutline,
  ReplyAll,
  PermIdentity,
  Comment,
  CheckCircleOutline,
  AssignmentTurnedIn
} from "@material-ui/icons";
import "dayjs/locale/th";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function Paper({ data, status }) {
  const Context = useContext(PaperContext);
  const { getData, dispatch, showVerified } = Context;
  const [openDialog, setopenDialog] = React.useState(false);
  dayjs.extend(relativeTime);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [openDialogDB, setOpenDialogDB] = useState(false);

  const handleCloseDB = () => {
    setOpenDialogDB(false);
  };

  const {
    paperId,
    paperNo,
    paperRef,
    sentNo,
    endorser,
    dateAt,
    agencyName,
    provice,
    district,
    topic,
    send,
    sentDate,
    checkedAt,
    createdAt,
    verifyDate,
    studentName,
    studentId,
    faculty,
    educational,
    major,
    birthDate,
    gradDate,
    agencyType,
    reason,
    result,
    grade,
    verifyNote
  } = data;

  const styles = {
    GridStyle: {
      marginRight: 16
    },
    topicText: {
      marginLeft: 6,
      marginRight: 6
    },
    makeBy: {
      display: "flex",
      alignItems: "center",
      marginLeft: 6,
      marginBottom: 6,
      marginRight: 6
    },
    footerCSS: {
      display: "flex",
      alignItems: "center",
      marginTop: 8,
      paddingLeft: 6
    },
    AICenter: {
      display: "flex",
      alignItems: "center"
    }
  };
  const { GridStyle, topicText, makeBy, footerCSS, AICenter } = styles;

  const handleClose = () => {
    setopenDialog(false);
    setTimeout(() => {
      setSubmit(false);
    }, 600);
  };

  const confirmSubmit = () => {
    setopenDialog(false);
    setSubmitLoading(true);
    axios.put(`/check/${paperId}`).then(res => {
      dispatch({ type: EVENT_CHANGE });
    });
  };

  const onSentPaper = () => {
    dispatch({ type: SENT_SHOW, payload: true });
    dispatch({ type: SENT_REF, payload: paperNo });
    dispatch({ type: GET_SENT_ID, payload: paperId });
  };

  const onSubmitPaper = () => {
    setSubmit(true);
    setopenDialog(true);
  };

  const ByAt = () => {
    switch (status) {
      case "handle":
        return (
          <SCreatedAt>
            <Search fontSize="large"></Search>
            <span style={{ marginLeft: 2, marginRight: 8 }}>
              รอการตรวจสอบจากฝ่ายทะเบียน
            </span>
            <AccessTime style={{ marginRight: 4, marginLeft: 8 }} />
            เพิ่มเมื่อวันที่ {dayjs(createdAt).format("D MMM YYYY")} (
            {dayjs(createdAt).fromNow()})
          </SCreatedAt>
        );

      case "verified":
        return (
          <SCreatedAt>
            <HourglassEmpty fontSize="large"></HourglassEmpty>
            <span style={{ marginLeft: 2, marginRight: 8 }}>
              รอการยืนยันจากฝ่ายธุระการ
            </span>
            <AccessTime style={{ marginRight: 4, marginLeft: 8 }} />
            ตรวจสอบเมื่อวันที่ {dayjs(verifyDate).format("D MMM YYYY")} (
            {dayjs(verifyDate).fromNow()})
          </SCreatedAt>
        );

      case "checked":
        return (
          <SCreatedAt>
            <SwapHoriz fontSize="large"></SwapHoriz>
            <span style={{ marginLeft: 2, marginRight: 8 }}>
              รอส่งรายงานผลจากฝ่ายธุรการ
            </span>
            <AccessTime style={{ marginRight: 4, marginLeft: 8 }} />
            ยืนยันเมื่อวันที่ {dayjs(checkedAt).format("D MMM YYYY")} (
            {dayjs(checkedAt).fromNow()})
          </SCreatedAt>
        );

      case "finish":
        return (
          <SCreatedAt>
            <PlaylistAddCheck fontSize="large"></PlaylistAddCheck>
            <span style={{ marginLeft: 2, marginRight: 10 }}>
              ส่งรายหนังสืองานผลแล้วโดยฝ่ายธุรการ
            </span>
            <SwapHoriz fontSize="large"></SwapHoriz>
            <span style={{ marginLeft: 2, marginRight: 8 }}>
              หนังสือรายงานผลเลขที่ {sentNo}
            </span>
            <AccessTime style={{ marginRight: 2, marginLeft: 8 }} />
            ส่งเมื่อวันที่ {dayjs(sentDate).format("D MMM YYYY")}
            <PermIdentity style={{ marginRight: 4, marginLeft: 10 }} />
            ผู้ลงนาม {endorser}
          </SCreatedAt>
        );
      default:
        break;
    }
  };

  const dialogDetailDB = () => (
    <Dialog
      open={openDialogDB}
      onClose={handleCloseDB}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ErrorOutline fontSize="large" style={{ marginRight: 4 }} />
          <span>กรณีไขข้อมูลใน Database</span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          component="span"
          style={{ display: "flex", justifyContent: "center" }}
          id="alert-dialog-description"
        >
          <div style={{ width: "100vh" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <span>หนังสือรายงานผล : {paperId}</span>
              <span>หนังสือตรวจสอบ : {paperRef}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 22,
                alignItems: "center"
              }}
            >
              <Storage style={{ marginRight: 4 }} />
              <span>รายชื่อข้อมูลพร้อมคำแปลในฐานข้อมูล</span>
            </div>

            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 12
              }}
            >
              <DatabaseDetailBox icon={<Send />} detail={"agencyName : จาก"} />
              <DatabaseDetailBox
                icon={<BusinessCenter />}
                detail={"agencyType : ประเภทหน่วยงาน"}
              />
              <DatabaseDetailBox
                icon={<Cake />}
                detail={"birthDate : วันเกิด"}
              />

              <DatabaseDetailBox
                icon={<DateRange />}
                detail={"dateAt : ลงวันที่"}
              />
              <DatabaseDetailBox
                icon={<Explore />}
                detail={"district : อำเภอ/เขต"}
              />
              <DatabaseDetailBox
                icon={<Class />}
                detail={"educational : วุฒิ"}
              />
              <DatabaseDetailBox
                icon={<Class />}
                detail={"endorser : ผู้ลงนาม"}
              />

              <DatabaseDetailBox
                icon={<AccountBalance />}
                detail={"faculty : คณะ"}
              />
              <DatabaseDetailBox
                icon={<School />}
                detail={"gradDate : วันที่จบการศึกษา"}
              />
              <DatabaseDetailBox
                icon={<LocalOffer />}
                detail={"grade : เกรดเฉลี่ย"}
              />
              <DatabaseDetailBox
                icon={<LocalLibrary />}
                detail={"major : สาขา"}
              />
              <DatabaseDetailBox
                icon={<Contacts />}
                detail={"paperNo : เลขที่หนังสือตรวจสอบ"}
              />
              <DatabaseDetailBox icon={<Room />} detail={"provice : จังหวัด"} />

              <DatabaseDetailBox
                icon={<SpeakerNotes />}
                detail={"reason : เหตุผลที่ตรวจสอบ"}
              />

              <DatabaseDetailBox
                icon={<AssistantPhoto />}
                detail={"result : ผลการตรวจสอบ"}
              />
              <DatabaseDetailBox
                icon={<AccessTime />}
                detail={"sentDate : วันที่ส่งรายงานผล"}
              />
              <DatabaseDetailBox
                icon={<SwapHoriz />}
                detail={"sentNo : เลขที่หนังสือรายงานผล"}
              />
              <DatabaseDetailBox
                icon={<FeaturedPlayList />}
                detail={"studentId : รหัสนักศึกษา"}
              />

              <DatabaseDetailBox
                icon={<AccountBox />}
                detail={"studentName : ชื่อ-นามสกุล"}
              />

              <DatabaseDetailBox
                icon={<FeaturedPlayList />}
                detail={"topic : เรื่อง"}
              />
              <DatabaseDetailBox
                icon={<Comment />}
                detail={"verifyNote : หมายเหตุ"}
              />
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 22
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <span>กรุณาอย่าแก้ไขข้อมูลนอกเหนือจากข้อมูลด้านบน</span>
                <span> เพราะอาจทำให้เกิดความผิดพลาดภายในระบบได้</span>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );

  const onDetailEdit = () => {
    setOpenDialogDB(true);
  };

  // detail icon and data in footer
  const makeDetail = () => {
    return (
      <Grid container style={footerCSS}>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <AccountBox style={{ marginRight: 6 }} />
          คุณ {studentName}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <FeaturedPlayList style={{ marginRight: 6 }} />
          รหัส {studentId}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <AccountBalance style={{ marginRight: 6 }} />
          คณะ {faculty}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <Class style={{ marginRight: 6 }} />
          วุฒิ {educational}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <LocalLibrary style={{ marginRight: 6 }} />
          สาขา {major}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <Cake style={{ marginRight: 6 }} />
          วันเกิด {dayjs(birthDate).format("D MMM YYYY")}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <School style={{ marginRight: 6 }} />
          จบการศึกษา {dayjs(gradDate).format("D MMM YYYY")}
        </Grid>

        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <LocalOffer style={{ marginRight: 6 }} />
          เกรดเฉลี่ย {grade}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <BusinessCenter style={{ marginRight: 6 }} />
          หน่วยงาน : {agencyType}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <SpeakerNotes style={{ marginRight: 6 }} />
          เหตุผลที่ตรวจสอบ : {reason}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <AssistantPhoto style={{ marginRight: 6 }} />
          ผลการตรวจสอบ : {result}
        </Grid>
        <Grid item xs={6} sm={4} md={3} xl={2} style={AICenter}>
          <Comment style={{ marginRight: 6 }} />
          หมายเหตุ {verifyNote}
        </Grid>
      </Grid>
    );
  };

  const onVerify = () => {
    dispatch({ type: VERIFY_SHOW, payload: true });
    dispatch({ type: GET_VERIFYNO, payload: paperNo });
    dispatch({ type: GET_VERIFYID, payload: paperId });
  };

  const footerDetail = () => {
    switch (status) {
      case "handle":
        return (
          <div style={footerCSS}>
            <Assessment style={{ marginRight: 6 }} />
            <i>รอการเพิ่มข้อมูลจากฝ่ายทะเบียน</i>
          </div>
        );

      case "verified":
        return makeDetail();

      case "checked":
        return makeDetail();

      case "finish":
        return makeDetail();
      default:
        break;
    }
  };

  const confirmDelete = () => {
    setLoading(true);
    setopenDialog(false);
    axios.delete(`delete/${paperId}`).then(() => getData());
  };

  const deleteDialog = () => (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ErrorOutline fontSize="large" style={{ marginRight: 4 }} />
          <span>{submit ? "ยืนยันหนังสือ" : "ลบหนังสือตรวจสอบ"}</span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ display: "flex", justifyContent: "center" }}
          id="alert-dialog-description"
        >
          {submit
            ? "คุณต้องการยืนยันหนังสือจากฝ่ายทะเบียนหรือไม่?"
            : "คุณต้องการลบหนังสือตรวจสอบหรือไม่?"}
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={submit ? confirmSubmit : confirmDelete}
          color="primary"
        >
          {submit ? "ยืนยันหนังสือ" : "ลบหนังสือ"}
        </Button>
        <Button onClick={handleClose} color="primary">
          กลับ
        </Button>
      </DialogActions>
    </Dialog>
  );

  const alertVerify = () => (
    <Dialog
      open={showVerified}
      onClose={() => dispatch({ type: SHOW_VERIFIED, payload: false })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <AssignmentTurnedIn fontSize="large" style={{ marginRight: 4 }} />
          <span style={{ marginTop: 12 }}>ตรวจสอบเสร็จสิ้น</span>
        </div>
      </DialogTitle>
    </Dialog>
  );

  const onEditPaper = () => {
    dispatch({
      type: EDIT_PAPER,
      payload: {
        paperId,
        paperNo,
        dateAt,
        agencyName,
        provice,
        district,
        topic
      }
    });
  };

  const onEditPaperRegis = () => {
    dispatch({
      type: EDIT_PAPER_REGIS,
      payload: {
        faculty,
        educational,
        major,
        studentId,
        studentName,
        birthDate,
        gradDate,
        grade,
        agencyType,
        reason,
        result,
        verifyNote
      }
    });
    dispatch({ type: VERIFY_SHOW, payload: true });
    dispatch({ type: GET_VERIFYNO, payload: paperNo });
    dispatch({ type: GET_VERIFYID, payload: paperId });
    dispatch({ type: FROM_VERIFIED, payload: true });
  };

  return (
    <WrapContent className="paperAnimte">
      {dialogDetailDB()}
      {deleteDialog()}
      {alertVerify()}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative"
        }}
      >
        <div style={makeBy}>{ByAt()}</div>

        <div
          style={{
            marginBottom: 6,
            height: 35,
            display: "flex",
            alignItems: "center",
            paddingRight: 12
          }}
        >
          {/* Handle */}
          {localStorage.getItem("userWork") === "ฝ่ายธุรการ" &&
            status === "handle" && (
              <Fragment>
                <Button onClick={onEditPaper} style={{ marginRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EditOutlined fontSize="large" />
                    <span style={{ fontSize: 16, marginLeft: 1 }}>แก้ไข</span>
                  </div>
                </Button>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 9,
                      marginRight: 44,
                      marginLeft: 44
                    }}
                  >
                    <CircularProgress size={30} />
                  </div>
                ) : (
                  <Button onClick={() => setopenDialog(true)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <DeleteSweepOutlined fontSize="large" />
                      <span style={{ fontSize: 16, marginLeft: 2 }}>
                        ลบหนังสือ
                      </span>
                    </div>
                  </Button>
                )}
              </Fragment>
            )}

          {localStorage.getItem("userWork") === "ฝ่ายทะเบียน" &&
            status === "handle" && (
              <Fragment>
                <Button onClick={onVerify} style={{ marginRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LocationSearching fontSize="large" />
                    <span style={{ fontSize: 16, marginLeft: 4 }}>ตรวจสอบ</span>
                  </div>
                </Button>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 9,
                      marginRight: 44,
                      marginLeft: 44
                    }}
                  >
                    <CircularProgress size={30} />
                  </div>
                ) : (
                  <Button
                    onClick={() => setopenDialog(true)}
                    style={{ marginLeft: 12 }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleOutline fontSize="large" />
                      <span style={{ fontSize: 16, marginLeft: 4 }}>
                        เสร็จสิ้น
                      </span>
                    </div>
                  </Button>
                )}
              </Fragment>
            )}
          {/* /Handle*/}

          {/* Verified */}
          {localStorage.getItem("userWork") === "ฝ่ายธุรการ" &&
            status === "verified" && (
              <Fragment>
                <Button onClick={onEditPaper} style={{ marginRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EditOutlined fontSize="large" />
                    <span style={{ fontSize: 16, marginLeft: 1 }}>แก้ไข</span>
                  </div>
                </Button>
                {submitLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 9,
                      marginRight: 37,
                      marginLeft: 27
                    }}
                  >
                    <CircularProgress size={30} />
                  </div>
                ) : (
                  <Button onClick={onSubmitPaper}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <DataUsage fontSize="large" />
                      <span style={{ fontSize: 16, marginLeft: 4 }}>
                        ยืนยัน
                      </span>
                    </div>
                  </Button>
                )}
              </Fragment>
            )}

          {localStorage.getItem("userWork") === "ฝ่ายทะเบียน" &&
            status === "verified" && (
              <Button onClick={onEditPaperRegis} style={{ marginRight: 12 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <EditOutlined fontSize="large" />
                  <span style={{ fontSize: 16, marginLeft: 1 }}>แก้ไข</span>
                </div>
              </Button>
            )}
          {/* /Verified*/}

          {/* checked */}
          {localStorage.getItem("userWork") === "ฝ่ายธุรการ" &&
            status === "checked" && (
              <Fragment>
                <Button onClick={onEditPaper} style={{ marginRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EditOutlined fontSize="large" />
                    <span style={{ fontSize: 16, marginLeft: 1 }}>แก้ไข</span>
                  </div>
                </Button>
                {submitLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 9,
                      marginRight: 37,
                      marginLeft: 27
                    }}
                  >
                    <CircularProgress size={30} />
                  </div>
                ) : (
                  <Button onClick={onSentPaper}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ReplyAll fontSize="large" />
                      <span style={{ fontSize: 16, marginLeft: 4 }}>
                        รายงานผล
                      </span>
                    </div>
                  </Button>
                )}
              </Fragment>
            )}

          {localStorage.getItem("userWork") === "ฝ่ายทะเบียน" &&
            status === "checked" && (
              <Button onClick={onEditPaperRegis} style={{ marginRight: 12 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <EditOutlined fontSize="large" />
                  <span style={{ fontSize: 16, marginLeft: 1 }}>แก้ไข</span>
                </div>
              </Button>
            )}
          {/* /checked*/}

          {/* finish */}
          {(localStorage.getItem("userWork") === "ฝ่ายธุรการ" ||
            localStorage.getItem("userWork") === "ฝ่ายทะเบียน") &&
            status === "finish" && (
              <Fragment>
                <Button onClick={onDetailEdit} style={{ marginRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EditOutlined fontSize="large" />
                    <span style={{ fontSize: 16, marginLeft: 1 }}>
                      สำหรับการแก้ไข
                    </span>
                  </div>
                </Button>
              </Fragment>
            )}

          {/* /finish*/}
        </div>
      </div>

      <WrapBg>
        <Grid style={GridStyle} item xs={6}>
          <TextNo>
            <Contacts />
            <span style={topicText}>
              {send ? "อ้างถึง หนังสือเลขที่" : "เลขที่หนังสือ"}
            </span>
            {paperNo}
          </TextNo>
          <TextNo STopic>
            <MenuBook /> <span style={topicText}>เรื่อง</span>
            {topic}
          </TextNo>
        </Grid>
        <Grid style={GridStyle} item xs={6}>
          <TextNo SGeneral>
            <Send /> <span style={topicText}>จาก</span>
            {agencyName}
          </TextNo>

          <TextNo SGeneral>
            <DateRange /> <span style={topicText}>{send ? "ลง" : "เมื่อ"}</span>
            วันที่ {dayjs(dateAt).format("D MMMM YYYY")}
          </TextNo>
        </Grid>
        <Grid item xs={2}>
          <TextNo SGeneral>
            <Room /> <span style={topicText}>จังหวัด</span>
            {provice}
          </TextNo>
          <TextNo SGeneral>
            <Explore></Explore> <span style={topicText}>อำเภอ/เขต</span>
            {district}
          </TextNo>
        </Grid>
      </WrapBg>

      {footerDetail()}
    </WrapContent>
  );
}

const WrapContent = styled.div`
  margin-bottom: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 12px 0;
`;

const SCreatedAt = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const TextNo = styled.div`
  display: flex;
  align-content: center;
  font-size: 19px;
  margin: 6px 0;
`;
const WrapBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: rgba(0, 0, 0, 0.15);
  padding: 18px 16px;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  transition: 0.125s;
`;

export default Paper;
