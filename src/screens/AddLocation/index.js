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
import {
  getLocation,
  getReminder,
  locations,
  reminders,
} from '../../ducks/testPost';
import {ScreeNames} from '../../naviagtor';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import {locationData} from '../../utils/Data/LocationData';
import {RemindersData} from '../../utils/Data/RemindersData';
import PushNotification from 'react-native-push-notification';
import StatusBar from '../../components/StatusBar';
import CustomHeader from '../../components/Header/customHeader';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {showMessage} from 'react-native-flash-message';

const AddLocation = ({route}) => {
  // ================ useState =====================//
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const [myLocationObj, setMyLocationObj] = useState();
  const [locationData, setLocationData] = useState();
  const [showLocation, setShowLocation] = useState();
  const [SelectedLoc, setSelectedLoc] = useState();
  const [previousLocationCoords, setPreviousLocationCoords] = useState();
  // ================ useRef =====================//
  const rbSheetRef = useRef(null);
  // ================ useSelector =====================//
  const getLocationData = useSelector(getLocation);
  const getRemindersData = useSelector(getReminder);
  // ================ useNavigation =====================//
  const navigation = useNavigation();
  // ================ useDispatch =====================//
  const dispatch = useDispatch();
  // ================ params =====================//
  const edit = route?.params?.edit;
  const text = route?.params?.text; // screen title
  const locationTrue = route?.params?.locationIsTrue;
  // const item = route?.params?.items;
  const isEdit = route?.params?.isEditlocation;
  const itemLocation = route?.params?.items?.location;
  const itemObject = route?.params?.item;
  const itemLandmark = route?.params?.items?.landMark;
  const itemCoordinates = route?.params?.items?.coordinates;
  const savedLocation = route?.params?.savedLocation;
  const locationDescription = route?.params?.locationDescription;
  const location = route?.params?.locationObj?.address;
  const locationCoords = route?.params?.locationObj?.coordinates;
  const locationIsSelected = route?.params?.locationSelected;
  useEffect(() => {
    console.log(itemObject, '================ locationCoords');
    navigation.setOptions({
      title: isEdit ? 'Edit Location' : 'Add Location',
    });
    setLocationData(location);
    setPreviousLocationCoords(locationCoords);
    if (isEdit) {
      setLocationData(itemLocation);
      setName(itemLandmark);
    } else if (locationTrue) {
      setMyLocationObj(savedLocation);
      setMyLocationObj(locationDescription);
    } else if (locationIsSelected) {
      setMyLocationObj(location);
    }
    const recentLocation = getLocationData[getLocationData.length - 1];
    if (recentLocation) {
      const recentAddress = recentLocation.address;
      console.log(recentAddress);
      setMyLocationObj(recentAddress);
    }
  }, [
    locationIsSelected,
    location,
    isEdit,
    // edit,
    itemName,
    itemRadius,
    itemLocation,
    savedLocation,
    locationDescription,
    itemLandmark,
    itemCoordinates,
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
  const setData = () => {
    const itemId = route?.params?.items?.id;
    const itemName = route?.params?.items?.name;
    const itemRadius = route?.params?.items?.radius;
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
  const updatedLocation = () => {
    if (name === '' || locationData === '') {
      showMessage({
        message: 'Field cannot be empty',
        type: 'success',
        duration: 2000,
        backgroundColor: Colors.teal,
      });
    } else {
      navigation.navigate(ScreeNames.Locations, {
        showLocation: showLocation,
      });
      const updatedIndex = getLocationData.findIndex(obj => obj.id === itemId);
      if (updatedIndex !== -1) {
        const updatedLoc = getLocationData.map(obj => {
          if (obj.id === itemId) {
            return {
              id: generateString(8),
              landMark: name,
              location: locationData,
            };
          }
          return obj;
        });
        dispatch(locations(updatedLoc));
      }
    }
  };
  const savedLocations = () => {
    if (name === '' || locationData === '') {
      showMessage({
        message: 'Field cannot be empty',
        type: 'success',
        duration: 2000,
        backgroundColor: Colors.teal,
      });
    } else {
      navigation.navigate(ScreeNames.Locations, {
        showLocation: showLocation,
      });
      let loc = [...getLocationData];
      const newData = {
        id: generateString(8),
        landMark: name,
        location: location,
        coordinates: previousLocationCoords,
      };
      loc.push(newData);
      dispatch(locations(loc));
      showSavedLocationMessage();
    }
  };
  const showSavedLocationMessage = () => {
    showMessage({
      message: 'Location has been saved successfully',
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
        text={isEdit || locationIsSelected ? 'Edit Location' : text}
        edit={edit}
        isEdit={isEdit}
        locationIsTrue={locationTrue}
      />
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleNameChange}
          value={name}
          placeholder="Landmark"
          placeholderTextColor="gray"
          maxLength={30}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={() => {
            if (isEdit) {
              navigation.navigate(ScreeNames.MapScreen, {
                isEdit: isEdit,
                previousLocation: itemCoordinates,
              });
            } else {
              navigation.navigate(ScreeNames.MapScreen);
            }
          }}>
          <Text
            style={[
              styles.locationTxt,
              {color: myLocationObj ? Colors.black : 'gray'},
            ]}>
            {locationIsSelected || isEdit ? locationData : 'Location'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtoncontainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            isEdit ? updatedLocation() : savedLocations();
          }}>
          <Text style={styles.buttonTxt}>{isEdit ? 'Update' : 'Save'}</Text>
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

export default AddLocation;
