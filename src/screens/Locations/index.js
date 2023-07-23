import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLocation, locations} from '../../ducks/testPost';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../Reminders/styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
import StatusBar from '../../components/StatusBar';
import CustomHeader from '../../components/Header/customHeader';
import {Util} from '../../utils';

const Locations = ({route}) => {
  //===================== useRef ============================//
  const viewref = useRef(null);
  const openRowRef = useRef(null);
  //===================== useNavigation ============================//
  const navigation = useNavigation();
  //===================== useDispatch ============================//
  const dispatch = useDispatch();
  const getLocationData = useSelector(getLocation);
  //===================== params ============================//
  const isEdit = route?.params?.isEdit;

  useEffect(() => {
    console.log(isEdit, '==========isEdit');
    // setData();
  }, []);
  const setData = () => {};

  const removeItem = itemToRemove => {
    const updatedData = getLocationData.filter(item => item !== itemToRemove);
    dispatch(locations(updatedData));
  };

  const onPressLoctionConfirm = itemData => {
    isEdit
      ? navigation.navigate(ScreeNames.RemindersAddUpdate, {
          isUpdate: isEdit,
          item: itemData,
        })
      : navigation.navigate(ScreeNames.RemindersAddUpdate, {
          item: itemData,
          isSelect: true,
        });
  };

  const renderItem = rowData => {
    const itemIsActivated = rowData.item.activate === true;
    return (
      <TouchableOpacity
        key={rowData.item.id}
        style={[
          styles.frontRowView,
          {
            backgroundColor: itemIsActivated ? Colors.teal : Colors.powderBlue,
          },
        ]}
        onPress={() => onPressLoctionConfirm(rowData?.item)}
        activeOpacity={1}>
        <View style={styles.nameLocationView}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {fontWeight: '600'},
              ]}>
              Landmark: {`   `}
            </Text>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
              ]}>
              {rowData.item.landMark}
            </Text>
          </View>
          {/* <Text
            style={[
              styles.frontRowtxt,
              {color: itemIsActivated ? Colors.background : Colors.teal},
            ]}>
            {rowData?.item?.landMark}
          </Text> */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {fontWeight: '600'},
              ]}>
              Address: {`      `}
            </Text>
            <Text
              style={[
                styles.frontRowtxt,
                {color: itemIsActivated ? Colors.background : Colors.teal},
                {flex: 1},
              ]}>
              {rowData.item.location?.address}
            </Text>
          </View>
          {/* <Text style={[styles.frontRowDestxt, {color: Colors.black}]}>
            {rowData?.item?.location?.address}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  const onPressDelete = (rowMap, rowData) => {
    Util.showAlertConfirm(
      'Delete Reminder',
      'Are you sure you want to delete this location ?',
      'Yes',
      () => {
        removeItem(rowData.item);
      },
      'No',
      () => {
        rowMap[rowData.item.id].closeRow();
      },
    );
  };

  const renderHiddenItem = (rowData, rowMap, item) => {
    return (
      <View key={rowData.item.id} ref={viewref} style={styles.backRowView}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowEditView}
          onPress={() => {
            rowMap[rowData.item.id].closeRow();
            const obj = {
              item: rowData.item,
              isEditable: true,
            };
            navigation.navigate(ScreeNames.AddLocation, {
              item: obj,
            });
          }}>
          <Text style={styles.backRowEditTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backRowDeleteView}
          onPress={() => onPressDelete(rowMap, rowData)}>
          <Text style={styles.backRowDeleteTxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptytxtView}>
      <Image
        style={styles.reminderIcon}
        source={Images.general.locationPlaceholder}
      />
      <Text style={styles.emptyTxt}>Locations will appear here</Text>
    </View>
  );

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CustomHeader text="Locations" />
      <View style={{flex: 1}}>
        <SwipeListView
          style={{marginTop: 20}}
          data={getLocationData}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
          onRowDidOpen={onRowDidOpen}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.addIconViewStyles}
        onPress={() => {
          navigation.navigate(ScreeNames.AddLocation, {
            text: 'Add Location',
          });
        }}>
        <Image style={styles.addIconStyles} source={Images.general.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Locations;
