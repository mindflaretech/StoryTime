import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../RemindersAddUpdate/styles';
import SaveUpdateButton from '../../components/SaveUpdateButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {getTest, test} from '../../ducks/testPost';
import {ScreeNames} from '../../naviagtor';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import {locationData} from '../../utils/Data/LocationData';
import {RemindersData} from '../../utils/Data/RemindersData';

const Index = ({route}) => {
  // ================ useState =====================//
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const rbSheetRef = useRef(null);
  const getRemindersData = useSelector(getTest);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemId = route?.params?.items.name;
  console.log(itemId?.name, '=================== itemsId');
  useEffect(() => {
    console.log(getRemindersData, '============== getRemindersData');
  }, []);
  console.log(name, '=============name');
  console.log(radius, '=============radius');
  const handleNameChange = value => {
    setName(value);
  };
  const handleRadiusChange = value => {
    setRadius(value);
  };
  const handleSubmit = () => {
    Alert.alert('You entered: ' + name);
  };
  const valueName = () => {
    return route?.params === null ? name : itemId.name;
  };
  const valueRadius = () => {
    return route?.params === null ? radius : itemId.radius;
  };
  const renderItem = ({item}) => {
    // console.log(item.id, '============ bottomSheet locations');
    const uniqueId = item.id;
    return (
      <TouchableOpacity
        key={uniqueId}
        style={[styles.renderItemFlatlist]}
        activeOpacity={0.85}>
        <Text style={styles.flatListTxt}>{item.loc}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleNameChange}
          // value={valueName()}
          value={name}
          placeholder="Name"
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={() => rbSheetRef.current.open()}>
          <Text>Location</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleRadiusChange}
          // value={valueRadius()}
          value={radius}
          placeholder="Radius"
        />
      </View>
      <View style={styles.saveButtoncontainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            navigation.navigate(ScreeNames.Reminders, {
              // savedData: RemindersData,
            });
            let savedData = [...getRemindersData];
            let obj = {
              name: name,
              radius: radius,
            };
            savedData.push(obj);
            dispatch(test(savedData));
          }}>
          <Text style={styles.buttonTxt}>Save</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={rbSheetRef}
        height={300}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={styles.rbSheetStyles}>
        <View style={styles.rbSheetContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.addButton}>
            <Text style={styles.addtxt}>Add</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <FlatList
              data={locationData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Index;
