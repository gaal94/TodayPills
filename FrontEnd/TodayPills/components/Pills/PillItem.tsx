import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageSourcePropType,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export interface PillProps {
  //   image: ImageSourcePropType;
  image: string;
  brand: string;
  pill: string;
}

const PillItem = (props: PillProps) => {
  const [like, setLike] = useState(false);
  //   const imagePath = require(`../../assets/images/pills/sample${props.image}.png`);
  //   console.log(imagePath);
  return (
    <View style={styles.container}>
      <View style={styles.cardcontainer}>
        <View style={styles.imagecontainer}>
          <Image source={{ uri: props.image }} style={styles.pillimage} />
        </View>
        <AntDesign
          name="hearto"
          size={12}
          color={like ? "#E2C3DC" : "#CCCCCC"}
          style={styles.likeicon}
          onPress={() => setLike(!like)}
        />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.brandname}>{props.brand}</Text>
        <Text style={styles.pillname}>{props.pill}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 5,
    marginHorizontal: 5,
    width: 70,
  },
  cardcontainer: {
    width: "100%",
    height: 65,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
    // marginBottom: 3,
  },
  imagecontainer: {
    width: "80%",
    height: "80%",
  },
  pillimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  likeicon: {
    position: "absolute",
    bottom: 2,
    right: 2,
  },
  textcontainer: {
    width: "100%",
    marginTop: 7,
    paddingHorizontal: 2,
  },
  brandname: {
    fontSize: 6,
    color: "#B7B7B7",
  },
  pillname: {
    marginTop: 2,
    fontSize: 8,
    fontWeight: "bold",
  },
});

export default PillItem;
