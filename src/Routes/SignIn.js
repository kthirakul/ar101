import React, { useEffect, useContext } from "react";
import PaperContext from "../context/PaperContext";
import Notfound from "./Notfound";
import VerifyPaper from "../util/VerifyPaper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Navbar from "../components/Navbar";

//Pages
import Handle from "../pages/Handle";
import Home from "../pages/Home";
import Verified from "../pages/Verified";
import Checked from "../pages/Checked";
import ViewAll from "../pages/ViewAll";
import Finish from "../pages/Finish";
import AddPaper from "../util/AddPaper";

function SingIn() {
  const Context = useContext(PaperContext);
  const { getData, eventData } = Context;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  const styles = {
    addPaper: {
      position: "fixed",
      left: 80,
      top: 70
    }
  };

  const { addPaper } = styles;
  return (
    <Router>
      <Navbar>
        {localStorage.getItem("userWork") === "ฝ่ายธุรการ" && (
          <div style={addPaper}>
            <AddPaper />
          </div>
        )}
        {localStorage.getItem("userWork") === "ฝ่ายทะเบียน" && <VerifyPaper />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/รอส่งรายงานผล" component={Checked} />
          <Route exact path="/รอการยืนยัน" component={Verified} />
          <Route exact path="/รอตรวจสอบ" component={Handle} />
          <Route exact path="/เรียบร้อยแล้ว" component={Finish} />
          <Route exact path="/ดูภาพรวม" component={ViewAll} />
          <Route component={Notfound} />
        </Switch>
      </Navbar>
    </Router>
  );
}
export default SingIn;
