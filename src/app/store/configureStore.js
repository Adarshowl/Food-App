import {applyMiddleware, combineReducers, createStore} from 'redux';

import Reducer from '../reducers';
import thunk from 'redux-thunk';
// import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  state: Reducer,
});

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
