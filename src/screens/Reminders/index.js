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
  const dispatch = useDispatch();
  const getRemindersData = useSelector(getTest);
  // console.log(data, '========== getRemindvsddsersData');
  useEffect(() => {
    setData(getRemindersData);
  }, [getRemindersData]);
  const removeItem = itemToRemove => {
    getRemindersData.filter(item => item !== itemToRemove);
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
  const renderHiddenItem = ({item}) => {
    // const uniqueId = viewref;
    // console.log(uniqueId);
    return (
      <View ref={viewref} style={styles.backRowView}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowEditView}
          onPress={() =>
            navigation.navigate(ScreeNames.RemindersAddUpdate, {
              // itemId: handleViewId,
              items: item,
            })
          }>
          <Text style={styles.backRowEditTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowDeleteView}
          onPress={() => {
            {
              removeItem(item);
            }
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <SwipeListView
        style={{marginTop: 20}}
        data={getRemindersData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
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
