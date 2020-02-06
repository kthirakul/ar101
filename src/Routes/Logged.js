import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components

//Pages
import SignIn from "./SignIn";
import Login from "../pages/Login";

import dayjs from "dayjs";

dayjs.locale("th");

function Logged() {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    if (localStorage.hasOwnProperty("FBIdToken")) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return logged ? (
    <SignIn />
  ) : (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}
export default Logged;
