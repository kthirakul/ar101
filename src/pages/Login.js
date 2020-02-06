import React, { useState, useEffect } from "react";

//Mui
import axios from "axios";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Assignment, AssignmentInd, VpnKey, Forward } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const bgImage = [
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/60899183_1550659528400268_7843323530534977536_o.jpg?_nc_cat=109&_nc_oc=AQkuAMX2Co9wA6V4Gb95jnp2Bv5lmPtpADSUf_DKVhrVr5wkdOLcWqjH3jzp5EdVsXE&_nc_ht=scontent.fphs1-1.fna&oh=81f0075d292f9e9604f53e20fd557ba7&oe=5E60F321",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/70110843_1638605739605646_3520005408817152000_o.jpg?_nc_cat=111&_nc_oc=AQnmgVHMNFszbNfWRuEoyPF4j-8rv_MAVEzDaRF7YC5bgPhPsCQ0zqCsgM49q0y1QAo&_nc_ht=scontent.fphs1-1.fna&oh=b721043c788962ba193b8a4599e6e8b8&oe=5E32C170",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/69643715_1635905576542329_3160147154400444416_o.jpg?_nc_cat=111&_nc_oc=AQl4wOrGOAz7WODSYx9VxrRd45-lrc27Vop_32Kz2YKFlEnZvQPxmvxqj6zVBEGykI0&_nc_ht=scontent.fphs1-1.fna&oh=ac31dfa51c2db575ebb8b24918a8a883&oe=5E309019",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/65008954_1573248766141344_7518377570618834944_o.jpg?_nc_cat=109&_nc_oc=AQn8uWPK4oB01a8tlYvBFBAhZF2Kr3FIZXO_L8h4rLCGeRZRCE2VdgbL7GFhTisVJM8&_nc_ht=scontent.fphs1-1.fna&oh=aad004589b0d02c3ee23600ab106c659&oe=5E63A8F9",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/64493121_1573248206141400_65891846361972736_o.jpg?_nc_cat=108&_nc_oc=AQmqghvlTICIMSGnmsdUqIijtg6dmZRWATtcIH_1BO_p4bPdS8MnSBcQssvd_mGLlGY&_nc_ht=scontent.fphs1-1.fna&oh=a3df8106b369db17eb7b71c837996bfb&oe=5E1B9940",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/61131729_1549645691834985_5825242870591782912_o.jpg?_nc_cat=108&_nc_oc=AQkvYSlAl3PW0B-f04myTsPH5-E5o1VMCyaD3UAyvzsg1bUoFmz41ZYO7jCgPVEyOhY&_nc_ht=scontent.fphs1-1.fna&oh=a37b54368f80a5c6b80b6f78f9799fd3&oe=5E62FDC0",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/53921484_1498447456954809_731294319029256192_o.jpg?_nc_cat=111&_nc_oc=AQloV0xw2mp-mySFgTz_k6YOGtSG05EuEIZ23QljNw84pXJKsd7IwYFWrXi5cRaXV50&_nc_ht=scontent.fphs1-1.fna&oh=23bf2fc40a894ba6b7dea7b9508bca4c&oe=5E2E7802",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t1.0-9/42754166_1379644688835087_9020670161966858240_o.jpg?_nc_cat=110&_nc_oc=AQlUqP5z69eCx20izB9eEBQ0XT1Mh_lKfea2FLScCub7I7889s9RLkx8Oh3azi-Iir4&_nc_ht=scontent.fphs1-1.fna&oh=281152ef94426978b262a3e3629665fa&oe=5E229E22",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t31.0-8/29983715_1233264850139739_4002909372321885458_o.jpg?_nc_cat=109&_nc_oc=AQnZL_HsWCtlmff7O27VdqMtbU3XlzloJoJBfb6QehE5Q6irDFi8dkjkh7m1kATfAeY&_nc_ht=scontent.fphs1-1.fna&oh=a21b97d6e6b22f17d240a4c4e1cc6325&oe=5E261263",
  "https://scontent.fphs1-1.fna.fbcdn.net/v/t31.0-8/30073516_1233261373473420_6285207779962045581_o.jpg?_nc_cat=102&_nc_oc=AQlSjb1B4pxHPThsQuEtlXK2LMoNrD39cX51OrHXTw_n4gUB4_7K0QX5pe0Q7XPSZ7I&_nc_ht=scontent.fphs1-1.fna&oh=9933c0c9ea8ecc902b3af1871fd83817&oe=5E1F3708"
];

