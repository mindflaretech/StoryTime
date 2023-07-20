import {showMessage as flashMessageShow} from 'react-native-flash-message';
import {Platform, StatusBar, Alert} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import checkVersion from 'react-native-store-version';
import VersionInfo from 'react-native-version-info';
import {ANDROID_STORE_URL, IOS_STORE_URL} from '../config/Constants';

function isPlatformAndroid() {
  return Platform.OS === 'android';
}

function isPlatformIOS() {
  return Platform.OS === 'ios';
}

function getPlatform() {
  return Platform.OS;
}

function convert24HrTo12(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function getFormattedTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
}

function translucentApp() {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('light-content');
}

function setStatusBarLight() {
  StatusBar.setBarStyle('light-content', true);
}

function setStatusBarDark() {
  StatusBar.setBarStyle('dark-content', true);
}

function isNotEmpty(data) {
  return !_.isEmpty(data, true);
}

function isEmpty(data) {
  return _.isEmpty(data, true);
}

function clone(data) {
  return _.clone(data);
}

function cloneDeep(data) {
  return _.cloneDeep(data);
}

function getTimeDiffInMinutes(timeStamp) {
  return (Number(new Date()) - Number(new Date(timeStamp))) / (1000 * 60);
}

function compareDeep(previous, next) {
  return !_.isEqual(previous, next);
}

function getDateFromNow(date) {
  return date ? moment(date).fromNow() : '';
}

function formatDate(dateString, formattedDateFormat) {
  return dateString ? moment(dateString).format(formattedDateFormat) : '';
}

function formatDate2(dateString, currentDateFormat, formattedDateFormat) {
  return dateString
    ? moment(dateString, currentDateFormat).format(formattedDateFormat)
    : '';
}

function compareDates(date1, date2) {
  if (date1 && date2) {
    return moment(date1).isSame(date2, 'day');
  }
  return false;
}

function setStatusBarStyle(barStyle) {
  StatusBar.setBarStyle(barStyle, true);
}

function showAlertConfirm(
  title,
  message,
  doneText,
  onDonePress,
  cancelText = 'cancel',
  onCancelPress,
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: () => onCancelPress(),
        style: 'cancel',
      },
      {text: doneText, onPress: () => onDonePress()},
    ],
    {cancelable: true},
  );
}

function removeFormatLocalNumber(x) {
  return x.toString().replace(/[^\d.-]/g, '');
}

function toFixedIfNecessary(value, dp = 1) {
  return +parseFloat(value).toFixed(dp);
}

/*
type : 'danger' , 'success' , 'info'
*/
function showMessage(message, type = 'danger', duration = 2000) {
  flashMessageShow({
    message,
    type,
    duration,
  });
}

function concatDataArray(state, action, dataKey = 'data') {
  const {data, reset} = action.payload;
  const newData = reset ? data : _.concat(state?.[dataKey] ?? [], data);

  state[dataKey] = newData;
}

function stringToDateObject(date, format) {
  if (date) {
    return moment(date, format).toDate();
  }
  return moment().toDate();
}

function makeRandomString(length = 20) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function checkAppStoreVersion() {
  const init = async () => {
    try {
      const check = await checkVersion({
        version: VersionInfo.appVersion, // app local version
        androidStoreURL: ANDROID_STORE_URL,
        iosStoreURL: IOS_STORE_URL,
        country: 'jp', // default value is 'jp'
      });

      // console.log("=========== Check App Version =======");
      // console.log("=========== Platform ==================");
      // console.log(getPlatform());

      // console.log(check);
      if (check.result === 'new') {
        // if app store version is new
        Alert.alert('Update App', 'New version available on store');
      }

      // setAndroidVersion(check.result);
    } catch (e) {
      // console.log(e);
    }
  };

  init();
}

export default {
  checkAppStoreVersion,
  isPlatformAndroid,
  isPlatformIOS,
  getPlatform,
  convert24HrTo12,
  translucentApp,
  setStatusBarLight,
  setStatusBarDark,
  isNotEmpty,
  isEmpty,
  clone,
  cloneDeep,
  getTimeDiffInMinutes,
  compareDeep,
  getDateFromNow,
  formatDate,
  makeRandomString,
  formatDate2,
  stringToDateObject,
  compareDates,
  setStatusBarStyle,
  showAlertConfirm,
  removeFormatLocalNumber,
  toFixedIfNecessary,
  showMessage,
  concatDataArray,
  getFormattedTime,
};
