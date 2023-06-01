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
import {getTest, test} from '../../ducks/testPost';
import {ScreeNames} from '../../naviagtor';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import {locationData} from '../../utils/Data/LocationData';
import {RemindersData} from '../../utils/Data/RemindersData';
import StatusBar from '../../components/StatusBar';

const Index = ({route}) => {
  // ================ useState =====================//
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const [showLocation, setShowLocation] = useState();
  const [SelectedLoc, setSelectedLoc] = useState();
  const rbSheetRef = useRef(null);
  const getRemindersData = useSelector(getTest);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const item = route?.params?.items;
  const lati = route?.params?.lati;
  // const {lati, long, descr} = route?.params;
  const itemName = route?.params?.items?.name;
  const isEdit = route?.params?.isEdit;
  const itemRadius = route?.params?.items?.radius;
  // console.log(lati, '=================== latitude');
  const [myLocation] = getRemindersData;
  useEffect(() => {
    console.log(
      myLocation,
      '============== getRemindersData on add/update screen',
    );
    if (isEdit) {
      setName(itemName);
      setRadius(itemRadius);
    }
  }, []);
  //================== creating random ID =====================//
  const updatedData = () => {
    var myData = [...getRemindersData];
    const obj = item;
    const index = getRemindersData.indexOf(obj);
    const newObj = {
      id: generateString(8),
      name: name,
      radius: radius,
      loc: showLocation,
    };

    myData.splice(index, 1, newObj);
    dispatch(test(myData));
  };
  const savedData = () => {
    let savedData = [...getRemindersData];
    let obj = {
      id: generateString(8),
      name: name,
      radius: radius,
      loc: showLocation,
    };
    savedData.push(obj);
    dispatch(test(savedData));
  };
  function generateString(length) {
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
  }
  const handleNameChange = value => {
    setName(value);
  };
  const handleRadiusChange = value => {
    setRadius(value);
  };
  const renderItem = ({item}) => {
    // const description = item.myLocation.description;
    // console.log(description, '======================= item.description');
    return (
      <TouchableOpacity
        style={[styles.renderItemFlatlist]}
        activeOpacity={0.85}
        onPress={() => {
          setShowLocation(item.myLocation.description);
          setSelectedLoc(true);
          rbSheetRef.current.close();
        }}>
        <Text style={styles.flatListTxt}>{item.myLocation.description}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleNameChange}
          value={name}
          placeholder="Name"
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={() => rbSheetRef.current.open()}>
          <Text>{SelectedLoc ? showLocation : 'Location'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleRadiusChange}
          value={radius}
          placeholder="Radius"
          keyboardType="numeric"
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
            isEdit ? updatedData() : savedData();
          }}>
          <Text style={styles.buttonTxt}>{isEdit ? 'Update' : 'Save'}</Text>
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
              navigation.navigate(ScreeNames.MapScreen);
              rbSheetRef.current.close();
            }}>
            <Text style={styles.addtxt}>Add</Text>
          </TouchableOpacity>
          <FlatList
            data={myLocation}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Index;
