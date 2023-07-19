import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../theme';

const {width, height} = Dimensions.get('window');
const markerSize = Math.min(width, height) * 0.1;

const markerSizeX = 60;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.powderBlue,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    position: 'absolute',
    left: width / 2 - markerSizeX / 3,
    top: height / 2 - markerSizeX / 2,
  },
  markerImage: {
    resizeMode: 'contain',
    width: markerSizeX,
    height: markerSizeX,
  },
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  textInput: {
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
  topView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    // height: 50,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16,
    // marginHorizontal: 16
  },
  goBackButton: {
    marginLeft: 16,
    backgroundColor: Colors.teal,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  goBackImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  addButton: {
    marginRight: 16,
    backgroundColor: Colors.teal,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
