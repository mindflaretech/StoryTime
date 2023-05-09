import { combineReducers } from 'redux';

import requestFlags from './requestFlags';
import network from './network';
import testPost from './testPost';

const appReducer = combineReducers({
  requestFlags,
  network,
  testPost,
});

export default appReducer;
