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
import StatusBar from '../../components/StatusBar';
import CustomHeader from '../../components/Header/customHeader';
// import PushNotification from 'react-native-push-notification';

const Index = ({route}) => {
  // ================ useState =====================//
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const [myLocationObj, setMyLocationObj] = useState();
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
  const location = route?.params?.location;

  useEffect(() => {
    console.log(getLocationData, ' getLocationData on add/update screen ');
    // console.log(text, '================ text');
    // console.log(edit, '================ edit');
    // console.log(locationTrue, '================ locationTrue');
    navigation.setOptions({
      title: isEdit || edit ? 'Edit Reminder' : 'Add Reminder',
    });
    if (isEdit) {
      setName(itemName);
      setRadius(itemRadius);
      setMyLocationObj(itemLocation);
    } else if (locationTrue) {
      setMyLocationObj(savedLocation);
    }
    // console.log(myLocationObj, '========== myLocationObj');
  }, [isEdit, edit, itemName, itemRadius, itemLocation, savedLocation]);

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
  const updatedData = () => {
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
    }
  };
  const savedData = () => {
    const newData = {
      id: generateString(8),
      name: name,
      radius: radius,
      location: myLocationObj,
      activate: false,
    };
    const updatedData = [...getRemindersData, newData];
    dispatch(reminders(updatedData));
  };
  const handleNameChange = value => {
    setName(value);
  };
  const handleRadiusChange = value => {
    setRadius(value);
  };
  // const handleNotification = item => {
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: 'you clicked on me' + item.description,
  //     message: item.description,
  //   });
  // };
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
        <Text style={styles.flatListTxt}>{item.description}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CustomHeader text={text} edit={edit} isEdit={isEdit} />
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleNameChange}
          value={name}
          placeholder="Name"
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={() => rbSheetRef.current.open()}>
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
        />
      </View>
      <View style={styles.saveButtoncontainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            navigation.navigate(ScreeNames.Reminders, {
              showLocation: showLocation,
            });
            isEdit || edit ? updatedData() : savedData();
          }}>
          <Text style={styles.buttonTxt}>
            {isEdit || edit ? 'Update' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={rbSheetRef}
        height={300}
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
              navigation.navigate(
                isEdit
                  ? ScreeNames.MapScreen
                  : {
                      name: ScreeNames.MapScreen,
                      key: generateString(8),
                    },
                {edit: true},
              );
              rbSheetRef.current.close();
            }}
            // onPress={() => {
            //   navigation.navigate(
            //     isEdit
            //       ? (ScreeNames.MapScreen, {edit: isEdit})
            //       : ScreeNames.MapScreen,
            //   );
            //   rbSheetRef.current.close();
            // }}
          >
            <Text style={styles.addtxt}>Add</Text>
          </TouchableOpacity>
          <FlatList
            data={getLocationData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Index;
