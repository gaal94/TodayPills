import axios from "axios";
import qs from "querystring";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import BackgroundScreen from "../BackgroundScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfoByEmail } from "../../API/userAPI";

const REST_API_KEY = "acdc3561e2faeeafdcf245c2d609bd5d";
let access_token: string;
// const REDIRECT_URI = `http://localhost:8080/api/user/login`;
// const REDIRECT_URI = `http://43.200.42.181/api/user/login`;
// const REDIRECT_URI = `http://localhost:8080/api/user/login`;
// const REDIRECT_URI = `http://10.0.2.2:8080/api/user/login`;
const REDIRECT_URI = "https://k7a706.p.ssafy.io/api/user/login";
const kakaoLogin_URI =
  "https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252F10.0.2.2%253A8080%252Fapi%252Fuser%252Flogin%26through_account%3Dtrue%26client_id%3Dacdc3561e2faeeafdcf245c2d609bd5d";
// const REDIRECT_URI = `https://localhost:8080/api`;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoScreen = ({ navigation }: any) => {
  // const getUser = async (event: any) => {
  //   const uid = await AsyncStorage.getItem("storage_UserId");
  //   console.log(uid);
  //   if (uid) {
  //     const { url } = event;
  //     if (!url.includes("kakao.com")) {
  //       getCode(url);
  //       return false;
  //     }
  //   }
  //   return true;
  // };
  const requestToken = async (code: string) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";
    const options = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });
    // console.log(code + "!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(options);
    try {
      console.log(requestTokenUrl);
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const ACCESS_TOKEN = tokenResponse.data.access_token;
      console.log(ACCESS_TOKEN, "THIS IS ACCESS_TOKEN");
      await AsyncStorage.setItem("@storage_ACCESS_TOKEN", ACCESS_TOKEN);
      const body = {
        ACCESS_TOKEN,
      };
      const response = await axios.post(REDIRECT_URI, body);
      const value = response.data;
      console.log(value, "haha");
      console.log(value.name);
      const userInfo = await getUserInfoByEmail(value.email);
      await AsyncStorage.setItem("@storage_UserId", String(userInfo.userId));
      await AsyncStorage.setItem("@storage_UserEmail", value.email);
      await AsyncStorage.setItem("@storage_UserNickName", value.name);
      // console.log(response);
      // console.log(value, "this is value");
      console.log(value.signup);
      if (!value.signup) {
        navigation.replace("MainScreen");
        return;
      }
      navigation.replace("LoginSuccessScreen");
      // const result = await storeUser(value);
      // if (result === "stored") {
      //   const user = await getData("user");
      //   dispatch(read_S(user));
      //   await navigation.navigate("Main");
      // }
    } catch (e) {
      console.log(e);
    }
  };
  const getCode = (target: string) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    console.log(target);
    console.log(condition);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };
  return (
    <BackgroundScreen>
      <WebView
        style={{ flex: 1 }}
        source={{
          // uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          uri: kakaoLogin_URI,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        // onMessage={async (event) => {
        //   // console.log(event);
        //   // const data = event.nativeEvent.url;
        //   const data =
        //     "http://localhost:8080/api/user/login?code=JODvqeQDcWjoopjVtFsnTjmdkaq-qnSvkqbHJjQ4aPm1peujZDopTml-8rwqpJrFWjRMJQopcBQAAAGEHQx_ng";

        //   getCode(data);
        // }}
        onShouldStartLoadWithRequest={(event) => {
          console.log(event);
          const { url } = event;
          if (!url.includes("kakao.com")) {
            getCode(url);
            return false;
          }
          return true;
          // getUser(event);
          // return true;
        }}
      />
    </BackgroundScreen>
  );
};
export default KakaoScreen;
