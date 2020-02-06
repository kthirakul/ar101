import React from "react";
import { Grid } from "@material-ui/core";
function DatabaseDetailBox({ icon, detail }) {
  return (
    <Grid
      style={{
        display: "flex",
        alignItems: "center",
      }}
      item
      xs={6}
    >
      {icon}
      <span style={{ marginLeft: 4 }}>{detail}</span>
    </Grid>
  );
}

export default DatabaseDetailBox;
