// import EditScreenInfo from "../components/EditScreenInfo";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CalendarView from "../components/Calendar/CalendarView";
import Card from "../components/UI/Card";
import { RootTabScreenProps } from "../types";
import BackgroundScreen from "./BackgroundScreen";

export default function CalendarScreen({
  navigation,
}: RootTabScreenProps<"Calendar">) {
  return (
    <BackgroundScreen>
      <Card>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <Text style={styles.name}>정서 </Text>님의 캘린더
            </Text>
            {/* <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          /> */}
            {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
          </View>
          <View style={styles.calendarOuterContainer}>
            <View style={styles.calendarContainer}>
              <CalendarView />
            </View>
          </View>
        </ScrollView>
      </Card>
      {/* <View style={styles.titleContainer}></View> */}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    height: 80,
    paddingTop: 30,
    // alignItems: "center",
    // justifyContent: "center",
  },
  calendarOuterContainer: {
    height: 400,

    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarContainer: {
    height: "100%",
    // backgroundColor: "red",
    width: "80%",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
