import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import PaperContext from "../context/PaperContext";
import { SHOW_ADD_PAPER } from "../context/reducers";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  AccountBox,
  CheckBox,
  IndeterminateCheckBox,
  InsertChartOutlined,
  ExitToApp,
  Unarchive,
  Refresh,
  CardGiftcard
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    zIndex: 1,
    width: "100%",
    height: "100vh",
    position: "relative"
  },
  Typo: {
    display: "flex",
    alignItems: "center"
  },
  RefreshType: {
    display: "flex",
    alignItems: "center",
    // marginLeft: 60,
    color: "#78909c",
    cursor: "pointer"
    // marginRight: 60
  },
  menuTab: {
    marginLeft: 10,
    color: "#263238"
  },
  Link: {
    color: "#607d8b"
  }
}));

function MiniDrawer(props) {
  const [imgBG, setImgBG] = useState(null);
  const [openDialog, setopenDialog] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [RefreshLoading, setRefreshLoading] = useState(false);
  const Context = useContext(PaperContext);
  const [openCredit, setOpenCredit] = useState(false);
  const { getData, dispatch } = Context;
  const onRefresh = () => {
    getData();
    setRefreshLoading(true);
    setTimeout(() => {
      setRefreshLoading(false);
    }, 1000);
  };
  const handleClose = () => {
    setopenDialog(false);
  };

  useEffect(() => {
    setImgBG(bgImage[Math.floor(Math.random() * 10)]);
  }, []);

  const showAddPaperFunc = text => {
    if (text === "รอตรวจสอบ") {
      return dispatch({ type: SHOW_ADD_PAPER, payload: true });
    } else {
      return dispatch({ type: SHOW_ADD_PAPER, payload: false });
    }
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("FBIdToken");
      localStorage.removeItem("userWork");
      delete axios.defaults.headers.common;
      props.history.push("/");
      document.location.reload();
    }, 650);
  };

  const creditText = () => (
    <Dialog
      open={openCredit}
      onClose={() => setOpenCredit(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardGiftcard fontSize="large" style={{ marginRight: 4 }} />
          <span>Credit</span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
          id="alert-dialog-description"
        >
          <span>AR URU version 1.0.0 beta (1 Nov - 1 Dec 2019).</span>
          <span>By student in Computer Science (URU).</span>
          <span>
            Stack is Firestore, Cloud Function, ExpressJS, ReactJS, NodeJS.
          </span>
          <span>
            Background Images by Gift of Light (Photographer)
          </span>
          <span>
            Tell 062-851-7990 when problems occur until the beta is closed.
          </span>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );

  const AlertText = () => (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ExitToApp fontSize="large" style={{ marginRight: 4 }} />
          <span>ออกจากระบบ</span>
        </div>
      </DialogTitle>
      <DialogContent>
        {loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 24
            }}
          >
            <CircularProgress />
          </div>
        )}
        <DialogContentText
          style={{ display: "flex", justifyContent: "center" }}
          id="alert-dialog-description"
        >
          {loading ? "กำลังออกจากระบบ" : "คุณต้องการออกจากระบบหรือไม่?"}
        </DialogContentText>
      </DialogContent>
      {loading ? null : (
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => logout()} color="primary">
            ออกจากระบบ
          </Button>
          <Button onClick={handleClose} color="primary">
            กลับ
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );

  return (
    <div className={classes.root}>
      {AlertText()}
      {creditText()}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              className={classes.Typo}
              variant="h6"
              noWrap
              color="inherit"
              component={Link}
              to="/"
            >
              <ARtext>AR</ARtext>
              <URUText>
                URU <span style={{ fontSize: 14 }}>BETA</span>
              </URUText>

              <Duty>{localStorage.getItem("userWork")}</Duty>
            </Typography>
          </div>
          <Typography
            className={classes.RefreshType}
            variant="h6"
            noWrap
            color="inherit"
            onClick={onRefresh}
          >
            {RefreshLoading ? (
              <CircularProgress
                style={{ marginLeft: 4 }}
                color="secondary"
                size={20}
              />
            ) : (
              <Refresh />
            )}

            <span style={{ marginLeft: 4 }}>รีเฟรช</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              onClick={() => dispatch({ type: SHOW_ADD_PAPER, payload: false })}
              className={classes.Link}
              to="ดูภาพรวม"
            >
              <Button color="secondary">
                <InsertChartOutlined fontSize="large" />
                <span style={{ marginLeft: 3 }}>ดูภาพรวม</span>
              </Button>
            </Link>

            <Button onClick={() => setOpenCredit(true)} color="secondary">
              <CardGiftcard fontSize="large" />
              <span style={{ marginLeft: 3 }}>เครดิต</span>
            </Button>
            <Button color="secondary" onClick={() => setopenDialog(true)}>
              <ExitToApp fontSize="large" />
              <span style={{ marginLeft: 3 }}>ออกจากระบบ</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <h2 className={classes.menuTab}>แถบเมนู</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["รอตรวจสอบ", "รอการยืนยัน", "รอส่งรายงานผล", "เรียบร้อยแล้ว"].map(
            (text, index) => (
              <Link
                onClick={() => showAddPaperFunc(text)}
                key={text}
                className={classes.Link}
                to={`/${text}`}
              >
                <ListItem button>
                  {index === 0 && (
                    <ListItemIcon>
                      <AccountBox fontSize="large" />
                    </ListItemIcon>
                  )}
                  {index === 1 && (
                    <ListItemIcon>
                      <IndeterminateCheckBox fontSize="large" />
                    </ListItemIcon>
                  )}
                  {index === 2 && (
                    <ListItemIcon>
                      <Unarchive fontSize="large" />
                    </ListItemIcon>
                  )}
                  {index === 3 && (
                    <ListItemIcon>
                      <CheckBox fontSize="large" />
                    </ListItemIcon>
                  )}

                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bottom: "0px",
            paddingTop: "64px",
            overflowY: "scroll"
          }}
        >
          {props.children}
        </div>
      </main>
      <BgURU src={imgBG}></BgURU>
    </div>
  );
}

