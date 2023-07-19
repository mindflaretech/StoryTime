import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLocation,
  getReminder,
  reminders,
  currentLoc,
  getCurrentLoc,
} from '../../ducks/testPost';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../Reminders/styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Shadow} from 'react-native-shadow';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import {transform} from 'lodash';
import {RemindersData} from '../../utils/Data/RemindersData';
import StatusBar from '../../components/StatusBar';
import {images} from '../../utils/Images/images';
import CustomHeader from '../../components/Header/customHeader';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {log} from 'react-native-reanimated';

const Locations = ({route}) => {
  //===================== useState ============================//
  const [data, setData] = useState();
  const [swipeRow, setSwipeRow] = useState({});
  const [backgroundColor, setBackgroundColor] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [newReminder, setNewReminder] = useState();
  const viewref = useRef(null);
  const navigation = useNavigation();
  const SavedData = route?.params?.myName;
  const showLocation = route?.params?.showLocation;
  const dispatch = useDispatch();
  const getRemindersData = useSelector(getReminder);
  const getLocationData = useSelector(getLocation);
  const openRowRef = useRef(null);
  // const savedCurrentLocation = useSelector(getCurrentLoc);

  useEffect(() => {
    // console.log(getRemindersData, '============== get complete location data');
    // console.log(savedCurrentLocation, '========== Current Location ==========');
    // checkPermission();
    // requestLocationPermission();
    // getCurrentLocation();
    // configurePushNotification();
    // createChannel();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === 'granted') {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const checkPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.log('Permission check error:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        let location = {latitude, longitude};
        console.log(location);
        setCurrentLocation(location);
        dispatch(currentLoc(location));
      },
      error => {
        console.log('Error getting location:', error);
        if (error.code === 2) {
          // No location provider available error
          // Handle the error condition here, such as showing an error message to the user
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const removeItem = itemToRemove => {
    const updatedData = getRemindersData.filter(item => item !== itemToRemove);
    dispatch(reminders(updatedData));
  };

  const configurePushNotification = () => {
    PushNotification.configure({
      onRegister: function (token) {},
      onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {},
      onRegistrationError: function (err) {},
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  const activeReminder = itemActivate => {
    setBackgroundColor(true);
    const updatedReminders = getRemindersData.map(item => {
      if (item === itemActivate) {
        return {...item, activate: true};
      }
      return item;
    });
    dispatch(reminders(updatedReminders));
  };
  const deActivateReminder = itemDeactivate => {
    setBackgroundColor(false);
    const updatedReminders = getRemindersData.map(item => {
      if (item === itemDeactivate) {
        return {...item, activate: false};
      }
      return item;
    });
    dispatch(reminders(updatedReminders));
  };

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const handleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      date: new Date(Date.now() + 5 * 1000),
      title: 'Reminder Added Successfully',
      message: 'This is test notification from reminde me.',
      playSound: true,
      soundName: 'default',
      allowWhileIdle: true,
    });
  };
  const renderItem = rowData => {
    const itemIsActivated = rowData.item.activate === true;
    return (
      <TouchableOpacity
        key={rowData.item.id}
        style={[
          styles.frontRowView,
          {
            backgroundColor: itemIsActivated ? Colors.teal : Colors.powderBlue,
          },
        ]}
        onLongPress={() => {
          backgroundColor
            ? Alert.alert(
                'Deactivate Reminder',
                'Are you sure you want to deactivate this reminder ?',
                [
                  {
                    text: 'No',
                    style: 'default',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      deActivateReminder(rowData.item);
                    },
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              )
            : Alert.alert(
                'Activate Reminder',
                'Are you sure you want to activate this reminder ?',
                [
                  {
                    text: 'No',
                    style: 'default',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      activeReminder(rowData.item);
                    },
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
        }}
        activeOpacity={1}>
        <View style={styles.nameLocationView}>
          <Text
            style={[
              styles.frontRowtxt,
              {color: itemIsActivated ? Colors.background : Colors.teal},
            ]}>
            {rowData.item.name}
          </Text>
          <Text style={[styles.frontRowDestxt, {color: Colors.black}]}>
            {rowData.item.location}
          </Text>
        </View>
        <View style={styles.radiusView}>
          <Image style={styles.icon} source={Images.general.reminderIcon} />
          <Text style={[styles.frontRowtxt, {color: Colors.black}]}>
            {rowData.item.radius} km
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHiddenItem = (rowData, rowMap, item) => {
    return (
      <View key={rowData.item.id} ref={viewref} style={styles.backRowView}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowEditView}
          onPress={() => {
            rowMap[rowData.item.id].closeRow();
            navigation.navigate(ScreeNames.RemindersAddUpdate, {
              items: rowData.item,
              isEdit: true,
            });
          }}>
          <Text style={styles.backRowEditTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowDeleteView}
          onPress={() => {
            Alert.alert(
              'Delete Reminder',
              'Are you sure you want to delete this reminder ?',
              [
                {
                  text: 'No',
                  onPress: () => rowMap[rowData.item.id].closeRow(),
                  style: 'default',
                },
                {
                  text: 'Yes',
                  onPress: () => removeItem(rowData.item),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text style={styles.backRowDeleteTxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ListEmptyComponent = () => (
    <View style={styles.emptytxtView}>
      <Image
        style={styles.reminderIcon}
        source={Images.general.locationPlaceholder}
      />
      <Text style={styles.emptyTxt}>Locations will appear here</Text>
    </View>
  );
  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar /> */}
      <CustomHeader text="Locations" />
      <View style={{flex: 1}}>
        <SwipeListView
          style={{marginTop: 20}}
          data={getRemindersData}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
          onRowDidOpen={onRowDidOpen}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.addIconViewStyles}
        onPress={() => {
          navigation.navigate(ScreeNames.AddLocation, {
            text: 'Add Location',
          });
          // handleNotification();
        }}>
        <Image style={styles.addIconStyles} source={Images.general.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Locations;
