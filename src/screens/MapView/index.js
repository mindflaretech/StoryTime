import {View, Text, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
// import Geolocation from 'react-native-geolocation-service';

const MapScreen = ({route}) => {
  // ======================== useState ========================= //
  const [MarkerCoordinates, setMarkerCoordinates] = useState();
  const [textInputValue, setTextInputValue] = useState('');
  const isEdit = route?.params?.edit;
  const getLocationData = useSelector(getLocation);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchData = true;
  const mapRef = useRef(null);
  useEffect(() => {
    console.log(getLocationData, '=============== getLocationData of mapView');
    console.log(textInputValue, '========textInputValue');
  }, []);

  useEffect(() => {
    // const fetchCurrentPosition = async () => {
    //   try {
    //     const position = await Geolocation.getCurrentPosition(
    //       position => {
    //         console.log(position, '================ possition');
    //       },
    //       error => {
    //         // See error code charts below.
    //         console.log(
    //           error.code,
    //           error.message,
    //           '============== error Message',
    //         );
    //       },
    //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //     );
    //   } catch (error) {
    //     console.log('Error fetching current position:', error);
    //   }
    // };
    // fetchCurrentPosition();
  }, []);

  const HandleSearchPlaces = (data, detail) => {
    const {geometry} = detail;
    const {location} = geometry;
    const latitude = location.lat;
    const longitude = location.lng;
    const description = data.description;
    const placeId = data.place_id;
    // navigation.navigate(ScreeNames.RemindersAddUpdate, {
    //   savedLocation: description,
    //   locationIsTrue: true,
    //   edit: isEdit,
    // });
    setMarkerCoordinates({latitude: latitude, longitude: longitude});
    const arr = [...getLocationData];
    const obj = {
      placeId: placeId,
      description: description,
      latitude: latitude,
      longitude: longitude,
    };
    arr.push(obj);
    dispatch(locations(arr));
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    mapRef.current.animateToRegion(region, 1000);
  };
  const handleMarkerPress = () => {
    if (mapRef.current && MarkerCoordinates) {
      const region = {
        latitude: MarkerCoordinates.latitude,
        longitude: MarkerCoordinates.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };

      mapRef.current.animateToRegion(region, 1000); // Adjust the duration as per your preference
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBr />
      <MapView
        ref={mapRef}
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
        rotateEnabled={true}
        onPress={event => {
          const {latitude, longitude} = event.nativeEvent.coordinate;
          setMarkerCoordinates({
            latitude: latitude,
            longitude: longitude,
          });
          const coordinatesText = `latitude:${latitude.toFixed(
            3,
          )},longitude:${longitude.toFixed(3)}`;
          setTextInputValue(coordinatesText);
        }}>
        {MarkerCoordinates && (
          <Marker
            pinColor={Colors.teal}
            coordinate={MarkerCoordinates}
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
    </SafeAreaView>
  );
};

export default MapScreen;
