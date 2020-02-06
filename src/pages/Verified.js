import React, { useContext, Fragment } from "react";
import PaperContext from "../context/PaperContext";
import Paper from "../components/Paper";
import { HourglassEmpty } from "@material-ui/icons";
import NoListData from "../util/NoListData";

function Verified() {
  const Context = useContext(PaperContext);
  const {
    paperData: { papers }
  } = Context;

  let recentPapers = papers
    ? papers.map(
        paper =>
          paper.verified &&
          paper.checked === false && (
            <Paper key={paper.paperId} status={"verified"} data={paper} />
          )
      )
    : null;

  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    },
    headerText: {
      fontSize: 22,
      marginTop: 22,
      marginBottom: 22,
      display: "flex",
      alignItems: "center"
    }
  };

  const { header, headerText } = styles;

  const countPapers = () => {
    let count = 0;
    papers &&
      papers.forEach(res => {
        if (res.verified === true && res.checked === false) {
          count++;
        }
      });
    return count;
  };
  return (
    <Fragment>
      <div style={header}>
        <span style={headerText}>
          {countPapers() > 0 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <HourglassEmpty fontSize="large" />
              <span style={{ marginLeft: 6, marginRight: 6 }}>รอการยืนยัน</span>
              ({countPapers()})
            </div>
          ) : (
            <NoListData page={"รอการยืนยัน"} />
          )}
        </span>
      </div>
      <div>{recentPapers}</div>
    </Fragment>
  );
}

export default Verified;
