import React from "react";
import { PersonAddDisabled } from "@material-ui/icons";

function NoListData({ page }) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
 
      <PersonAddDisabled fontSize="large" />
      <span>ไม่มีรายการ</span>
      <span style={{ fontSize: 28 }}>{page}</span>
    </span>
  );
}

export default NoListData;
