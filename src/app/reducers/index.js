// IMPORT ALL CONSTANT STRINGS DEFINED IN action file == ../actions/Camp.js
import {LOGIN, USER_DATA, USER_IMAGE, USER_TOKEN} from '../type';

const initialState = {
  userData: {},
  loading: false,
  showSnack: false,
  snackMessage: '',
  userToken: '',
  userImage: '',
  appColor: '',
  count: 0,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };

    case USER_IMAGE:
      return {
        ...state,
        userImage: action.payload,
      };

    case LOGIN:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
