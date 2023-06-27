import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import StatusBr from '../../components/StatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {getLocation, locations} from '../../ducks/testPost';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';

navigator.geolocation = require('@react-native-community/geolocation');
const MapScreen = ({route}) => {
  // ======================== useState ========================= //
  const [textInputValue, setTextInputValue] = useState('');
  const [locationDescription, setLocationDescription] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [previousLocation, setPreviousLocation] = useState({});
  const isEdit = route?.params?.edit;
  const getLocationData = useSelector(getLocation);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchData = true;
  const mapRef = useRef(null);
  useEffect(() => {
    checkPermission();
    requestPermission();
    getCurrentLocation();
    handleMarkerPress();
    fetchAddress();
    console.log(textInputValue, '=============== locationDescription');
  }, []);
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
  const requestPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };
  Geocoder.init('AIzaSyDnXL-HCi6BSVMWCtKk8Bl3TiPfX9H57sU');
  const getAddressFromLatLng = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      console.log('Address:', address);
      return address;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchAddress = useCallback(async () => {
    const latitude = currentLocation?.latitude;
    const longitude = currentLocation?.longitude;

    if (
      latitude !== previousLocation.latitude ||
      longitude !== previousLocation.longitude
    ) {
      const address = await getAddressFromLatLng(latitude, longitude);
      console.log('Location Description:', address);
      setLocationDescription(address);
      setPreviousLocation({latitude, longitude});
    }
  }, [currentLocation, previousLocation]);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => console.log('Error', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const HandleSearchPlaces = (data, detail) => {
    const {geometry} = detail;
    const {location} = geometry;
    const latitude = location.lat;
    const longitude = location.lng;
    const description = data.description;
    const placeId = data.place_id;
    navigation.navigate(ScreeNames.RemindersAddUpdate, {
      savedLocation: description,
      locationIsTrue: true,
      edit: isEdit,
    });
    setCurrentLocation({latitude, longitude});
    const arr = [...getLocationData];
    const obj = {
      placeId: placeId,
      description: description,
      latitude: latitude,
      longitude: longitude,
      address: textInputValue,
    };
    arr.push(obj);
    dispatch(locations(arr));
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    mapRef.current.animateToRegion(region, 500);
  };
  const handleMarkerPress = () => {
    if (mapRef.current && currentLocation) {
      const region = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };

      mapRef.current.animateToRegion(region, 500);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBr />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={
          currentLocation
            ? {
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : null
        }
        onPress={event => {
          const {latitude, longitude} = event.nativeEvent.coordinate;
          setCurrentLocation({
            latitude: latitude,
            longitude: longitude,
          });
          setTextInputValue(locationDescription);
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}>
        {currentLocation && (
          <Marker
            pinColor={Colors.teal}
            coordinate={
              currentLocation
                ? {
                    latitude: currentLocation?.latitude,
                    longitude: currentLocation?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }
                : null
            }
            onPress={handleMarkerPress}
          />
        )}
      </MapView>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
        }}
        placeholder={
          textInputValue ? textInputValue : 'Search your location here'
        }
        textInputProps={{
          placeholderTextColor: Colors.teal,
          defaultValue: textInputValue,
        }}
        onPress={HandleSearchPlaces}
        query={{
          key: 'AIzaSyDnXL-HCi6BSVMWCtKk8Bl3TiPfX9H57sU',
          language: 'en',
          type: 'geocode',
          components: 'country:pk',
        }}
        currentLocation={true}
        currentLocationLabel="Current Location"
        enableHighAccuracyLocation={true}
      />
      <TouchableOpacity
        style={{backgroundColor: Colors.teal}}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate(ScreeNames.RemindersAddUpdate, {
            locationDescription: locationDescription,
            locationIsTrue: true,
            edit: isEdit,
          })
        }>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            color: Colors.white,
            fontSize: 18,
          }}>
          Location Selected
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MapScreen;
