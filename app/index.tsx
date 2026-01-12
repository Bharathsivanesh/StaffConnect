import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import "../global.css";
import Mystack from "./navigation/rootnavigation";

const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };
  useEffect(() => {
    requestUserPermission();
    messaging()
      .getToken()
      .then(async (token) => {
        console.log("FCM Token:", token);

        // Store token in Firestore
        await firestore()
          .collection("deviceTokens")
          .doc(token) // document name = token
          .set({
            createdAt: new Date(),
            token: token,
          });

        console.log("Token stored in Firestore!", token);
      })
      .catch((err) => {
        console.log("Error getting token:", err);
      });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Mystack />
    </>
  );
};
export default App;
