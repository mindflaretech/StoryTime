import {View, TouchableOpacity, Image,AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors, Images} from '../../theme';
import {useSelector} from 'react-redux';
import {getCurrentLoc} from '../../ducks/testPost';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import EventEmitter from '../../utils/EventEmitter';
import StatusBr from '../../components/StatusBar';
import LocationUtil from '../../utils/LocationUtil';

navigator.geolocation = require('@react-native-community/geolocation');

Geocoder.init('AIzaSyDnXL-HCi6BSVMWCtKk8Bl3TiPfX9H57sU');

const latitudeDelta = 0.004757;
const longitudeDelta = 0.006866;

const MapScreen = ({route}) => {
  // ======================== useRef ========================= //
  const mapRef = useRef(null);
  // ======================== useNavigation ========================= //
  const navigation = useNavigation();
  // ======================== params ========================= //
  const isEdit = route?.params?.isEdit;
  const editableCoordinates = route?.params?.location?.coordinates;
  const editableLat = editableCoordinates?.latitude;
  const editableLng = editableCoordinates?.longitude;
  // ======================== useState ========================= //
  const [textInputValue, setTextInputValue] = useState('');
  const getCurrentLocation = useSelector(getCurrentLoc);
  const [coordinates, setCoordinates] = useState();
  const currentLatitude = isEdit ? editableLat : getCurrentLocation.latitude;
  const currentLongitude = isEdit ? editableLng : getCurrentLocation.longitude;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: currentLatitude,
    longitude: currentLongitude,
  });
  const [region, setRegion] = useState({
    latitude: currentLatitude,
    longitude: currentLongitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [initialState, setInitialState] = useState();
  const [location, setLocation] = useState();

  // ======================== useEffect ========================= //
  useEffect(() => {
    LocationUtil.getCurrentPosition(info => {
      console.log(info?.coords);
      setLocation(info?.coords);
      const targetLat = 24.927936826934555;
      const targetLng = 67.09590960871377;
      //   const currentLat = info?.coords?.latitude;
      const currentLat = 24.927923955091366; //24.927905821426876;
      //   const currentLng = info?.coords?.longitude;
      const currentLng = 67.09584012728392; //67.09590960871377;
      const radiusInMeters = 2;
      // const distance = Util.calculateDistance(
      //   currentLat,
      //   currentLng,
      //   targetLat,
      //   targetLng,
      //   radiusInMeters,
      // );
      // const withinRadius = Util.isWithinRadius(
      //   currentLat,
      //   currentLng,
      //   targetLat,
      //   targetLng,
      //   radiusInMeters,
      // );

      console.log(
        'Your current location is within the radius of the target location.',
        // distance,
        // withinRadius,
      );
      // if (withinRadius) {
      //   console.log('Your current location is within the radius of the target location.');
      // } else {
      //   console.log('Your current location is outside the radius of the target location.');
      // }
    });
  }, []);

  useEffect(() => {
    //============== HANDELING APPLICATIONS STATES ================//
    const subscription = AppState.addEventListener('change', nextAppState => {
      const match = appState.current.match(/inactive|background/);
      const isActive = nextAppState === 'active';
      if (match && isActive) {
        setInitialState(false);
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    let coordinates = {
      latitude: currentLatitude,
      longitude: currentLongitude,
    };

    console.log('coordinates', coordinates);
    getAddressFromCoordinates(coordinates);
  }, []);

  const getAddressFromCoordinates = async coordinates => {
    const address = await getAddressFromLatLng(
      coordinates.latitude,
      coordinates.longitude,
    );
    setTextInputValue(address);
  };

  const getAddressFromLatLng = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;

      return address;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const HandleSearchPlaces = (data, detail) => {
    const {geometry} = detail;
    const {location} = geometry;
    const latitude = location.lat;
    const longitude = location.lng;
    const description = data.description;
    const placeId = data.place_id;
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    mapRef.current.animateToRegion(region, 500);
  };

  const handleMarkerPress = () => {
    if (mapRef.current && currentLocation) {
      const region = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      };

      mapRef.current.animateToRegion(region, 500);
    }
  };

  const handleRegionChangeComplete = newRegion => {
    console.log(newRegion);
    const {latitude, longitude} = newRegion;

    let coordinates = {
      latitude: latitude,
      longitude: longitude,
    };
    getAddressFromCoordinates(coordinates);
    setCoordinates(coordinates);
  };

  const onPressAdd = () => {
    const obj = {
      address: textInputValue,
      coordinates: coordinates,
    };

    EventEmitter.notify('onLocationSelected', obj);
    navigation.goBack();
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
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}
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
          latitude: currentLatitude,
          longitude: currentLongitude,
        }}
        draggable
        onPress={handleMarkerPress}
        anchor={{x: 0.5, y: 0.5}}
        centerOffset={{x: 0.5, y: 0.5}}>
        <View style={styles.markerContainer}>
          <Image
            style={[
              styles.markerImage,
              {
                tintColor: Colors.teal,
              },
            ]}
            source={Images.splash.logo}
          />
        </View>
      </Marker>
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <Image style={styles.goBackImage} source={Images.general.back} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
          <Image style={styles.addButtonImage} source={Images.general.plus} />
        </TouchableOpacity>
      </View>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        styles={{
          textInputContainer: {},
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
        }}
        currentLocation={true}
        currentLocationLabel="Current Location"
        enableHighAccuracyLocation={true}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
