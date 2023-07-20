import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../RemindersAddUpdate/styles';
import SaveUpdateButton from '../../components/SaveUpdateButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {getLocation, getReminder, reminders} from '../../ducks/testPost';
import {ScreeNames} from '../../naviagtor';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import {locationData} from '../../utils/Data/LocationData';
import {RemindersData} from '../../utils/Data/RemindersData';
import PushNotification from 'react-native-push-notification';
import StatusBar from '../../components/StatusBar';
import CustomHeader from '../../components/Header/customHeader';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Index = ({route}) => {
  // ================ useState =====================//
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const [myLocationObj, setMyLocationObj] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [showLocation, setShowLocation] = useState();
  const [SelectedLoc, setSelectedLoc] = useState();
  const rbSheetRef = useRef(null);
  const getLocationData = useSelector(getLocation);
  const getRemindersData = useSelector(getReminder);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const edit = route?.params?.edit;
  const text = route?.params?.text;
  const locationTrue = route?.params?.locationIsTrue;
  const item = route?.params?.items;
  const itemId = route?.params?.items?.id;
  const itemName = route?.params?.items?.name;
  const itemRadius = route?.params?.items?.radius;
  const isEdit = route?.params?.isEdit;
  const itemLocation = route?.params?.items?.location;
  const savedLocation = route?.params?.savedLocation;
  const locationDescription = route?.params?.locationDescription;
  const location = route?.params?.location;

  useEffect(() => {
    console.log(
      getLocationData?.length,
      ' getLocationData on add/update screen ',
    );
    // console.log(text, '================ text');
    // console.log(edit, '================ edit');
    // console.log(locationDescription, '================ locationDescription');
    console.log(myLocationObj, '================ myLocationObj');
    navigation.setOptions({
      title: isEdit || edit ? 'Edit Reminder' : 'Add Reminder',
    });
    if (isEdit) {
      setName(itemName);
      setRadius(itemRadius);
      setMyLocationObj(itemLocation);
    } else if (locationTrue) {
      setMyLocationObj(savedLocation);
      setMyLocationObj(locationDescription);
    }
    const recentLocation = getLocationData[getLocationData.length - 1];
    if (recentLocation) {
      const recentAddress = recentLocation.address;
      console.log(recentAddress);
      setMyLocationObj(recentAddress);
    }
  }, [
    isEdit,
    edit,
    itemName,
    itemRadius,
    itemLocation,
    savedLocation,
    locationDescription,
  ]);

  //================== creating random ID =====================//
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
  const fetchAddresses = () => {
    const addresses = getLocationData.map(location => location.address);
    console.log(addresses);
    setMyLocationObj(addresses);
  };
  const updatedData = () => {
    if (name === '' || myLocationObj === '' || radius === '') {
      showMessage({
        message: 'Fields cannot be empty',
        type: 'success',
        duration: 2000,
        backgroundColor: Colors.teal,
      });
    } else {
      navigation.navigate(ScreeNames.Reminders, {
        showLocation: showLocation,
      });
      const updatedIndex = getRemindersData.findIndex(obj => obj.id === itemId);
      if (updatedIndex !== -1) {
        const updatedData = getRemindersData.map(obj => {
          if (obj.id === itemId) {
            return {
              id: generateString(8),
              name: name,
              radius: radius,
              location: myLocationObj,
              activate: false,
            };
          }
          return obj;
        });
        dispatch(reminders(updatedData));
        showUpdatedMessage();
      }
    }
  };
  const savedData = () => {
    if (name === '' || myLocationObj === '' || radius === '') {
      showMessage({
        message: 'Fields cannot be empty',
        type: 'success',
        duration: 2000,
        backgroundColor: Colors.teal,
      });
    } else {
      navigation.navigate(ScreeNames.Reminders, {
        showLocation: showLocation,
      });
      const newData = {
        id: generateString(8),
        name: name,
        radius: radius,
        location: myLocationObj,
        activate: false,
      };
      const updatedData = [...getRemindersData, newData];
      dispatch(reminders(updatedData));
      handleNotification(myLocationObj);
      showSavedMessage();
    }
  };
  const showSavedMessage = () => {
    showMessage({
      message: 'Reminder has been saved successfully',
      type: 'success',
      duration: 2000,
      backgroundColor: Colors.teal,
    });
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
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.renderItemFlatlist]}
        activeOpacity={0.85}
        onPress={() => {
          // setShowLocation(item.description);
          // setSelectedLoc(true);
          setMyLocationObj(item.description);
          // handleNotification(item.description);
          rbSheetRef.current.close();
        }}>
        <Text style={styles.flatListTxt}>{item.address}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar /> */}
      <CustomHeader
        text={text}
        edit={edit}
        isEdit={isEdit}
        locationIsTrue={locationTrue}
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
          onPress={() => {
            navigation.navigate(ScreeNames.Locations);
          }}>
          <Text
            style={[
              styles.locationTxt,
              {color: myLocationObj ? Colors.black : 'gray'},
            ]}>
            {myLocationObj
              ? myLocationObj.length > 30
                ? `${myLocationObj.slice(0, 30)}...`
                : myLocationObj
              : 'Location'}{' '}
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
      <View style={styles.saveButtoncontainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            isEdit || edit ? updatedData() : savedData();
          }}>
          <Text style={styles.buttonTxt}>
            {isEdit || edit ? 'Update' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <RBSheet
        ref={rbSheetRef}
        height={550}
        openDuration={100}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={styles.rbSheetStyles}>
        <View style={styles.rbSheetContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.addButton}
            onPress={() => {
              const mapScreen = ScreeNames.MapScreen;
              const mapScreenWithParams = {
                name: ScreeNames.MapScreen,
                key: generateString(8),
              };
              const screenSelection = isEdit ? mapScreen : mapScreenWithParams;
              navigation.navigate(screenSelection, {edit: true});
              rbSheetRef.current.close();
            }}>
            <Text style={styles.addtxt}>Add</Text>
          </TouchableOpacity>
          <FlatList
            data={getLocationData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </RBSheet> */}
    </SafeAreaView>
  );
};

export default Index;
