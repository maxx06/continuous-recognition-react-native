/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { Component } from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import 'react-native-get-random-values';
import 'node-libs-react-native/globals';
import { AudioConfig, AudioInputStream, CancellationDetails, CancellationReason, NoMatchDetails, NoMatchReason, ResultReason, SpeechConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export default App = () => {

  const speechConfig = SpeechConfig.fromSubscription("6c1f18d17acb4e4d84c4dc228d560c3b", "eastus");
  speechConfig.speechRecognitionLanguage = "en-US";
  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
  };

  recognizer.sessionStarted = (s, e) => {
    console.log(`\n    Session started event. SessionId: ${e.sessionId}`);
  };

  recognizer.sessionStopped = (s, e) => {
    console.log(`\n    Session stopped event. SessionId: ${e.sessionId}`);
  };

  console.log("refresh")

  return <SafeAreaView style={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
    <Pressable style={{padding: 15, backgroundColor: "white", borderRadius: 15}} onPress={
      () => {
        recognizer.startContinuousRecognitionAsync(
          () => {
            console.log("Listening...");
          },
          (err) => {
            console.log("Error: " + err);
          }
        );
      }}>
      <Text style={{color: "black"}}>Click me to start continuous detection</Text>
    </Pressable>
    <Pressable style={{padding: 15, backgroundColor: "white", borderRadius: 15}} onPress={
      () => {
        recognizer.stopContinuousRecognitionAsync(
          () => {
          },
          (err) => {
            console.log("Error: " + err);
          }
        );
      }}>
      <Text style={{color: "black"}}>Stop</Text>
    </Pressable>
  </SafeAreaView>;
};