import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTest, info, test} from '../../ducks/testPost';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../Reminders/styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import {transform} from 'lodash';

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
];
const Index = () => {
  //===================== useState ============================//
  const [data, setData] = useState(Data);
  const [swipeRow, setSwipeRow] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getRemindersData = useSelector(getTest);
  // useEffect(() => {
  //   // const arr = [];
  //   // arr.push()
  //   setData(getRemindersData);
  //   // console.log(getRemindersData);
  // }, [getRemindersData]);
  const removeItem = itemToRemove => {
    setData(prevData => prevData.filter(item => item !== itemToRemove));
  };
  const renderItem = ({item}) => {
    console.log(item.id, '============ data');
    const uniqueId = item.id;
    return (
      <View
        key={uniqueId}
        style={[
          styles.frontRowView,
          // {transform: [{translateX: swipeRow[item.id] || 0}]},
        ]}>
        <Text style={styles.frontRowtxt}>{item.txt}</Text>
      </View>
    );
  };
  const renderHiddenItem = ({item}) => (
    <View style={styles.backRowView}>
      <TouchableOpacity activeOpacity={0.85} style={styles.backRowEditView}>
        <Text style={styles.backRowEditTxt}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.backRowDeleteView}
        onPress={() => {
          {
            removeItem(item);
            //  setSwipeRow(item.key);
          }
        }}>
        <Text style={styles.backRowDeleteTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const ListEmptyComponent = () => (
    <View style={styles.emptytxtView}>
      <Text style={styles.emptyTxt}>Reminders will appear here</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        style={{marginVertical: 20}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListEmptyComponent={ListEmptyComponent}
        // onSwipeValueChange={swipeData => {
        //   const {key, value} = swipeData;
        //   setSwipeRow(prevState => ({
        //     ...prevState,
        //     [key]: value,
        //   }));
        // }}
        // onSwipeValueChange={swipweData => setSwipeRow(swipweData.value)}
        // onRowOpen={rowKey => setSwipeRow(rowKey)}
        // onRowClose={() => setSwipeRow(null)}
      />
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.addIconViewStyles}
        onPress={() => navigation.navigate(ScreeNames.RemindersAddUpdate)}
        // onPress={() =>
        //   dispatch(
        //     test({name: 'streetView'}),
        //     console.log(getRemindersData, '========== newRemindersdata'),
        //   )
        // }
      >
        <Image style={styles.addIconStyles} source={Images.general.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

{
  /* <TouchableOpacity onPress={() => dispatch(info({name: 'syed'}))}>
<Text style={{padding: 40}}>index</Text>
</TouchableOpacity>
<View
style={{
  marginTop: 10,
}}
onPress={() => dispatch(info({name: 'shah'}))}>
<Text style={{padding: 40}}>{getInfoData?.name}</Text>
</View> */
}
