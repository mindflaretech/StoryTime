import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../theme';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.powderBlue,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width:width,
    height:height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: width/2,
    top: height/2,
    zIndex:999
  },
  markerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  textInputContainer: {
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    // height: 'auto',
    color: '#5d5d5d',
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
    borderWidth: 0.5,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 1,
    shadowColor: Colors.teal,
  },
  buttontxt: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
