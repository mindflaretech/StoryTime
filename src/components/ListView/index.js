import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Platform,
  Animated,
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import ShimmerPlaceHolder, {
  createShimmerPlaceholder,
} from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { Images } from "../../theme";

export const ListView = ({
  data,
  renderItem,
  onRefresh,
  refreshing,
  loadMore,
  onEndReached,
  showScrollTopButton,
}) => {
  const listRef = useRef();

  useEffect(() => {}, []);

  return (
    <View>
      <FlatList
        ref={listRef}
        onEndReached={onEndReached}
        indicatorStyle="white"
        // showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        refreshing={true}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={() => {
          return (
            <View
              style={
                {
                  // height: 50,
                  // backgroundColor: "red",
                }
              }
            >
              <ActivityIndicator animating={loadMore} size={"small"} />
            </View>
          );
        }}
      />
      {showScrollTopButton && <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            // Alert.alert("Top Pressed");
            listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
          }}
        >
          <Image
            source={Images.general.topArrow}
            style={{ height: 30, width: 30, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({});
