// Define the action types
export const FETCH_ALL_TRANSACTIONS_REQUEST = 'FETCH_ALL_TRANSACTIONS_REQUEST';
export const FETCH_ALL_TRANSACTIONS_SUCCESS = 'FETCH_ALL_TRANSACTIONS_SUCCESS';
export const FETCH_ALL_TRANSACTIONS_ERROR = 'FETCH_ALL_TRANSACTIONS_ERROR';

// Define the initial state
const initialState = {
  transactions: [],
  loading: false,
  error: null,
  test:"TEST"
};

// Define the reducer
export default  transactionReducer = (state = initialState, { type, payload }) => {
  console.log("REDUCER TRANSACTION",type,payload);

  switch (type) {
    case 'FETCH_ALL_TRANSACTIONS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };  
    case 'FETCH_ALL_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        transactions: payload,
        loading: false,
        error: null,
      };
    case FETCH_ALL_TRANSACTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
