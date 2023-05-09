import { take, put, fork, call } from "redux-saga/effects";

import { API_TEST_LISTING } from "../../config/WebService";
import { Util } from "../../utils";
import { callRequest } from "../../utils/ApiSauce";

import { getList, testList, testScroll } from "./";

// simple list
// function* watchTestListing() {
//   while (true) {
//     const { payload } = yield take(testList.request.type);
//     // const { payloadApi, reset } = payload;
//     try {
//       const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
//       yield put(
//         testList.success({
//           data: response?.data ?? [],
//           page: response?.page ?? {},
//           reset,
//         }),
//       );
//     } catch (error) {
//       yield put(testList.failure({ errorMessage: error.message }));
//     }
//   }
// }

// simple list with identifier
// function* watchTestListing() {
//   while (true) {
//     const { payload } = yield take(testList.request.type);
//     const { payloadApi, reset, identifier } = payload;
//     try {
//       const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
//       yield put(
//         testList.success({
//           data: response?.data ?? [],
//           page: response?.page ?? {},
//           reset,
//           identifier,
//         }),
//       );
//     } catch (error) {
//       yield put(testList.failure({ errorMessage: error.message, identifier }));
//     }
//   }
// }

// // simple scroll view
// function* watchTestListingScroolView() {
//   while (true) {
//     const { payload } = yield take(testScroll.request.type);
//     const { payloadApi } = payload;
//     try {
//       const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
//       yield put(
//         testScroll.success({
//           data: response?.data ?? [],
//         }),
//       );
//     } catch (error) {
//       yield put(testList.failure({ errorMessage: error.message }));
//     }
//   }
// }

/* // simple scroll view with identifier
function* watchTestListingScroolView() {
  while (true) {
    const { payload } = yield take(testScroll.request.type);
    const { payloadApi, identifier } = payload;
    try {
      const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
      yield put(
        testScroll.success({
          data: response?.data ?? [],
          identifier,
        }),
      );
    } catch (error) {
      yield put(testList.failure({ errorMessage: error.message, identifier }));
    }
  }
} */

function* myGetData() {
  while (true) {
    const { payload } = yield take(getList.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
      console.log("========== Git Users Response ========");
      const data = response?.items;
      console.log(data);
      console.log('payloadApi.page');
      console.log(payloadApi.page);
      const pl ={
        totalRecords: response?.total_count,
        nextPage: payloadApi.page + 1,
      }
      console.log(pl);
      yield put(
        getList.success({
          data: data,
          reset,
          page: pl
        })
      );
      cb?.(data);
    } catch (error) {
      console.log("========== Git Users Error ========");
      console.log(error);
      yield put(getList.failure({ errorMessage: error.message, identifier }));
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(myGetData);
  // yield fork(watchTestListing);
  // yield fork(watchTestListingScroolView);
}
