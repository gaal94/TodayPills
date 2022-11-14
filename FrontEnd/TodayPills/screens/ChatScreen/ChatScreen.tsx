import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import BackgroundScreen from '../BackgroundScreen';
import { GiftedChat } from 'react-native-gifted-chat';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
var stompClient = null;
const arrr = [
  {
    _id: '1',
    text: 'hahaha',
    user: { _id: 1 },
    createdAt: new Date(),
    username: 'haha',
  },
];
const ChatScreen = () => {
  const [publicChats, setPublicChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [userData, setUserData] = useState({
    username: 'wjdtj',
    // receivername: "wjdtj",
    connected: false,
    message: 'hello',
  });
  const loadUserNickName = async () => {
    let name = await AsyncStorage.getItem('@storage_UserNickName');
    setUserData({
      username: name,
      connected: false,
      message: 'hello',
    });
  };
  useEffect(() => {
    loadUserNickName();
  }, []);
  const connect = () => {
    let Sock = new SockJS('http://k7a706.p.ssafy.io:8080/wss');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    console.log('연결시도!!');
    setUserData({ ...userData, connected: true });
    stompClient.subscribe('/chatroom/vitaminB', onMessageReceived);
    userJoin();
  };
  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    };
    stompClient.send('/app/messageVitaminB', {}, JSON.stringify(chatMessage));
  };
  const onMessageReceived = async (payload) => {
    // _id: Math.random(),
    // text: messages[0].text,
    // user: { _id: id },
    // createdAt: new Date(),
    // senderName: userData.username,
    // message: messages[0].text,
    // status: 'MESSAGE',
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData, 'thisispay');
    let refinedData = {
      message: payloadData.message,
      text: payloadData.message,
      senderName: payloadData.senderName,
      status: payloadData.status,
      createdAt: new Date(),
      _id: Math.random(),
      user: { _id: 2 },
    };
    // console.log(payloadData, 'this is payloadData');
    switch (payloadData.status) {
      case 'JOIN':
        break;
      case 'MESSAGE':
        // publicChats.push(payloadData);
        publicChats.unshift(refinedData);
        setPublicChats([...publicChats]);

        break;
    }
  };

  const onError = (err) => {
    console.log('실패!!');
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = async (messages) => {
    onSend(messages);
    // _id: '1',
    // text: 'hahaha',
    // user: { _id: 1 },
    // createdAt: new Date(),
    // username: 'haha',
    if (stompClient) {
      let id = await AsyncStorage.getItem('@storage_UserId');
      var chatMessage = {
        _id: Math.random(),
        text: messages[0].text,
        user: { _id: id },
        createdAt: new Date(),
        senderName: userData.username,
        message: messages[0].text,
        status: 'MESSAGE',
      };
      // console.log(chatMessage.message, 'this is messages');
      // console.log(messages, 'all messagse');
      console.log(chatMessage);
      console.warn(chatMessage);
      // console.log(publicChats);
      stompClient.send('/app/messageVitaminB', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };
  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    setPublicChats((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const registerUser = () => {
    connect();
  };
  return (
    <BackgroundScreen>
      {!userData.connected ? (
        <>
          <Text>haha</Text>
          <TextInput />
          <Button title="확인" onPress={registerUser}></Button>
        </>
      ) : (
        <GiftedChat
          placeholder={'메세지를 입력하세요...'}
          alwaysShowSend={true}
          renderUsernameOnMessage={true}
          messages={publicChats}
          textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
          onSend={(messages) => {
            return sendValue(messages);
            // return onSend(messages);
          }}
          user={{
            _id: 1,
          }}
        />
      )}
    </BackgroundScreen>
  );
};
export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textLine: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    width: '85%',
  },
  textBox: {
    flexDirection: 'row',
  },
  textBtn: {
    width: '15%',
  },
  // box: {
  //   flexDirection: "column-reverse",
  // },
});
