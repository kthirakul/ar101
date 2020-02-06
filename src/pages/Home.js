import React from "react";

function Home() {
  const styles = {
    Wrap: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: 40,
      userSelect: "none"
    },
    Welcome: {
      color: "#37474f",
      fontSize: 36
    },
    Logo: {
      width: 240
    },
    ARuru: {
      fontSize: 46,
      fontWeight: "bold"
    }
  };

  const { Wrap, Welcome, Logo, ARuru } = styles;

  return (
    <div style={Wrap}>
      <img className="Logo" style={Logo} src={"/logouru.png"} alt="" />
      <p className="Welcome" style={Welcome}>
        ยินดีต้อนรับสู่ระบบ <span style={ARuru}>AR URU</span>
      </p>
    </div>
  );
}

export default Home;
