import React, { useContext, Fragment, useEffect } from "react";
import PaperContext from "../context/PaperContext";
import Paper from "../components/Paper";
import { Search } from "@material-ui/icons";
import { SHOW_ADD_PAPER } from "../context/reducers";
import NoListData from "../util/NoListData";

function Handle() {
  const Context = useContext(PaperContext);
  const {
    paperData: { papers },
    dispatch,
    showAddPaper
  } = Context;

  let recentPapers = papers
    ? papers.map(
        paper =>
          paper.stayHandle === true && (
            <Paper key={paper.paperId} data={paper} status={"handle"} />
          )
      )
    : null;

  useEffect(() => {
    showAddPaper === false && dispatch({ type: SHOW_ADD_PAPER, payload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (res.verified === false && res.checked === undefined) {
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
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Search fontSize="large"></Search>
              <span style={{ marginLeft: 6, marginRight: 6 }}>
                รอการตรวจสอบ
              </span>
              ({countPapers()})
            </div>
          ) : (
            <NoListData page={"รอตรวจสอบ"} />
          )}
        </span>
      </div>

      <div>{recentPapers}</div>
    </Fragment>
  );
}

export default Handle;
