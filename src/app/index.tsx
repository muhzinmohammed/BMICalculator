import * as Font from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button";

export default function HeightScreen() {
  const [unit, setUnit] = useState("cm");
  const [height, setHeight] = useState("174");

  useEffect(() => {
    Font.loadAsync({
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
        {/* Progress Dots */}
        <View style={styles.progressContainer}>
          <View style={[styles.dot, { opacity: 0.4 }]} />
          <View style={[styles.dot, { opacity: 1 }]} />
          <View style={[styles.dot, { opacity: 0.4 }]} />
        </View>

        {/* Title */}
        <View style={{}}>
          <Text style={styles.title}>What's your current height?</Text>
        </View>
        <Text style={styles.subtitle}>
          Tell us your current height to personalize your plan.
        </Text>

        {/* Unit Toggle */}
        <View style={styles.toggleContainer}>
          <Button
            style={[
              styles.toggleButton,
              unit === "cm" && styles.toggleActive,
            ]}
            onPress={() => setUnit("cm")}
            nameStyle={[
                styles.toggleText,
                unit === "cm" && styles.toggleTextActive,
              ]}
            name="cm"
          />
          <Button
            style={[
              styles.toggleButton,
              unit === "ft" && styles.toggleActive,
            ]}
            onPress={() => setUnit("ft")}
            nameStyle={[
                styles.toggleText,
                unit === "ft" && styles.toggleTextActive,
              ]}
            name="ft"
          />
        </View>

        {/* Height Input */}
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Enter your height"
        />

        {/* Height Meter Section */}
        <View style={styles.heightMeter}>
          <View style={styles.heightValueContainer}>
            <Text style={styles.heightValue}>{height}</Text>
            <Text style={styles.heightUnit}>{unit}</Text>
          </View>

          {/* Placeholder for the avatar image */}
          <Image
            source={require("../assets/images/avatar.png")} // Replace with your local asset
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.previousButton}
            onPress={() => {router.navigate("/")}}
            name = "Previous"
          />
          <Button
            style={styles.nextButton}
            onPress={() => {router.navigate("/weight")}}
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
    paddingVertical: 40,
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
    width:200,
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
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    overflow: "hidden",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  toggleActive: {
    borderRadius:25,
    width:100,
    backgroundColor: "#000",
    elevation: 2,
  },
  toggleText: {
    fontFamily:"Gilroy-SemiBold",
    textAlign:"center",
    fontSize: 14,
    color: "#999",
    // borderColor:"black",
    // borderWidth:1,
  },
  toggleTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
  heightMeter: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  heightValueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  heightValue: {
    fontSize: 52,
    fontWeight: "700",
    color: "#222",
  },
  heightUnit: {
    fontSize: 18,
    color: "#666",
    marginLeft: 5,
    marginBottom: 10,
  },
  avatar: {
    width: 150,
    height: 200,
    marginTop: 10,
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
    elevation: 2,
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
