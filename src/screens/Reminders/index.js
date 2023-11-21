import {View, Text, TouchableOpacity, Image, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  activteReminder,
  getActiveReminder,
  getReminder,
  reminders,
} from '../../ducks/testPost';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../Reminders/styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import CustomHeader from '../../components/Header/customHeader';
import {Util} from '../../utils';
import StatusBr from '../../components/StatusBar';
import {showMessage} from 'react-native-flash-message';

const Index = () => {
  //===================== useState ==========================//
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
  // const [initialState, setInitialState] = useState(isEdit);
  // const [location, setLocation] = useState('');
  //===================== useRef ============================//
  const viewref = useRef(null);
  const openRowRef = useRef(null);
  //===================== useNavigation ============================//
  const navigation = useNavigation();
  //===================== useDispatch ============================//
  const dispatch = useDispatch();
  const getRemindersData = useSelector(getReminder);
  const getActiveReminders = useSelector(getActiveReminder);

  //===================== useEffect ============================//

  useEffect(() => {
    console.log(getActiveReminders, 'getActiveReminders');
  });

  // useEffect(() => {
  //   configurePushNotifications();
  // }, []);

  // useEffect(() => {
  //   //=================== destructuring coordinates =====================//
  //   const coordinatesList = getRemindersData
  //     .filter(reminder => reminder.activate && reminder.coordinates)
  //     .map(reminder => reminder?.coordinates);

  //   const targetLatitude = coordinatesList
  //     .map(coord => coord?.latitude)
  //     .filter(Boolean);
  //   const targetLongitude = coordinatesList
  //     .map(coord => coord?.longitude)
  //     .filter(Boolean);

  //   const decimalPlaces = 7;

  //   const roundedTargetLatitude = targetLatitude.map(lat =>
  //     parseFloat(lat.toFixed(decimalPlaces)),
  //   );
  //   const roundedTargetLongitude = targetLongitude.map(lon =>
  //     parseFloat(lon.toFixed(decimalPlaces)),
  //   );

  //   LocationUtil.getCurrentPosition(info => {
  //     setLocation(info?.coords);
  //     const targetLat = roundedTargetLatitude;
  //     const targetLng = roundedTargetLongitude;
  //     const currentLat = currentLatitude; //24.927905821426876;
  //     const currentLng = currentLongitude; //67.09590960871377;
  //     const radiusInMeters = 100;

  //     console.log(roundedTargetLatitude, '================= targetLatitudes');
  //     console.log(roundedTargetLongitude, '================= targetLongitudes');
  //     console.log(currentLat, '================= currentLatitude =====');
  //     console.log(currentLng, '================= currentLongitude ======');

  //     const distance = Util.calculateDistance(
  //       currentLat,
  //       currentLng,
  //       targetLat,
  //       targetLng,
  //       radiusInMeters,
  //     );

  //     const withinRadius = Util.isWithinRadius(
  //       currentLat,
  //       currentLng,
  //       targetLat,
  //       targetLng,
  //       radiusInMeters,
  //     );

  //     if (withinRadius) {
  //       handleNotification();
  //     } else {
  //       console.log('============= not matched =============');
  //     }
  //   }, []);
  // });

  // useEffect(() => {
  //   //============== HANDELING APPLICATIONS STATES ================//
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     const match = appState.current.match(/inactive|background/);
  //     const isActive = nextAppState === 'active';
  //     if (match && isActive) {
  //       setInitialState(false);
  //     }
  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //   });
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const handleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      date: new Date(Date.now() + 5 * 1000),
      title: 'Reminder',
      message: 'Reached',
      playSound: true,
      soundName: 'default',
      allowWhileIdle: true,
    });
  };

  const configurePushNotifications = () => {
    PushNotification.configure({
      onNotification: notification => {
        console.log('Foreground notification:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.popInitialNotification(notification => {
      if (notification) {
        console.log('Opened from background:', notification);
      }
    });
  };

  const removeItem = itemToRemove => {
    const updatedData = getRemindersData.filter(item => item !== itemToRemove);
    dispatch(reminders(updatedData));
  };

  const activeReminders = itemActivate => {
    const updatedReminders = getActiveReminders.map(item => {
      if (item.id === itemActivate?.item?.id) {
        return {...item, activate: true};
      }
      return {...item, activate: false};
    });
    dispatch(activteReminder(updatedReminders));
    showMessage({
      message: `Reminder for ${itemActivate?.item?.name} is activated`,
      type: 'success',
      duration: 2500,
      backgroundColor: Colors.teal,
    });
  };

  const deActivateReminder = itemDeactivate => {
    const updatedReminders = getActiveReminders.map(item => {
      if (item.id === itemDeactivate?.item?.id) {
        return {...item, activate: false};
      }
      return item;
    });
    dispatch(activteReminder(updatedReminders));
  };

  const onPressDeactive = rowData => {
    Util.showAlertConfirm(
      'Deactivate Reminder',
      'Are you sure you want to deactivate this reminder ?',
      'Yes',
      () => {
        if (rowData) {
          deActivateReminder(rowData);
        }
      },
      'No',
      () => {},
    );
  };

  const onPressActive = rowData => {
    Util.showAlertConfirm(
      'Activate Reminder',
      'Are you sure you want to activate this reminder ?',
      'Yes',
      () => {
        if (rowData) {
          activeReminders(rowData);
        }
      },
      'No',
      () => {},
    );
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
          console.log('Long Press Triggered');
          // itemIsActivated ? onPressDeactive(rowData) : onPressActive(rowData);
          onPressActive(rowData);
        }}
        activeOpacity={1}>
        <View style={styles.nameLocationView}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {fontWeight: '600'},
              ]}>
              Name: {`      `}
            </Text>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
              ]}>
              {rowData.item.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {fontWeight: '600'},
              ]}>
              Location: {` `}
            </Text>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {
                  flex: 1,
                },
              ]}>
              {rowData.item.location}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {fontWeight: '600'},
              ]}>
              Radius: {`     `}
            </Text>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
              ]}>
              {rowData.item.radius}m
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onPressDelete = (rowMap, rowData) => {
    Util.showAlertConfirm(
      'Delete Reminder',
      'Are you sure you want to delete this location ?',
      'Yes',
      () => {
        removeItem(rowData.item);
      },
      'No',
      () => {
        rowMap[rowData.item.id].closeRow();
      },
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
          onPress={() => onPressDelete(rowMap, rowData)}>
          <Text style={styles.backRowDeleteTxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptytxtView}>
      <Image style={styles.reminderIcon} source={Images.splash.logo} />
      <Text style={styles.emptyTxt}>Reminders will appear here</Text>
    </View>
  );

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBr />
      <CustomHeader text="Reminder" />
      <View
        style={{
          flex: 1,
        }}>
        <SwipeListView
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
          navigation.navigate(ScreeNames.RemindersAddUpdate, {
            text: 'Add Reminder',
          });
        }}>
        <Image style={styles.addIconStyles} source={Images.general.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
