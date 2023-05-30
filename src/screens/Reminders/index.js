import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTest, info, test} from '../../ducks/testPost';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../Reminders/styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Shadow} from 'react-native-shadow';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import {transform} from 'lodash';
import {RemindersData} from '../../utils/Data/RemindersData';
import StatusBar from '../../components/StatusBar';

const Index = ({route}) => {
  //===================== useState ============================//
  const [data, setData] = useState();
  const [swipeRow, setSwipeRow] = useState({});
  const viewref = useRef(null);
  const navigation = useNavigation();
  const SavedData = route?.params?.myName;
  const edit = true;
  const dispatch = useDispatch();
  const getRemindersData = useSelector(getTest);
  const openRowRef = useRef(null);

  // console.log(
  //   getRemindersData.indexOf(getRemindersData[2]),
  //   '========== ===mouse',
  // );
  useEffect(() => {
    setData(getRemindersData);
  }, [getRemindersData]);
  const removeItem = itemToRemove => {
    // getRemindersData.filter(item => item !== itemToRemove);
    const updatedData = getRemindersData.filter(item => item !== itemToRemove);
    // setData(updatedData);
    dispatch(test(updatedData));
    // setData(prevData => prevData.filter(item => item !== itemToRemove));
  };

  const handleViewId = () => {
    const viewId = viewref.current?.id;
    // console.log(viewId, '============viewId');
  };
  const renderItem = ({item}) => {
    // console.log(item.id, '============ data');
    const uniqueId = item.id;
    return (
      <View
        key={uniqueId}
        style={[
          styles.frontRowView,
          // {transform: [{translateX: swipeRow[item.id] || 0}]},
        ]}>
        <Text style={[styles.frontRowtxt, {color: Colors.teal}]}>
          {item.name}
        </Text>
        <Text style={[styles.frontRowtxt, {color: Colors.black}]}>
          {item.radius} km
        </Text>
      </View>
    );
  };
  const renderHiddenItem = (rowData, rowMap, item) => {
    // const uniqueId = viewref;
    // console.log(uniqueId);
    return (
      <View ref={viewref} style={styles.backRowView}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowEditView}
          onPress={() => {
            // const key = item.item.key
            rowMap[rowData.item.id].closeRow();
            // console.log(rowData.item, 'item');

            // console.log(rowMap[0], 'rowMap');
            navigation.navigate(ScreeNames.RemindersAddUpdate, {
              items: rowData.item,
              isEdit: edit,
            });
          }}>
          <Text style={styles.backRowEditTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowDeleteView}
          onPress={() => {
            Alert.alert(
              'Delete Reminder',
              'Are you sure you want to delete this reminder ?',
              [
                {
                  text: 'No',
                  onPress: () => rowMap[rowData.item.id].closeRow(),
                  style: 'default',
                },
                {
                  text: 'Yes',
                  onPress: () => removeItem(rowData.item),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text style={styles.backRowDeleteTxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ListEmptyComponent = () => (
    <View style={styles.emptytxtView}>
      <Text style={styles.emptyTxt}>Reminders will appear here</Text>
    </View>
  );

  const onRowDidOpen = (rowKey, rowMap) => {
    console.log(rowKey, 'rowKey');
    openRowRef.current = rowMap[rowKey];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <SwipeListView
        style={{marginTop: 20}}
        data={getRemindersData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        onRowDidOpen={onRowDidOpen}
      />
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.addIconViewStyles}
        onPress={() => navigation.navigate(ScreeNames.RemindersAddUpdate)}>
        <Image style={styles.addIconStyles} source={Images.general.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
