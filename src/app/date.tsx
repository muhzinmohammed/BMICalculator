import MaskedView from '@react-native-masked-view/masked-view';
import * as Font from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from '../components/DatePicker';
import Button from "../components/button";
import { useBmiContext } from '../context/BmiContext';

export default function WeightScreen() {
  const {age,setAge} = useBmiContext();
  const [dob,setDob] = useState("");
  useEffect(() => {
    Font.loadAsync({
      'Gilroy-Bold': require('../assets/fonts/gilroy-bold.ttf'),
      'Gilroy-SemiBold': require('../assets/fonts/gilroy-semibold.ttf'),
      'Gilroy-Regular': require('../assets/fonts/gilroy-regular.ttf'),
    });
  }, []);

  return (
    <LinearGradient
      colors={["rgb(255, 244, 170)", "rgba(247, 247, 247, 1)"]}
      start={{ x: 1, y: 0 }}   
      end={{ x: 0.5, y: 0.3 }}      
      style={styles.container}
    >
      <StatusBar
        barStyle="dark-content" 
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.progressContainer}>
          <View style={[styles.dot, { opacity: 0.4 }]} />
          <View style={[styles.dot, { opacity: 0.4}]} />
          <View style={[styles.dot, { opacity: 1 }]} />
        </View>

        <View style={{}}>
          <Text style={styles.title}>Choose your date of birth</Text>
        </View>
        <Text style={styles.subtitle}>
          Tell us your current age to personalize your plan.
        </Text>

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter your age"
          placeholderTextColor={"rgba(94, 99, 104, 1)"}
          returnKeyType="done"
        />

        <MaskedView
            style={styles.datePicker}
            maskElement={
              <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', 'black', 'black', 'transparent']}
                locations={[0.05, 0.3, 0.6, 0.9]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            }>
          <DatePicker onChange={setDob}/>
        </MaskedView> 

        <View style={styles.buttonContainer}>
          <Button
            style={styles.previousButton}
            onPress={() => {router.navigate("/weight")}}
            name = "Previous"
          />
          <Button
            style={styles.nextButton}
            onPress={() => {router.navigate("/")}}
            name="Next"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
  title: {
    width:180,
    textAlign:"center",
    fontFamily:"Gilroy-SemiBold",
    fontSize: 20,
    fontWeight: "400",
    color: "#222",
    marginTop: 15,
  },
  subtitle: {
    fontFamily:"Gilroy-Regular",
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 54,
    paddingLeft: 20,
    width: "80%",
    height: 48,
    textAlign: "left",
    color:"rgb(0, 0, 0)",
    marginTop: 15,
    fontSize: 16,
  },
  datePicker: {
    display:"flex",
    alignItems:"center",
    width:"100%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    marginTop: 30,
  },
  previousButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
    elevation: 2,
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#FFD93D",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 10,
    elevation: 2
  },
  prevText: {
    color: "#000",
    fontWeight: "600",
  },
  nextText: {
    color: "#000",
    fontWeight: "700",
  },
});
