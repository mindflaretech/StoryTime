import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Colors, Images} from '../../theme';
import StatusBar from '../../components/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import BottomButton from '../../components/BottomButton';
import {ButtonView} from '../../components';
import Button from '../../components/Button/index';
import {create} from 'apisauce';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar />
      <Image style={styles.logo2} source={Images.general.logo2} />
      <Image style={styles.logInTxt} source={Images.general.logInTxt} />
      <View>
        <Text style={styles.usernametxt}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor={Colors.placeholderTextColor}
          value={username}
          onChangeText={setUsername}
          maxLength={30}
        />
      </View>
      <View style={styles.passwordSection}>
        <Text style={styles.passwordTxt}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor={Colors.placeholderTextColor}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            maxLength={12}
          />

          <TouchableOpacity
            style={styles.eyeIconView}
            activeOpacity={0.85}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image style={styles.eyeIcon} source={Images.general.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.forgotPasswordTxt}>Forgot Password?</Text>
      <Button text="Login" />
      <View style={styles.agreementTxtView}>
        <Text style={styles.agreementTxt}>
          By logging in, you agree to our{' '}
          <Text style={styles.termsAndConditionTxt} onPress={() => {}}>
            Terms & Conditions{' '}
          </Text>
          and
        </Text>
        <Text style={styles.privacyPolicyTxt} onPress={() => {}}>
          Privacy Policy
        </Text>
      </View>
      <Text style={styles.loginWithTxt}>or Login with</Text>
      <View style={styles.loginWithView}>
        <TouchableOpacity
          style={styles.googleView}
          activeOpacity={0.85}
          onPress={() => {}}>
          <Image style={styles.googleIcon} source={Images.general.googleIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.facebookView}
          activeOpacity={0.85}
          onPress={() => {}}>
          <Image
            style={styles.facebookIcon}
            source={Images.general.facebookIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appleView}
          activeOpacity={0.85}
          onPress={() => {}}>
          <Image style={styles.appleIcon} source={Images.general.appleIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.dontHaveAccountTxt}>
        Don't have an account yet?{' '}
        <Text style={styles.createOneTxt} onPress={() => {}}>
          Create one
        </Text>
      </Text>
    </View>
  );
};

export default Login;
