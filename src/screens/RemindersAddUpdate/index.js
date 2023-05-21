import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from '../RemindersAddUpdate/styles';
import SaveUpdateButton from '../../components/SaveUpdateButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
const Data = [
  {
    id: 0,
    txt: 'highWay',
  },
  {
    id: 1,
    txt: 'streetView',
  },
  {
    id: 2,
    txt: 'mainRoad',
  },
  {
    id: 3,
    txt: 'streetCorner',
  },
  {
    id: 4,
    txt: 'streetCorner',
  },
];
const Index = () => {
  // ================ useState =====================//
  const [text, setText] = useState('');
  const rbSheetRef = useRef(null);
  console.log(text, '=============text');
  const handleInputChange = value => {
    setText(value);
  };

  const handleSubmit = () => {
    Alert.alert('You entered: ' + text);
  };
  const renderItem = ({item}) => {
    console.log(item.id, '============ data');
    const uniqueId = item.id;
    return (
      <View key={uniqueId} style={[styles.renderItemFlatlist]}>
        <Text style={styles.flatListTxt}>{item.txt}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputsView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleInputChange}
          value={text}
          placeholder="Name"
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.locationFieldButton}
          onPress={() => rbSheetRef.current.open()}>
          <Text>Location</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={handleInputChange}
          value={text}
          placeholder="Radius"
        />
      </View>
      <SaveUpdateButton />
      <RBSheet
        ref={rbSheetRef}
        height={300}
        openDuration={250}
        customStyles={styles.rbSheetStyles}>
          <TouchableOpacity
          activeOpacity={0.85}
          style={styles.addButton}>
          <Text style={styles.addtxt}>Add</Text>
        </TouchableOpacity>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export default Index;
