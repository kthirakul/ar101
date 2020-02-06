export const FETCH_PAPERS = "FETCH_PAPERS";
export const EVENT_CHANGE = "EVENT_CHANGE";
export const SET_ADDPAPER = "SET_ADDPAPER";
export const EDIT_PAPER = "EDIT_PAPER";
export const CLEAR_EDIT_PAPER = "CLEAR_EDIT_PAPER";
export const CHANGE_EDIT_PAPER = "CHANGE_EDIT_PAPER";
export const VERIFY_SHOW = "VERIFY_SHOW";
export const GET_VERIFYID = "GET_VERIFYID";
export const CHANGE_TEXT_VERIFY = "CHANGE_TEXT_VERIFY";
export const GET_VERIFYNO = "GET_VERIFYNO";
export const CLEAR_VERIFIED = "CLEAR_VERIFIED";
export const SENT_SHOW = "SENT_SHOW";
export const SHOW_ADD_PAPER = "SHOW_ADD_PAPER";
export const SENT_REF = "SENT_REF";
export const CHANGE_SENT_PAPER = "CHANGE_SENT_PAPER";
export const BEFORE_SENT_PAPER = "BEFORE_SENT_PAPER";
export const GET_SENT_ID = "GET_SENT_ID";
export const CLEAR_SENT = "CLEAR_SENT";
export const EDIT_PAPER_REGIS = "EDIT_PAPER_REGIS";
export const CLEAR_EDIT_PAPER_REGIS = "CLEAR_EDIT_PAPER_REGIS";
export const SHOW_VERIFIED = "SHOW_VERIFIED";
export const FROM_VERIFIED = "FROM_VERIFIED";

const fetchPapers = (papers, state) => {
  return { ...state, papers };
};

export const paperReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PAPERS:
      return fetchPapers(action.payload, state);

    case SHOW_ADD_PAPER:
      return {
        ...state,
        showAddPaper: action.payload
      };

    case EVENT_CHANGE:
      return {
        ...state,
        event: state.event + 1
      };

    case SET_ADDPAPER:
      return {
        ...state,
        addPaper: action.payload
      };

    case EDIT_PAPER:
      return {
        ...state,
        handlePaper: { ...action.payload },
        addPaper: true,
        onEdit: true
      };

    case CHANGE_TEXT_VERIFY:
      return {
        ...state,
        verifyData: {
          ...state.verifyData,
          ...action.payload
        }
      };

    case CHANGE_EDIT_PAPER:
      return {
        ...state,
        handlePaper: {
          ...state.handlePaper,
          ...action.payload
        }
      };

    case CLEAR_VERIFIED:
      return {
        ...state,
        verifyData: {
          ...state.verifyData,
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
        }
      };

    case CLEAR_EDIT_PAPER:
      return {
        ...state,
        handlePaper: {
          paperNo: "",
          dateAt: "",
          agencyName: "",
          provice: "",
          district: "",
          topic: ""
        },
        addPaper: false,
        onEdit: false
      };

    case VERIFY_SHOW:
      return {
        ...state,
        verify: action.payload
      };

    case GET_VERIFYNO:
      return {
        ...state,
        verifyNo: action.payload
      };

    case GET_VERIFYID:
      return {
        ...state,
        verifyId: action.payload
      };

    case SENT_SHOW:
      return {
        ...state,
        sentBool: action.payload
      };

    case SENT_REF:
      return {
        ...state,
        sentRef: action.payload
      };
    case CHANGE_SENT_PAPER:
      return {
        ...state,
        sentData: {
          ...state.sentData,
          ...action.payload
        }
      };

    case BEFORE_SENT_PAPER:
      return {
        ...state,
        sentData: action.payload
      };
    case GET_SENT_ID:
      return {
        ...state,
        sentId: action.payload
      };

    case CLEAR_SENT:
      return {
        ...state,
        sentData: {
          ...state.sentData,
          sentNo: "",
          sentDate: "",
          endorser: ""
        }
      };

    case EDIT_PAPER_REGIS:
      return {
        ...state,
        verifyData: { ...action.payload },
        verify: true,
        onEdit: true
      };

    case CLEAR_EDIT_PAPER_REGIS:
      return {
        ...state,
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
        onEdit: false
      };

    case SHOW_VERIFIED:
      return {
        ...state,
        showVerified: action.payload
      };
    case FROM_VERIFIED:
      return {
        ...state,
        fromVerified: action.payload
      };

    default:
      return state;
  }
};
