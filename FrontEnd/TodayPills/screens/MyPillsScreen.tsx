import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";

import { RootStackScreenProps } from "../types";
import BackgroundScreen from "./BackgroundScreen";
import Card from "../components/UI/Card";
import GoBackBtn from "../components/UI/GoBackBtn";
import { accent, primary } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import RoutineDetailList from "../components/Calendar/Routine/RoutineDetailList";

export default function MyPillsScreen({ navigation }: any) {
  // RootStackScreenProps<"MyPills">
  const addRoutinePillHandler = () => {
    navigation.navigate("Search", { userId: 1 });
  };

  return (
    <BackgroundScreen>
      <Card>
        <View style={styles.container}>
          <View style={styles.backBtn}>
            <GoBackBtn onPress={() => navigation.pop()} size={33} />
          </View>
          <ScrollView style={styles.myPillsContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                <Text style={styles.text}>내가 섭취중인 영양제</Text>
              </View>

              <Pressable onPress={addRoutinePillHandler}>
                <Ionicons name="add-circle-sharp" size={35} color={primary} />
              </Pressable>
            </View>
            <RoutineDetailList />
          </ScrollView>
        </View>
      </Card>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  backBtn: {
    marginTop: 10,
  },
  myPillsContainer: {
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    // marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  title: {
    marginStart: 10,
    // paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 30,
    // backgroundColor: "#FFEFFC",
    // backgroundColor: accent,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});