function Login() {
  const [pass, setPass] = useState({
    admin: false,
    regis: false,
    username: null,
    password: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setErrors(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [imgBG, setImgBG] = useState(null);

  useEffect(() => {
    setImgBG(bgImage[Math.floor(Math.random() * 10)]);
  }, []);

  const styles = {
    textDep: {
      fontSize: 32,
      marginTop: 12
    },
    buttonRd: {
      height: 300,
      width: 300,
      borderRadius: "100%"
    },
    wrapPassUi: {
      color: "white",
      display: "flex",
      alignItems: "center",
      marginTop: 32
    }
  };

  const { textDep, buttonRd, wrapPassUi } = styles;

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  const onPassword = event => {
    if (event === "admin") {
      setPass({ admin: true, regis: false, username: "administration" });
    } else {
      setPass({
        admin: false,
        regis: true,
        username: "registration"
      });
    }
  };

  const onChangePass = e => {
    e.preventDefault();
    setPass({ ...pass, password: e.target.value });
  };

  const makePassUI = () => {
    return loading ? (
      <CircularProgress color="secondary" className={classes.progress} />
    ) : (
      <div style={wrapPassUi}>
        <VpnKey fontSize="large" />
        <form noValidate onSubmit={e => onSubmit(e)}>
          <InputPass
            autoComplete="off"
            type="password"
            value={pass.password || ""}
            onChange={onChangePass}
            placeholder="กรุณาใส่รหัสผ่าน"
          />
        </form>

        <Forward
          onClick={() => onSubmit()}
          fontSize="large"
          style={{ marginLeft: 6, cursor: "pointer" }}
        ></Forward>
      </div>
    );
  };

  const AlertText = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"รหัสผ่านให้ถูกต้อง"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          รหัสผ่านผิดพลาด กรุณาใส่รหัสผ่านให้ถูกต้อง
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          ตกลง
        </Button>
      </DialogActions>
    </Dialog>
  );

  const onSubmit = e => {
    if (e) e.preventDefault();
    setLoading(true);
    const userData = {
      email: `${pass.username}@uru.com`,
      password: pass.password
    };
    axios
      .post("/login", userData)
      .then(res => {
        // const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem("FBIdToken", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        localStorage.setItem("userWork", `${res.data.userwork}`);
        setPass({ ...pass, admin: false, regis: false });
        setLoading(false);
        window.location.href = "/";
        // document.location.reload();
      })
      .catch(err => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  if (errors) handleClickOpen();
  return (
    <div>
      {AlertText()}
      <WrapHeader>
        <div className="LoginLogo">
          <img src="/logouru.png" alt="" width="100" />
          <div style={{ color: "white", marginLeft: 12 }} className="LoginText">
            <div style={{ fontSize: 50 }}>AR URU</div>
            <span>มหาวิทยาลัยราชภัฏอุตรดิตถ์</span>
          </div>
        </div>
      </WrapHeader>

      <Grid
        container
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <Grid item xs={6}>
          <Wrap admin>
            <WrapInside>
              <Button style={buttonRd} onClick={() => onPassword("admin")}>
                <WrapItem>
                  <Assignment fontSize="large"></Assignment>
                  <span style={textDep}>ฝ่ายธุรการ</span>
                  <span>Administration</span>
                </WrapItem>
              </Button>

              {pass.admin ? makePassUI() : null}
            </WrapInside>
          </Wrap>
        </Grid>
        <Grid item xs={6}>
          <Wrap>
            <WrapInside>
              <Button style={buttonRd} onClick={() => onPassword("regis")}>
                <WrapItem>
                  <AssignmentInd fontSize="large"></AssignmentInd>
                  <span style={textDep}>ฝ่ายทะเบียน</span>
                  <span>Registration</span>
                </WrapItem>
              </Button>
              {pass.regis ? makePassUI() : null}
            </WrapInside>
          </Wrap>
        </Grid>
        <BgURU src={imgBG}></BgURU>
      </Grid>
    </div>
  );
}

const InputPass = styled.input`
  margin-left: 12px;
  outline: none;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-size: 16px;
  width: 140px;
`;

const BgURU = styled.div`
  position: absolute;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: none;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.4;
`;
const WrapHeader = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  background: ${props => (props.admin ? "#263238" : "#33424a")};
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const WrapInside = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const WrapItem = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export default Login;
