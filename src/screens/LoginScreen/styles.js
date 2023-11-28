/** @format */

import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  logo2: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 2.5,
    resizeMode: 'contain',
    marginTop: 25,
  },
  logInTxt: {
    height: Dimensions.get('window').width / 8,
    width: Dimensions.get('window').width / 6.5,
    resizeMode: 'contain',
  },
  usernametxt: {
    fontSize: 12,
    color: Colors.black,
    marginVertical: 6,
  },
  input: {
    borderColor: Colors.textInputBackground,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Colors.textInputBackground,
    paddingHorizontal: 25,
    height: Dimensions.get('window').width / 9,
    width: Dimensions.get('window').width / 1.3,
  },
  passwordSection: {
    marginVertical: 20,
  },
  passwordTxt: {
    fontSize: 12,
    color: Colors.black,
    marginVertical: 6,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderColor: Colors.textInputBackground,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Colors.textInputBackground,
  },
  eyeIconView: {
    zIndex: 1,
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  eyeIcon: {
    resizeMode: 'contain',
    width: 18,
    height: 18,
  },
  forgotPasswordTxt: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
  },
  agreementTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  agreementTxt: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '400',
    alignSelf: 'center',
  },
  termsAndConditionTxt: {
    color: Colors.subscribeButton,
    fontSize: 12,
    fontWeight: '400',
  },
  privacyPolicyTxt: {
    color: Colors.subscribeButton,
    fontSize: 12,
    fontWeight: '400',
  },
  loginWithTxt: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
    marginTop: 30,
  },
  loginWithView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  googleView: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.borderColor,
    height: Dimensions.get('window').width / 9,
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    resizeMode: 'contain',
  },
  facebookView: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.borderColor,
    height: Dimensions.get('window').width / 9,
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  facebookIcon: {
    resizeMode: 'contain',
  },
  appleView: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.borderColor,
    height: Dimensions.get('window').width / 9,
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleIcon: {
    resizeMode: 'contain',
  },
  dontHaveAccountTxt: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: '400',
    marginTop:25
  },
  createOneTxt: {
    color: Colors.subscribeButton,
    fontSize: 12,
    fontWeight: '400',
  },
});
