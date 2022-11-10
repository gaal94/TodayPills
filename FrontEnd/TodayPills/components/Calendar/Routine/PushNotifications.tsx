import { StyleSheet, View, Text, Switch } from "react-native";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { accent, primary, secondary } from "../../../constants/Colors";
import PillCard from "../../UI/PillCard";

import CustomBtn from "../../UI/CustomBtn";

import * as Notifications from "expo-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { fetchSupplementDetail } from "../../../API/supplementAPI";
import { fetchAllRoutineSupplements } from "../../../API/routineAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Notifications from "../../../utils/Notifications";

export interface PushProps {
  addAlarmHandler: (alarmOrNot: boolean) => void;
}

export default function PushNotifications({ addAlarmHandler }: PushProps) {
  // export default function PushNotifications({
  //   navigation,
  //   pillId,
  //   updateOrNot,
  // }: any) {
  const [userId, setUserId] = useState(0);

  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  // const getMyAllRoutineSupplements = async () => {
  //   const currentUserId = await AsyncStorage.getItem("@storage_UserId");
  //   setUserId(parseInt(currentUserId));
  //   const allMyRoutines = await fetchAllRoutineSupplements(userId);

  //   // setSupplementDetail(eachSupplementDetail);
  // };
  // const getSupplementDetail = async () => {
  //   const eachSupplementDetail = await fetchSupplementDetail(pillId);
  //   // if (eachSupplementDetail.bestTime.slice(0,2))
  //   timeConvert(eachSupplementDetail.bestTime);
  //   // setTakenTime(eachSupplementDetail.bestTime);

  //   setSupplementDetail(eachSupplementDetail);
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     // getMyAllRoutineSupplements();
  //     getSupplementDetail();

  //     // return () => {

  //     // };
  //   }, [pillId])
  // );

  const alarmToggleSwitch = () => {
    setIsAlarmEnabled((previousState) => {
      addAlarmHandler(!previousState);
      return !previousState;
    });
  };

  useEffect(() => {
    if (isAlarmEnabled) {
      const today = Date.now();
      const date = new Date(today);
      const target = new Date("Wed Nov 02 2022 13:03:30 GMT+0900 (KST)");
      const timer = Math.floor((target.getTime() - date.getTime()) / 1000);
      console.log(timer, "푸시알람시간");
      Notifications.scheduleNotificationAsync({
        content: {
          title: "오늘의 영양제",
          body: '"킬레이트 마그네슘"을 드실 시간이에요!',
        },
        trigger: {
          seconds: timer,
        },
      });

      // const myDate = new Date(Date.now() + 5 * 1000);
      // Notifications.scheduledLocalNotifications(
      //   "1",
      //   "1",
      //   myDate,
      //   "영양제 먹어요!",
      //   "마그네슘"
      // );
    }
  }, [isAlarmEnabled]);

  return (
    <PillCard height={130} width={"90%"} bgColor={"#edfbf9"}>
      <View style={styles.takenTimeInnerContainer}>
        <View style={styles.switchAlarmContainer}>
          <Text style={styles.pushAlarmName}>푸시 알람</Text>
          <Switch
            // style={{ height: "50%" }}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            trackColor={{ false: "#767577", true: accent }}
            thumbColor={isAlarmEnabled ? "white" : "#f4f3f4"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={alarmToggleSwitch}
            value={isAlarmEnabled}
          />
        </View>
        <View style={styles.alarmExplanation}>
          <Text style={styles.alarmExplText}>
            푸시 알람을 켜두시면 등록하신 시간에 맞춰 알림을 받을 수 있어요 !
          </Text>
        </View>
      </View>
    </PillCard>
  );
}

const styles = StyleSheet.create({
  takenTimeInnerContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  switchAlarmContainer: {
    flex: 1,
    flexDirection: "row",

    paddingHorizontal: 20,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pushAlarmName: {
    // marginVertical: 7,
    fontSize: 21,
    fontWeight: "bold",
  },
  alarmExplanation: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingBottom: 30,
    alignItems: "center",
  },
  alarmExplText: {
    fontSize: 13,
    color: "#FF78A3",
  },
});
