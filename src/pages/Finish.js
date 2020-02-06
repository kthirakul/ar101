import React, { useContext, Fragment } from "react";
import PaperContext from "../context/PaperContext";
import Paper from "../components/Paper";
import {  PlaylistAddCheck } from "@material-ui/icons";
import NoListData from '../util/NoListData'



function Finish() {
  //



  //

  const Context = useContext(PaperContext);
  const {
    paperData: { papers }
  } = Context;

  let recentPapers = papers
    ? papers.map(
        paper =>
          paper.docTypes === "รายงานผล" && (
            <Paper key={paper.paperId} data={paper} status={"finish"} />
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
    },

  };

  const { header, headerText } = styles;

  const countPapers = () => {
    let count = 0;
    papers &&
      papers.forEach(res => {
        if (res.docTypes === "รายงานผล") {
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
              <PlaylistAddCheck fontSize="large"></PlaylistAddCheck>
              <span style={{ marginLeft: 6, marginRight: 6 }}>
                ส่งหนังสือแล้ว
              </span>
              ({countPapers()})
            </div>
          ) : (
            <NoListData page={"ส่งหนังสือรายงานผล"} />
          )}
        </span>
      </div>

      <div>{recentPapers}</div>
    </Fragment>
  );
}

export default Finish;
