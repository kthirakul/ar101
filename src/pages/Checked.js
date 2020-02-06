import React, { useContext, Fragment } from "react";
import PaperContext from "../context/PaperContext";
import Paper from "../components/Paper";
import { SwapHoriz } from "@material-ui/icons";
import NoListData from "../util/NoListData";
import SentPaper from "../util/SentPaper";

function Checked() {
  const Context = useContext(PaperContext);
  const {
    paperData: { papers }
  } = Context;

  let recentPapers = papers
    ? papers.map(
        paper =>
          paper.verified &&
          paper.checked === true &&
          paper.send === false && (
            <Paper key={paper.paperId} status={"checked"} data={paper} />
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
        if (
          res.verified === true &&
          res.checked === true &&
          res.send === false
        ) {
          count++;
        }
      });
    return count;
  };
  return (
    <Fragment>
      <SentPaper />
      <div style={header}>
        <span style={headerText}>
          {countPapers() > 0 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <SwapHoriz fontSize="large"></SwapHoriz>
              <span style={{ marginLeft: 6, marginRight: 6 }}>
                รอส่งรายงานผล
              </span>
              ({countPapers()})
            </div>
          ) : (
            <NoListData page={"รอส่งรายงานผล"} />
          )}
        </span>
      </div>
      <div>{recentPapers}</div>
    </Fragment>
  );
}

export default Checked;
