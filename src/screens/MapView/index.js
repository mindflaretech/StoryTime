import {View, Text} from 'react-native';
import React from 'react';
import StatusBr from '../../components/StatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBr />
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
