import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.powderBlue,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapViewContainer: {
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    // paddingVertical: 0,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  textInput: {
    // height: 'auto',
    color: '#5d5d5d',
    fontSize: 14,
  },
});
