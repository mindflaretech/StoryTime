import { fork } from 'redux-saga/effects';
import testPost from './testPost/saga';

export default function* root() {
  yield fork(testPost);
}
