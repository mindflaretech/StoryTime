import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import StatusBr from '../../components/StatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentLoc,
  getCurrentLocation,
  getLocation,
  locations,
} from '../../ducks/testPost';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import {images} from '../../utils/Images/images';

navigator.geolocation = require('@react-native-community/geolocation');
const MapScreen = ({route}) => {
  // ======================== useState ========================= //
  const [textInputValue, setTextInputValue] = useState('');
  const [locationDescription, setLocationDescription] = useState();
  const getCurrentLocation = useSelector(getCurrentLoc);
  const [previousLocation, setPreviousLocation] = useState({});
  const [markerSize, setMarkerSize] = useState(initialMarkerSize);
  const currentLatitude = getCurrentLocation.latitude;
  const currentLongitude = getCurrentLocation.longitude;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: currentLatitude,
    longitude: currentLongitude,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: currentLatitude,
    longitude: currentLongitude,
  });
  const [region, setRegion] = useState({
    latitude: currentLatitude,
    longitude: currentLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const getLocationData = useSelector(getLocation);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isEdit = route?.params?.edit;
  const searchData = true;
  const mapRef = useRef(null);
  const {width, height} = Dimensions.get('window');
  const initialMarkerSize = Math.min(width, height) * 0.1;
  const newMarkerSize = Math.min(width, height) * 0.15;

  useEffect(() => {
    // console.log(
    //   markerPosition,
    //   '===================== markerPosition.0 =================',
    // );
    // console.log(region, '===================== region.0 =================');

    if (mapRef.current) {
      const region = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(region, 1000);
    }
    handleMarkerPress();
    fetchAddress();
  }, [currentLocation]);
  useEffect(() => {
    if (region !== null) {
      setMarkerSize(newMarkerSize);
    }
  }, []);
  Geocoder.init('AIzaSyDnXL-HCi6BSVMWCtKk8Bl3TiPfX9H57sU');
  const getAddressFromLatLng = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      // console.log('Address:', address);
      return address;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchAddress = useCallback(async () => {
    const latitude = currentLatitude;
    const longitude = currentLongitude;

    if (
      latitude !== previousLocation.latitude ||
      longitude !== previousLocation.longitude
    ) {
      const address = await getAddressFromLatLng(latitude, longitude);
      // console.log('Location Description:', address);
      setLocationDescription(address);
      setPreviousLocation({latitude, longitude});
      setTextInputValue(address);
    }
  }, [currentLocation, previousLocation]);
  const HandleSearchPlaces = (data, detail) => {
    const {geometry} = detail;
    const {location} = geometry;
    const latitude = location.lat;
    const longitude = location.lng;
    const description = data.description;
    const placeId = data.place_id;
    setCurrentLocation({latitude, longitude});
    const arr = [...getLocationData];
    const obj = {
      placeId: placeId,
      description: description,
      latitude: latitude,
      longitude: longitude,
      address: textInputValue,
      currentLocation: getCurrentLocation,
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
  const locationIsSelected = () => {
    navigation.navigate(ScreeNames.RemindersAddUpdate, {
      locationDescription: locationDescription,
      locationIsTrue: true,
      edit: isEdit,
    });
    const arr = [...getLocationData];
    const obj = {
      address: textInputValue,
      currentLocation: getCurrentLocation,
    };
    arr.push(obj);
    dispatch(locations(arr));
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
  const onPressMap = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log('======== MapView: OnPressEvent ========');
    console.log(event.nativeEvent.coordinate);

    setMarkerPosition({latitude, longitude});
    getAddress(latitude, longitude);
  };
  const onDragEnd = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log('======== Marker: OnDrag Marker ========');
    console.log(event.nativeEvent.coordinate);

    setMarkerPosition({latitude, longitude});
    getAddress(latitude, longitude);
  };
  const getAddress = async (latitude, longitude) => {
    const address = await getAddressFromLatLng(latitude, longitude);
    // console.log('Location Description:', address);

    setCurrentLocation({
      latitude: latitude,
      longitude: longitude,
    });
    setTextInputValue(address);
  };
  const getNewRegionAddress = async (latitude, longitude) => {
    const address = await getAddressFromLatLng(latitude, longitude);
    // console.log('New Region Description:', address);

    setCurrentLocation({
      latitude: latitude,
      longitude: longitude,
    });

    const characterLimit = 50;
    const limitedAddress = address.slice(0, characterLimit);
    setTextInputValue(limitedAddress);
  };
  const handleRegionChangeComplete = newRegion => {
    const {latitude, longitude} = newRegion;
    const currentMarkerSize = region === null ? initialMarkerSize : markerSize;
    //   // console.log('New region:', newRegion);
    setRegion(newRegion);
    getNewRegionAddress(latitude, longitude);
    if (currentMarkerSize !== newMarkerSize) {
      setMarkerSize(newMarkerSize);
    }
  };
  const handleRegionChange = newRegion => {
    setRegion(null);
  };
  const onChangeText = text => {
    setTextInputValue(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBr />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        // onPress={onPressMap}
        showsUserLocation={false}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      />
      <Marker
        coordinate={{
          latitude: markerPosition?.latitude,
          longitude: markerPosition?.longitude,
        }}
        draggable
        onDragEnd={onDragEnd}
        onPress={handleMarkerPress}
        anchor={{x: 0.5, y: 0.5}}
        centerOffset={{x: 0.5, y: 0.5}}>
        <View style={styles.markerContainer}>
          <Image
            style={[
              styles.markerImage,
              {
                width: markerSize,
                height: markerSize,
              },
            ]}
            source={images.iLocReminderLogo}
          />
        </View>
      </Marker>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        styles={{
          // textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
        }}
        minLength={10}
        placeholder="Search your location here"
        textInputProps={{
          placeholderTextColor: Colors.teal,
          value: textInputValue,
          onChangeText: onChangeText,
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
        style={styles.button}
        activeOpacity={0.85}
        onPress={locationIsSelected}>
        <Text style={styles.buttontxt}>Location is Selected</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MapScreen;
