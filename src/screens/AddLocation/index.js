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
import {getLocation, locations} from '../../ducks/testPost';
import {ScreeNames} from '../../naviagtor';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import CustomHeader from '../../components/Header/customHeader';
import {showMessage} from 'react-native-flash-message';
import {Util} from '../../utils';
import EventEmitter from '../../utils/EventEmitter';

const AddLocation = ({route}) => {
  // ================ useState =====================//
  const [landmark, setLandmark] = useState(null);
  const [locationData, setLocationData] = useState(null);
  // ================ useSelector =====================//
  const getLocationData = useSelector(getLocation);
  // ================ useNavigation =====================//
  const navigation = useNavigation();
  // ================ useDispatch =====================//
  const dispatch = useDispatch();
  // ================ params =====================//
  const edit = route?.params?.edit;
  const locationTrue = route?.params?.locationIsTrue;
  const itemObject = route?.params?.item;
  const isEdit = itemObject?.isEditable;
  const itemCoordinates = route?.params?.items?.coordinates;

  useEffect(() => {
    EventEmitter.addListener('onLocationSelected', handleLocationSelected);
    return () => {
      EventEmitter.removeListener('onLocationSelected', handleLocationSelected);
    };
  }, []);

  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    console.log('route?.params', route?.params?.item?.item?.id);

    const lm = route?.params?.item?.item?.landMark;
    const loc = route?.params?.item?.item?.location;

    console.log('lm', lm);
    console.log('loc', loc);

    setLandmark(lm);
    setLocationData(loc);
  };

  const handleLocationSelected = location => {
    console.log('Add Location screen > location: ', location);
    setLocationData(location);
  };

  const saveLocation = () => {
    let locationsPayload = [...getLocationData];
    const newData = {
      id: Util.makeRandomString(8),
      landMark: landmark,
      location: locationData,
    };
    locationsPayload.push(newData);
    dispatch(locations(locationsPayload));
    showMessage({
      message: 'Location has been saved successfully',
      type: 'danger',
      duration: 2000,
    });

    navigation.goBack();
  };

  const updateLocation = () => {
    const itemId = route?.params?.item?.item?.id;
    const updatedIndex = getLocationData.findIndex(obj => obj.id === itemId);
    if (updatedIndex !== -1) {
      const updatedLocations = getLocationData.map(obj => {
        if (obj.id === itemId) {
          return {
            id: Util.makeRandomString(8),
            landMark: landmark,
            location: locationData,
          };
        }
        return obj;
      });
      dispatch(locations(updatedLocations));
      showMessage({
        message: 'Location has been updated successfully',
        type: 'success',
        duration: 2000,
        backgroundColor: Colors.teal,
      });
      navigation.goBack();
    }
  };

  const onPressCheckValidation = () => {
    if (!landmark) {
      showMessage({
        message: 'Landmark field must not be empty',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    if (!locationData) {
      showMessage({
        message: 'Location field must not be empty',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    // Validation Success
    console.log(landmark);
    console.log(locationData);

    if (isEdit) {
      updateLocation();
    } else {
      saveLocation();
    }
  };

  const onPressLocationField = () => {
    if (isEdit) {
      navigation.navigate(ScreeNames.MapScreen, {
        isEdit: isEdit,
        location: locationData,
      });
    } else {
      navigation.navigate(ScreeNames.MapScreen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        text={isEdit ? 'Edit Location' : 'Add Location'}
        edit={edit}
        isEdit={isEdit}
        locationIsTrue={locationTrue}
      />
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={value => {
            setLandmark(value);
          }}
          value={landmark}
          placeholder="Landmark"
          placeholderTextColor="gray"
          maxLength={30}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={onPressLocationField}>
          <Text
            style={[
              styles.locationTxt,
              {color: locationData?.address ? Colors.black : 'gray'},
            ]}>
            {locationData?.address ?? 'Location'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={onPressCheckValidation}>
          <Text style={styles.buttonTxt}>{isEdit ? 'Update' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddLocation;
