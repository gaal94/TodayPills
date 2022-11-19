import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  fetchAllSupplements,
  fetchPopularSupplements,
} from "../../API/supplementAPI";
import SimplePillCard from "../Cards/SimplePillCard";
import PillItem from "../Pills/PillItem";

const MainPill = ({ navigation }: any) => {
  const [userId, setUserId] = useState(0);
  const [mainPills, setMainPills] = useState([]);
  const [likeChanged, setLikeChanged] = useState(false);

  const getPopularSupplements = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const popularSupplements = await fetchPopularSupplements();
    // console.log(PopularSupplements);
    setMainPills(popularSupplements);
    // const userId = await AsyncStorage.getItem("@storage_UserId");
  };

  const likeChangeHandler = () => {
    setLikeChanged((likedOrNot) => !likedOrNot);
  };
  // const getAllSupplements = async () => {
  //   const currentUserId = await AsyncStorage.getItem("@storage_UserId");
  //   setUserId(parseInt(currentUserId));
  //   const allSupplements = await fetchAllSupplements();
  //   // console.log(allSupplements);
  //   setMainPills(allSupplements.slice(1, 9));
  //   // const userId = await AsyncStorage.getItem("@storage_UserId");
  // };
  // useEffect(() => {
  //   getAllSupplements();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getPopularSupplements();
      // return () => {
      // };
    }, [userId, likeChanged])
  );

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, fontFamily: "웰컴체_Bold" }}>
        실시간 인기 영양제
      </Text>

      <View style={styles.outerContainer}>
        <ScrollView style={styles.cardsContainer} horizontal={true}>
          {mainPills.map((pill, idx) => (
            <PillItem
              key={pill.supplementId}
              userId={userId}
              pillId={pill.supplementId}
              image={pill.image}
              brand={pill.brand}
              pill={pill.supplementName}
              // onPressDislike={() => console.log("좋아요취소")}
              onPressChange={likeChangeHandler}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      {/* <View style={styles.cardsContainer}>
        {mainPills.map((pill, idx) => (
          <PillItem
            key={idx}
            image={pill.image}
            brand={pill.brand}
            pill={pill.pill}
          />
          //   <SimplePillCard
          //     key={idx}
          //     image={mainPill.image}
          //     brand={mainPill.brand}
          //     pill={mainPill.pill}
          //   />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  text: {
    fontSize: 17,
    // fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
  },

  outerContainer: {
    marginHorizontal: 5,

    marginVertical: 5,
    // overflow: "hidden",
  },
  cardsContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor: "#ECF6F4",
    borderRadius: 10,
    elevation: 5,
  },
});

export default MainPill;
