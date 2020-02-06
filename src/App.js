import React, { lazy, Suspense } from "react";
import axios from "axios";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import GlobalState from "./context/GlobalState";
import dayjs from "dayjs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
const Logged = lazy(() => import("./Routes/Logged"));

dayjs.locale("th");
axios.defaults.baseURL =
  "https://us-central1-ar-uru-project.cloudfunctions.net/api";
  
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#607d8b",
      main: "#263238",
      contrastText: "#eceff1"
    },
    secondary: {
      light: "#c5cae9",
      main: "#90a4ae",
      dark: "#1a237e",
      contrastText: "#e8eaf6"
    }
  },
  typography: {
    fontFamily: '"Kanit", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    useNextVariants: true
  }
});

function App() {
  const LOading = () => (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vh",
          height: "100vh",
          flexDirection: "column"
        }}
      >
        <CircularProgress fontSize={"large"} />
        <span style={{ marginTop: 32 }}>กำลังโหลด...</span>
      </Grid>
    </Grid>
  );
  return (
    <GlobalState>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Suspense fallback={LOading()}>
            <Logged />
          </Suspense>
        </div>
      </MuiThemeProvider>
    </GlobalState>
  );
}
export default App;