const bgImage = [
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/42773417_1379644815501741_2808171809944371200_o.jpg?_nc_cat=111&_nc_oc=AQnitcW4seT27iwAoUyxJpqTC7vyAYK8i29YI1LjaPEwqGgyk1q0Ydl47gSCiN4_ROo&_nc_ht=scontent.fphs1-1.fna&oh=b298432b828b22950f4e9d3cea9e7aad&oe=5E285E4C",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/70110843_1638605739605646_3520005408817152000_o.jpg?_nc_cat=111&_nc_oc=AQnmgVHMNFszbNfWRuEoyPF4j-8rv_MAVEzDaRF7YC5bgPhPsCQ0zqCsgM49q0y1QAo&_nc_ht=scontent.fphs1-1.fna&oh=b721043c788962ba193b8a4599e6e8b8&oe=5E32C170",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/69643715_1635905576542329_3160147154400444416_o.jpg?_nc_cat=111&_nc_oc=AQl4wOrGOAz7WODSYx9VxrRd45-lrc27Vop_32Kz2YKFlEnZvQPxmvxqj6zVBEGykI0&_nc_ht=scontent.fphs1-1.fna&oh=ac31dfa51c2db575ebb8b24918a8a883&oe=5E309019",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/70013350_1638603919605828_4276812808542224384_o.jpg?_nc_cat=104&_nc_oc=AQna3qWaueyF1OQsnHSStJe7XRZsF4YtR0yVHCK0eCjm81J-ItL_KtVwS3HMTh5o1IE&_nc_ht=scontent.fphs1-1.fna&oh=b80b8fbe3a42f566190f0972843c665e&oe=5E19111B",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/70514155_1638597222939831_7770952399589474304_o.jpg?_nc_cat=106&_nc_oc=AQkUr6MAGkl4-LFnY0QBhD_mWpe72hZwqonD_y6_rs3tVDhX0M1-rlfAxClCMceipZM&_nc_ht=scontent.fphs1-1.fna&oh=fab3b445a697a8a57c21056b1a138b63&oe=5E5F34B8",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/61131729_1549645691834985_5825242870591782912_o.jpg?_nc_cat=108&_nc_oc=AQkvYSlAl3PW0B-f04myTsPH5-E5o1VMCyaD3UAyvzsg1bUoFmz41ZYO7jCgPVEyOhY&_nc_ht=scontent.fphs1-1.fna&oh=a37b54368f80a5c6b80b6f78f9799fd3&oe=5E62FDC0",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/70630765_1638599456272941_8127382827722342400_o.jpg?_nc_cat=108&_nc_oc=AQn-T3ujg0huybyZ8iSCFMW88St0n3a9SBz62ZLrQJuG1PsYFe4-5R_dqtEFTTbkOGw&_nc_ht=scontent.fphs1-1.fna&oh=2970fc2592431d819a5390763ec350d1&oe=5E339FBA",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/70041153_1638605982938955_8837166756532322304_o.jpg?_nc_cat=101&_nc_oc=AQkeuB5rKPTmcWicJz6BraaoctHh6PBECJ2QzNo7DpmNJV6MAv9X38ODfwSTbUNpnDc&_nc_ht=scontent.fphs1-1.fna&oh=bac63bbc8ae27ce734e5d0961528df10&oe=5E2AAA4D",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t31.0-8/29983715_1233264850139739_4002909372321885458_o.jpg?_nc_cat=109&_nc_oc=AQnZL_HsWCtlmff7O27VdqMtbU3XlzloJoJBfb6QehE5Q6irDFi8dkjkh7m1kATfAeY&_nc_ht=scontent.fphs1-1.fna&oh=a21b97d6e6b22f17d240a4c4e1cc6325&oe=5E261263",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/61176732_1549641575168730_3623467129413566464_o.jpg?_nc_cat=110&_nc_eui2=AeGv5BdyCR4ag84pVlO82DOr-nd47BdL4Rbp_rYFMwpjP0MpZW9_ci3_av7iEYx-uppDqY0PJ1qjwOU_A_LKOZVdGM72uNMKl5RpZGLM0yvyzg&_nc_oc=AQmue6_KKCNgzm3fC37YKO52E4ftwmmRAXbZVTz8khQlt3EKeqtuc9ksrKjPhRwvlCg&_nc_ht=scontent.fphs1-1.fna&oh=4964750cb36e7b7269a12ba2a6a7cd3e&oe=5E34F749"
];
const BgURU = styled.div`
  position: absolute;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  z-index: 0;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
`;
const ARtext = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin-right: 6px;
  color: #618b9f;
`;

const URUText = styled.span`
  font-size: 24px;
  color: #618b9f;
  margin-top: 3px;
`;
const Duty = styled.div`
  margin-left: 18px;
`;

export default withRouter(MiniDrawer);
