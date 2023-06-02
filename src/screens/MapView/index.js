import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import StatusBr from '../../components/StatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {getTest, test} from '../../ducks/testPost';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';

const MapScreen = () => {
  // ======================== useState ========================= //
  const [des, setDes] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const getRemindersData = useSelector(getTest);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchData = true;
  useEffect(() => {
    console.log(
      getRemindersData,
      '=================== getRemindersData of mapView',
    );
  }, []);
  const HandleSearchPlaces = (data, detail) => {
    const {geometry} = detail;
    const {location} = geometry;
    const latitude = location.lat;
    const longitude = location.lng;
    const description = data.description;
    const placeId = data.place_id;
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Description:', description);
    console.log('PlaceId:', placeId);
    // setDes(description);
    // setLat(latitude);
    // setLng(longitude);
    navigation.navigate(ScreeNames.RemindersAddUpdate, {
      savedLocation: description,
      location: true,
    });
    const arr = [];
    const a = [...getRemindersData];
    const obj = {
      placeId: placeId,
      description: description,
      latitude: latitude,
      longitude: longitude,
    };
    arr.push(obj);
    a.push(...arr);
    dispatch(test(a));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBr />
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
        }}
        placeholder="Search your location here"
        textInputProps={{
          placeholderTextColor: Colors.teal,
        }}
        onPress={HandleSearchPlaces}
        query={{
          key: 'AIzaSyDnXL-HCi6BSVMWCtKk8Bl3TiPfX9H57sU',
          language: 'en',
          type: 'geocode',
        }}
      />
      {/* <View style={styles.mapViewContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 24.9125026,
            longitude: 67.0307375,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>
          <Marker
            coordinate={{
              latitude: 24.9125026,
              longitude: 67.0307375,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </MapView>
      </View> */}
    </SafeAreaView>
  );
};

export default MapScreen;
