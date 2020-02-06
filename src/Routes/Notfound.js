import React from "react";
import { YoutubeSearchedFor } from "@material-ui/icons";

function Notfound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 22
      }}
    >
      <YoutubeSearchedFor fontSize="large" />
      <span style={{ fontSize: 22, marginLeft: 8 }}>ไม่พบหน้าที่ต้องการ</span>
    </div>
  );
}

export default Notfound;
