import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLocation,
  getReminder,
  reminders,
  currentLoc,
  getCurrentLoc,
  locations,
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
import {Util} from '../../utils';

const Locations = ({route}) => {
  //===================== useState ============================//
  const [backgroundColor, setBackgroundColor] = useState();
  const viewref = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getLocationData = useSelector(getLocation);
  const openRowRef = useRef(null);

  useEffect(() => {}, []);

  const removeItem = itemToRemove => {
    const updatedData = getLocationData.filter(item => item !== itemToRemove);
    dispatch(locations(updatedData));
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
        activeOpacity={1}>
        <View style={styles.nameLocationView}>
          <Text
            style={[
              styles.frontRowtxt,
              {color: itemIsActivated ? Colors.background : Colors.teal},
            ]}>
            {rowData?.item?.landMark}
          </Text>
          <Text style={[styles.frontRowDestxt, {color: Colors.black}]}>
            {rowData?.item?.location?.address}
          </Text>
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
            const obj = {
              item: rowData.item,
              isEditable: true,
            };
            navigation.navigate(ScreeNames.AddLocation, {
              item: obj,
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
          data={getLocationData}
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
        }}>
        <Image style={styles.addIconStyles} source={Images.general.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Locations;
