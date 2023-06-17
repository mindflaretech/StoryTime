import configureStore from "./store";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DataHandler from "./utils/DataHandler";
import NetworkInfo from "./utils/NetworkInfo";
import AppNavigator from "./naviagtor";
import { Provider } from "react-redux";
import { CustomSplashScreen } from "./screens";
// import PushNotification from "react-native-push-notification";
const App = () => {
  // set store state
  const [storeState, setStore] = useState(null);

  // when store is configured
  const onStoreConfigure = (store) => {
    //init things

    DataHandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    setTimeout(() => {
      setStore(store);
    }, 3000);
    // set store state

    // hide splash
    //SplashScreen.hide();
  };

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure);

    // unscribe to all things on unmount
    return () => {
      NetworkInfo.removeNetInfoListener();
    };
  }, []);
  // PushNotification.configure({
  //   onRegister: function (token) {
  //     console.log("TOKEN:", token);
  //   },
  
  //   onNotification: function (notification) {
  //     console.log("NOTIFICATION:", notification);
  
  //     // notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },
  
  //   // onAction: function (notification) {
  //   //   console.log("ACTION:", notification.action);
  //   //   console.log("NOTIFICATION:", notification);
  
  //   // },
  
  //   // onRegistrationError: function(err) {
  //   //   console.error(err.message, err);
  //   // },
  
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },
  
  //   popInitialNotification: true,
  
  //   // requestPermissions: true,
  // });
  if (storeState === null) {
    return <CustomSplashScreen />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Provider store={storeState}>
        <AppNavigator />
      </Provider>
    </View>
  );
};

export default App;
