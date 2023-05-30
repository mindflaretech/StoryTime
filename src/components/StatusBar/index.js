import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../theme';

const StatusBr = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.teal} barStyle="light-content" />
    </>
  );
};

export default StatusBr;

const styles = StyleSheet.create({});
