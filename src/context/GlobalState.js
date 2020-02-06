import React, { useReducer, useEffect } from "react";
import axios from "axios";
import PaperContext from "./PaperContext";
import { FETCH_PAPERS, paperReducer } from "./reducers";
import jwtDecode from "jwt-decode";
const GlobalState = props => {
  const [state, dispatch] = useReducer(paperReducer, {
    papers: [],
    event: 0,
    addPaper: false,
    handlePaper: {
      paperId: "",
      paperNo: "",
      dateAt: "",
      agencyName: "",
      provice: "",
      district: "",
      topic: ""
    },
    onEdit: false,
    verifyData: {
      faculty: "",
      educational: "",
      major: "",
      studentId: "",
      studentName: "",
      birthDate: "",
      gradDate: "",
      grade: "",
      agencyType: "",
      reason: "",
      result: "",
      verifyNote: ""
    },
    verify: false,
    verifyNo: "",
    verifyId: "",
    sentData: {
      sentNo: "",
      sentDate: "",
      endorser: ""
    },
    sentBool: false,
    showAddPaper: false,
    sentRef: "",
    sentId: "",
    showVerified: false,
    fromVerified: null
  });

  useEffect(() => {
    if (localStorage.hasOwnProperty("FBIdToken")) {
      const decodedToken = jwtDecode(localStorage.FBIdToken);

      if (new Date(decodedToken.exp * 1000) < Date.now()) {
        localStorage.removeItem("FBIdToken");
        localStorage.removeItem("userWork");
        delete axios.defaults.headers.common;
        window.location.href = "/";
      } else {
        axios
          .get("/papers")
          .then(res => {
            dispatch({
              type: FETCH_PAPERS,
              payload: res.data
            });
          })
          .then(() => {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${localStorage.getItem("FBIdToken")}`;
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }, []);

  const getData = () => {
    axios.get("/papers").then(res => {
      dispatch({
        type: FETCH_PAPERS,
        payload: res.data
      });
    });
  };

  return (
    <PaperContext.Provider
      value={{
        paperData: state,
        imgURL:
          "https://firebasestorage.googleapis.com/v0/b/ar-uru-project.appspot.com/o/urulogo.png?alt=media&token=972cd4aa-3d40-4b39-b0f7-ccfbf9409ceb",
        systemData: "1.0",
        getData: getData,
        eventData: state.event,
        addPaper: state.addPaper,
        dispatch: dispatch,
        handlePaper: state.handlePaper,
        onEdit: state.onEdit,
        verifyData: state.verifyData,
        verify: state.verify,
        verifyNo: state.verifyNo,
        verifyId: state.verifyId,
        sentData: state.sentData,
        sentBool: state.sentBool,
        showAddPaper: state.showAddPaper,
        sentRef: state.sentRef,
        sentId: state.sentId,
        showVerified: state.showVerified,
        fromVerified: state.fromVerified
      }}
    >
      {props.children}
    </PaperContext.Provider>
  );
};

export default GlobalState;
