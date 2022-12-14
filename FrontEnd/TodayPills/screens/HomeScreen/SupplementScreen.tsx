import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  ToastAndroid,
} from 'react-native';
import BackgroundScreen2 from '../BackgroundScreen2';
import Card from '../../components/UI/Card';
import GoBackBtn from '../../components/UI/GoBackBtn';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { fetchLikeUsers, like, dislike } from "../../API/likeAPI";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRecommendation } from "../../API/supplementAPI";
import PillItem from "../../components/Pills/PillItem";
import { AiAnalysis } from "../../components/Data/AiAnalysis";
import { findCommonQuestion } from '../../API/userAPI';

export default function SupplementScreen({ navigation, route }: any) {
  const [ingredientStretch, setIngredientStretch] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [userId, setUserId] = useState(0);
  const [pill, setPills]: any = useState({});
  const [similarPills, setSimilarPills] = useState([]);
  const [userNickName, setUserNickName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [likeChanged, setLikeChanged] = useState(false);
  const [AiPapers, setAiPapers] = useState([]);
  const naverSearch = () => {
    Linking.openURL(
      `https://msearch.shopping.naver.com/search/all?query=${pill.supplementName}&frm=NVSHSRC&vertical=home&fs=true`
    );
  };
  const getLikeOrNot = async () => {
    const likeUsersList = await fetchLikeUsers(route.params.supplementId);
    if (likeUsersList.length === 0) {
      setIsLiked(false);
    } else {
      likeUsersList.includes(userId) ? setIsLiked(true) : setIsLiked(false);
    }
    setLikeCnt(likeUsersList.length);
  };

  const likeHandler = async () => {
    await like(userId, route.params.supplementId);
    setIsLiked(true);
    ToastAndroid.show('???????????? ?????? Pick??? ??????????????????.', 3);
  };

  const dislikeHandler = async () => {
    await dislike(userId, route.params.supplementId);
    setIsLiked(false);
    ToastAndroid.show('???????????? ?????? Pick?????? ??????????????????.', 3);
  };

  const likeChangeHandler = () => {
    setLikeChanged((likedOrNot) => !likedOrNot);
  };
	
	const userRecommendation = async () => {
		const nickName = await AsyncStorage.getItem("@storage_UserNickName");
		const Id = await AsyncStorage.getItem("@storage_UserId");
		setUserNickName(nickName);
		setUserId(parseInt(Id));
		const recommendation = await fetchRecommendation(route.params.supplementId, Id);
		setPills(recommendation.supplement);
		setSimilarPills(recommendation.similar);
	};

	const aiSetting = async () => {
		const answerSheet = await findCommonQuestion(userId);
		const Ai = [];
		if (answerSheet.pregnant) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 7]);
			} else if (pill.category === "??????") {
				Ai.push(["??????", 2]);
			}
		}
		if (answerSheet.menopause) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 3]);
			}
		}
		if (answerSheet.smoking) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 3]);
			}
		}
		if (answerSheet.drink !== 0) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 2]);
			}
		}
		if (answerSheet.allergy.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 0]);
			}
		}
		if (answerSheet.allergy.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 1]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 1]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "???????????????") {
				Ai.push(["???????????????", 1]);
			} else if (pill.category === "????????? C") {
				Ai.push(["????????? C", 5]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 3]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 4]);
			} else if (pill.category === "?????????") {
				Ai.push(["?????????", 0]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 11]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 5]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			} else if (pill.category === "?????????") {
				Ai.push(["?????????", 1]);
			} else if (pill.category === "?????????3") {
				Ai.push(["?????????3", 4]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 2]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 5]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 6]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			}
		}
		if (answerSheet.symptom.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 3]);
			} else if (pill.category === "??????") {
				Ai.push(["??????", 3]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "???????????????") {
				Ai.push(["???????????????", 3]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 3]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? C") {
				Ai.push(["????????? C", 1]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? C") {
				Ai.push(["????????? C", 3]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? C") {
				Ai.push(["????????? C", 0]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? C") {
				Ai.push(["????????? C", 3]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 10]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 8]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "???????????????") {
				Ai.push(["???????????????", 0]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			}
		}
		if (answerSheet.disease.includes("??????")) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 6]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "???????????????") {
				Ai.push(["???????????????", 2]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 0]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 1]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 0]);
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 1]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 0]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 3]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.medicine.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 6]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.toughActivity) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 9]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			} else if (pill.category === "?????????") {
				Ai.push(["?????????", 6]);
			}
		}
		if (answerSheet.outdoor_activity === 0) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 2]);
			}
		} else if (answerSheet.outdoor_activity === 3) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 1]);
			}
		} else  {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 3]);
			}
		}
		if (answerSheet.lack.includes("??????") || answerSheet.lack.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 0]);
			}
		}
		if (answerSheet.lack.includes("??????") || answerSheet.lack.includes("??????")) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 0]);
			}
		}
		if (answerSheet.preferred_brand.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 4]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 0]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? C") {
				Ai.push(["????????? C", 2]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "???????????????") {
				Ai.push(["???????????????", 0]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 4]);
			} else if (pill.category === "????????? D") {
				Ai.push(["????????? D", 7]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 3]);
			} else if (pill.category === "?????????") {
				Ai.push(["?????????", 11]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 8]);
			} else if (pill.category === "??????") {
				Ai.push(["??????", 3]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 5]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? D") {
				Ai.push(["????????? D", 4]);
			} else if (pill.category === "?????????") {
				Ai.push(["?????????", 5]);
			}
		}
		if (answerSheet.problem.includes("???")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 2]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 2]);
			} else if (pill.category === "?????????3") {
				Ai.push(["?????????3", 4]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 1]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 1]);
			} else if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			}
		}
		if (answerSheet.problem.includes("???")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 0]);
				Ai.push(["?????????", 1]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????????") {
				Ai.push(["????????????", 3]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "?????????") {
				Ai.push(["?????????", 0]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "????????? B") {
				Ai.push(["????????? B", 6]);
			}
		}
		if (answerSheet.problem.includes("??????")) {
			if (pill.category === "??????") {
				Ai.push(["??????", 3]);
			}
		}
		return Ai;
	};

  const analysisRecommendation = async () => {
    const Ai = await aiSetting();
    setAiPapers(Ai);
    setIsLoading(true);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
      getLikeOrNot();
      userRecommendation();
    }, [route.params.supplementId, isLiked])
  );

  useFocusEffect(
    useCallback(() => {
      analysisRecommendation();
    }, [pill])
  );

	return (
		<BackgroundScreen2>
			<Card>
				{
					isLoading ?
					<View style={styles.container}>
						<View style={styles.gobackcontainer}>
							<GoBackBtn
								onPress={() => navigation.goBack()}
								size={33}
							/>
						</View>
						<View style={styles.titlecontainer}>
							<Text style={styles.title}>
								{pill.supplementName}
							</Text>
						</View>
						<ScrollView>
							<View style={styles.imagecontainer}>
								<Image
									source={{ uri: pill.image }}
									style={styles.image}
								/>
								<Pressable
									style={styles.navercontainer}
									onPress={() => naverSearch()}
								>
									<Text style={styles.navertext}>
										?????????
									</Text>
									<Text style={styles.navertext}>
										??????
									</Text>
									<Entypo
										name="magnifying-glass"
										size={30}
										color="#a2a3f5"
										style={styles.navericon}
									/>
								</Pressable>
								<Pressable
									style={styles.likecontainer}
									onPress={() => isLiked ? dislikeHandler() : likeHandler()}
								>
									<Text style={styles.liketext}>
										?????????
									</Text>
									<Image
										source={
											isLiked
												? require("../../assets/images/heartOn3.png")
												: require("../../assets/images/heartOff1.png")
										}
										style={styles.like}
									/>
									<Text style={styles.likecount}>
										{likeCnt}
									</Text>
								</Pressable>
							</View>
							<View style={styles.textcontainer}>
								<View style={styles.flexrow}>
									<View	style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												????????????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text style={styles.contenttext}>
												{pill.category}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												?????????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.brand}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<Pressable
											style={styles.ingredienthead}
											onPress={() => setIngredientStretch(!ingredientStretch)}
										>
											<Text style={styles.headtext}>
												?????????
											</Text>
										</Pressable>
									</View>
									<View style={styles.contentcontainer}>
										<Pressable
											style={styles.ingredientcontent}
											onPress={() => setIngredientStretch(!ingredientStretch)}
										>
											{
												ingredientStretch ?
												<View>
													{pill.ingredients.split(" / ").map((ingredient, idx) =>
														<Text
															key={idx}
															style={styles.contenttext}
														>
															?? {ingredient}
														</Text>
													)}
													<AntDesign name="upcircle" size={19} color="grey" style={styles.unstretch} />
												</View> :
												<View style={styles.flexrow}>
													<Text
														style={styles.ingredientcontenttext}
														numberOfLines={1}
														ellipsizeMode={"tail"}
													>
														?? {pill.ingredients}
													</Text>
													<AntDesign name="downcircle" size={19} color="grey" />
												</View>
											}
										</Pressable>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.ingredienthead}>
											<Text style={styles.headtext}>
												??????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.ingredientcontent}>
											<Text
												style={styles.contenttext}
											>
												{pill.additionalEfficacy}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												?????? ?????? ??????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.note}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												??????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.amount}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												1??? ?????????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.requiredCount}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												??????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{
													pill.formula === "capsule" ?
														"??????" :
														pill.formula === "liquid" ?
															"??????" :
															pill.formula === "chewable" ?
																"??????" :
																pill.formula === "powder" ?
																	"??????" :
																	pill.formula === "spray" ?
																	"????????????" : null
												}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.ingredienthead}>
											<Text style={styles.headtext}>
												????????????
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.ingredientcontent}>
											<Text style={styles.contenttext}>
												{pill.caution}
											</Text>
										</View>
									</View>
								</View>
							</View>
							<View style={styles.similartextcontainer}>
								<Image
									source={require("../../assets/images/similar.png")}
									style={styles.similarimage}
								/>
								<View style={styles.textjustify}>
									<Text style={styles.similartext}>
										{userNickName}?????? ????????? ?????????
									</Text>
									<Text style={styles.similartext}>
										??? ????????? ??????????????? ?????????
									</Text>
								</View>
							</View>
							<View style={styles.similarpillcontainer}>
                {similarPills.map((pill, idx) => {
                  if (!pill) return;
                  return (
                    <PillItem
                      key={idx}
                      userId={userId}
                      pillId={pill.supplementId}
                      image={pill.image}
                      brand={pill.brand}
                      pill={pill.supplementName}
                      onPressChange={likeChangeHandler}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
								{
									AiPapers.length > 0 &&
									<View style={styles.similartextcontainer}>
										<Image
											source={require("../../assets/images/aipaper.png")}
											style={styles.aiimage}
										/>
										<View style={styles.textjustify}>
											<Text style={styles.similartext}>
												{userNickName}?????? ????????????
											</Text>
											<Text style={styles.similartext}>
												?????? ?????? ????????? ???????????????
											</Text>
										</View>
									</View>
								}
								{
									AiPapers.map((AiPaper, idx) =>
										<View
											key={idx}
											style={styles.aicontainer}
										>
											<Text
												style={styles.aitext}
												onPress={async () => {
													if (navigation.jumpTo) await navigation.jumpTo('Ai');
													await navigation.navigate('AiQnaScreen', {
														nutId: pill.supplementId,
														nutrient: AiPaper[0],
														stretch: AiPaper[1],
													});
												}}
											>
												{AiAnalysis[AiPaper[0]][AiPaper[1]][0]}
											</Text>
										</View>
									)
								}
							<View style={styles.height} />
						</ScrollView>
					</View> :
					<View style={styles.loadingspinnercontainer}>
						<Image
							source={require("../../assets/images/loadingspinner.gif")}
							style={styles.loadingspinner}
						/>
					</View>
				}
			</Card>
		</BackgroundScreen2>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 1000,
		paddingTop: 10,
	},
	gobackcontainer: {
		marginLeft: 10,
	},
	titlecontainer: {
		alignItems: "center",
	},
	title: {
		width: "90%",
		fontSize: 25,
		overflow: "hidden",
		textAlign: "center",
		fontFamily: "?????????_Bold",
	},
	imagecontainer: {
		position: "relative",
		width: "100%",
		height: 200,
		alignItems: "center",
		marginVertical: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	navercontainer: {
		position: "absolute",
		top: 10,
		right: 20,
	},
	navertext: {
		textAlign: "center",
		fontSize: 15,
		fontFamily: "?????????_Regular",
		color: "#a2a3f5"
	},
	likecontainer: {
		position: "absolute",
		bottom: 10,
		right: 17.5,
	},
	liketext: {
		textAlign: "center",
		fontSize: 15,
		fontFamily: "?????????_Regular",
		color: "pink",
		marginVertical: -5,
	},
	like: {
		width: 45,
		height: 45,
	},
	likecount: {
		textAlign: "center",
		fontSize: 15,
		fontFamily: "?????????_Regular",
		marginTop: -5,
	},
	navericon: {
		alignSelf: "center",
	},
	textcontainer: {
		width: "90%",
		alignSelf: "center",
	},
	headcontainer: {
		width: "30%",
		borderRightWidth: 1,
		borderRightColor: "grey",
		marginBottom: -1,
	},
	contentcontainer: {
		width: "70%",
		paddingLeft: 10,
		marginBottom: -1,
	},
	line: {
		height: 1,
		backgroundColor: "#F5F5F5",
		width: "102%",
	},
	head: {
		height: 30,
		// alignItems: "center",
		justifyContent: "center",
		paddingVertical: 5,
		paddingHorizontal: 7,
	},
	content: {
		height: 30,
		justifyContent: "center",
		paddingVertical: 5,
		paddingHorizontal: 7,
	},
	headtext: {
		fontSize: 18,
		fontFamily: "?????????_Bold",
	},
	contenttext: {
		fontSize: 17,
		fontFamily: "?????????_Regular",
		lineHeight: 20,
		marginRight: 8,
	},
	ingredienthead: {
		// alignItems: "center",
		paddingVertical: 5,
		paddingHorizontal: 7,
	},
	ingredientcontent: {
		paddingVertical: 5.5,
		paddingHorizontal: 7,
	},
	ingredientcontenttext: {
		width: "85%",
		fontSize: 17,
		fontFamily: "?????????_Regular",
	},
	similartextcontainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 5,
		marginHorizontal: 12,
	},
	similarimage: {
		width: 50,
		height: 60,
		resizeMode: "contain",
		marginLeft: 3.5,
		marginRight: 9,
	},
	similartext: {
		width: "100%",
		fontSize: 18,
		fontFamily: "?????????_Bold",
	},
	similarpillcontainer: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-evenly",
    backgroundColor: "#ECF6F4",
    borderRadius: 10,
    elevation: 5,
		alignSelf: "center",
		// marginHorizontal: 20,
	},
	flexrow: {
		flexDirection: "row",
	},
	unstretch: {
		alignSelf: "flex-end",
		marginTop: 5,
		marginRight: 20,
	},
	aicontainer: {
		width: "90%",
		alignSelf: "center",
		// paddingHorizontal: 10,
		// marginHorizontal: 20,
	},
	aiimage: {
		width: 50,
		height: 60,
		resizeMode: "contain",
		// marginLeft: 3.5,
		// marginRight: 10,
		marginLeft: 8.5,
		marginRight: 4,
	},
	aitext: {
		width: "100%",
    backgroundColor: "#ECF6F4",
		elevation: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		fontSize: 17,
		fontFamily: "?????????_Regular",
		borderRadius: 10,
		marginBottom: 8,
	},
	height: {
		height: 430,
	},
	textjustify: {
		height: 60,
		justifyContent: "flex-end",
		paddingBottom: 1,
	},
	loadingspinnercontainer: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingspinner: {
    width: 200,
    height: 200,
	},
});
