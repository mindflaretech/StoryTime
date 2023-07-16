import {makeRequesActions, makeAction} from '../ActionTypes';
import {createReducer} from '@reduxjs/toolkit';
import {Util} from '../../utils';

// action creators
export const updateCountTest = makeAction('UPDATE_COUNT_TEST');
export const testScroll = makeRequesActions('TEST_SCROLL');
export const testList = makeRequesActions('TEST_LIST');
export const getList = makeRequesActions('GET_LIST');
export const locations = makeAction('LOCATIONS');
export const reminders = makeAction('REMINDERS');
export const currentLoc = makeAction('CURRENTLOCATION');

// init state
const initalState = {
  list: [],
  count: 0,
  data: {},
  scrollViewData: [],
  gitUsers: [],
  page: {},
  test: [],
  locations: [],
  reminders: [],
};
// console.log(test);
// init reducer
export default createReducer(initalState, builder => {
  // Git user list
  builder.addCase(getList.success, (state, action) => {
    // Util.concatDataArray(state, action, 'list');
    // console.log('========== INITIAL STATE OF GET USERS LIST ========');
    // console.log(state);
    // console.log(action);
    state = {
      ...state,
      gitUsers: Util.concatDataArray(state, action, 'gitUsers'),
      page: action.payload.page,
    };
    // state.gitUsers = Util.concatDataArray(state, action, 'gitUsers');
    // state.gitUsers = action.payload.data
  });
  // simple list
  builder.addCase(testList.success, (state, action) => {
    // Util.concatDataArray(state, action, 'list');
  });

  // reset data on first load list
  builder.addCase(testList.request, (state, action) => {
    const {resetReducerData, identifier} = action.payload;
    if (resetReducerData) {
      const reducerKey = identifier || 'list';
      state[reducerKey] = [];
    }
  });

  // simple scrollview
  builder.addCase(testScroll.success, (state, action) => {
    state.scrollViewData = action.payload.data;
  });

  /* // simple scrollview with identifier
  builder.addCase(testScroll.success, (state, action) => {
    const { identifier, data } = action.payload;
    state[identifier] = data;
  }); */

  // reset data on first load scrollview
  builder.addCase(testScroll.request, (state, action) => {
    const {resetReducerData, identifier} = action.payload;
    if (resetReducerData) {
      const reducerKey = identifier || 'scrollViewData';
      state[reducerKey] = [];
    }
  });

  /* // simple list with identifier
  builder.addCase(testList.success, (state, action) => {
    Util.concatDataArray(state, action, action.payload.identifier);
  }); */

  // simple list with identifier and normalize data
  /* builder.addCase(testList.success, (state, action) => {
    Util.concatNormalizeArray(state, action);
  }); */

  builder.addCase(updateCountTest, (state, action) => {
    state.data = action.payload.count;
  });

  builder.addCase(locations, (state, action) => {
    // console.log(action, 'locations action ..........');
    state.locations = action.payload;
  });
  builder.addCase(reminders, (state, action) => {
    console.log(action, 'reminders action  ..........');
    state.reminders = action.payload;
  });
  builder.addCase(currentLoc, (state, action) => {
    console.log(action, 'currentLoc action  ..........');
    state.currentLoc = action.payload;
  });
});

// selectors
export const getTestList = state => state.testPost.list;
// with identifier
const defaultData = [];
const defaultObj = {};
export const getTestListIdentifier = identifier => state =>
  state.testPost?.[identifier] ?? defaultData;
export const getData = state => state.testPost?.data ?? defaultObj;

// for scroll view
export const getScrollData = state => state.testPost?.scrollViewData ?? [];
export const getScrollDataIdentifer = identifier => state =>
  state.testPost?.[identifier] ?? defaultData;

export const getLocation = state => state.testPost?.locations ?? defaultData;
export const getReminder = state => state.testPost?.reminders ?? defaultData;
export const getCurrentLoc= state => state.testPost?.currentLoc ?? defaultData;
