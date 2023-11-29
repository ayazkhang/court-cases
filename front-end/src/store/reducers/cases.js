const initialState = {
  cases: [],
};

const casesReducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_CASE":
      return {
        ...state,
        cases: action.payload,
      };

    case "ADD_CASE":
      return {
        ...state,
        cases: [...state.cases, action.payload],
      };

    case "UPDATE_CASE":
      const updatedCases = state.cases.map((item, index) =>
        index === action.payload.index ? action.payload.caseData : item
      );

      return {
        ...state,
        cases: updatedCases,
      };

    case "DELETE_CASE":
      const filteredCases = state.cases.filter(
        (item, index) => index !== action.payload.index
      );

      return {
        ...state,
        cases: filteredCases,
      };

    default:
      return state;
  }
};

export default casesReducer;
