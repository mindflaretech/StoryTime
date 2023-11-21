import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../RemindersAddUpdate/styles';
import {useDispatch, useSelector} from 'react-redux';
import {getActiveReminder, getLocation, getReminder, reminders} from '../../ducks/testPost';
import {ScreeNames} from '../../naviagtor';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import PushNotification from 'react-native-push-notification';
import StatusBar from '../../components/StatusBar';
import CustomHeader from '../../components/Header/customHeader';
import {showMessage} from 'react-native-flash-message';
import EventEmitter from '../../utils/EventEmitter';

const Index = ({route}) => {
  // ================ useState =====================//
  const [itemsId, setItemsId] = useState();
  const [previousId, setPreviousId] = useState(null);
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const [myLocationObj, setMyLocationObj] = useState('');
  const [coordinates, setCoordinates] = useState();
  const [isEditState, setIsEditState] = useState(false);
  // ================ useNavigation =====================//
  const navigation = useNavigation();
  // ================ useDispatch =====================//
  const dispatch = useDispatch();
  const getRemindersData = useSelector(getReminder);

  // ================ params =====================//
  const edit = route?.params?.edit;
  const text = route?.params?.text;
  const itemId = route?.params?.items?.id;
  const itemName = route?.params?.items?.name;
  const itemRadius = route?.params?.items?.radius;
  const isEdit = route?.params?.isEdit;
  const itemLocation = route?.params?.items?.location;
  const isConfirmLocation = route?.params?.item;
  const isUpdateAddress = route?.params?.isUpdate;
  const isSelectAddress = route?.params?.isSelect;

  // ================ useEffect =====================//
  useEffect(() => {
    // console.log(itemId, 'Reminders to add reminders');
    setItemsId(itemId);
    // console.log(itemsId, 'update in state');
  }, [itemsId]);

  useEffect(() => {
    EventEmitter.addListener('onItemId', onIdSelected);
    EventEmitter.addListener('onLocationUpdateORselect', onLocationSelcted);
    return () => {
      EventEmitter.removeListener('onItemId', onIdSelected);
      EventEmitter.removeListener(
        'onLocationUpdateORselect',
        onLocationSelcted,
      );
    };
  }, []);

  useEffect(() => {
    if (isEdit) {
      setIsEditState(true);
    }
  }, [isEdit]);

  useEffect(() => {
    HandleEditChange();
  }, [isEdit]);

  const generateString = length => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const onLocationSelcted = location => {
    // console.log(location, '===================location');
    setCoordinates(location?.location?.coordinates);
    setMyLocationObj(location?.location?.address);
  };

  const onIdSelected = itemsId => {
    // console.log(itemsId, 'Location to Add reminders');
    setItemsId(itemsId);
  };

  const handleNotification = myLocationObj => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      date: new Date(Date.now() + 5 * 1000),
      title: 'Reminder Added Successfully',
      message: myLocationObj,
      playSound: true,
      soundName: 'default',
      allowWhileIdle: true,
    });
  };

  const HandleEditChange = () => {
    if (isEdit) {
      setName(itemName);
      setMyLocationObj(itemLocation);
      setRadius(itemRadius);
    }
  };

  const updatedData = () => {
    // console.log('A ==================');
    if (name === '' || myLocationObj === '' || radius === '') {
      // console.log('B ==================');

      showMessage({
        message: 'Fields cannot be empty',
        type: 'danger',
        duration: 2000,
      });
    } else {
      // console.log('C ==================');

      const updatedIndex = getRemindersData.findIndex(
        obj => obj.id === itemsId,
      );
      // console.log(itemsId, 'C ==================');

      if (updatedIndex !== -1) {
        const updatedData = getRemindersData.map(obj => {
          if (obj.id === itemsId) {
            const object = {
              id: itemsId,
              name: name,
              radius: radius,
              location: myLocationObj,
              coordinates: coordinates,
            };
            // console.log(object, 'object ==================');
            return object;
          } else {
            // console.log(obj, 'obj ==================');
          }
          return obj;
        });
        // console.log(updatedData, 'updatedData ==================');

        dispatch(reminders(updatedData));
        showUpdatedMessage();
        navigation.navigate(ScreeNames.Reminders);
      }
    }
  };

  const savedData = () => {
    if (name === '' || myLocationObj === '' || radius === '') {
      showMessage({
        message: 'Fields cannot be empty',
        type: 'danger',
        duration: 2000,
        backgroundColor: Colors.teal,
      });
    } else {
      navigation.navigate(ScreeNames.Reminders);
      const newData = {
        id: generateString(8),
        name: name,
        radius: radius,
        location: myLocationObj,
        coordinates: coordinates,
      };
      const updatedData = [...getRemindersData, newData];
      dispatch(reminders(updatedData));
      handleNotification(myLocationObj);
    }
  };

  const showUpdatedMessage = () => {
    showMessage({
      message: 'Reminder has been updated successfully',
      type: 'success',
      duration: 2000,
      backgroundColor: Colors.teal,
    });
  };

  const handleNameChange = value => {
    setName(value);
  };

  const handleRadiusChange = value => {
    setRadius(value);
  };

  const isEditable = () => {
    navigation.navigate(ScreeNames.Locations, {
      isEdit: isEdit,
      itemId: itemsId,
      previousId: previousId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CustomHeader
        text={text}
        edit={edit}
        isEdit={isEdit}
        isUpdateAddress={isUpdateAddress}
      />
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleNameChange}
          value={name}
          placeholder="Name"
          placeholderTextColor="gray"
          maxLength={30}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={() => isEditable()}>
          <Text
            style={[
              styles.locationTxt,
              {color: myLocationObj ? Colors.black : 'gray'},
            ]}>
            {myLocationObj ? myLocationObj : 'Location'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleRadiusChange}
          value={radius}
          placeholder="Radius"
          keyboardType="numeric"
          placeholderTextColor="gray"
          maxLength={3}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            isEdit || edit || isUpdateAddress || isEditState
              ? updatedData()
              : savedData();
          }}>
          <Text style={styles.buttonTxt}>
            {isEdit || edit || isUpdateAddress || isEditState
              ? 'Update'
              : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
