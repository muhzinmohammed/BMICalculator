import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Button from "../components/button";

export default function HeightScreen() {
  const [unit, setUnit] = useState("cm");
  const [height, setHeight] = useState("174");

  return (
    <LinearGradient
      colors={["#FCF8DE", "#F7F7F7"]}
      start={{ x: 1, y: 0 }}   
      end={{ x: 0.5, y: 0.5 }}      
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Dots */}
        <View style={styles.progressContainer}>
          <View style={[styles.dot, { opacity: 0.4 }]} />
          <View style={[styles.dot, { opacity: 1 }]} />
          <View style={[styles.dot, { opacity: 0.4 }]} />
        </View>

        {/* Title */}
        <Text style={styles.title}>What's your current weight?</Text>
        <Text style={styles.subtitle}>
          Tell us your current height to personalize your plan.
        </Text>

        {/* Unit Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              unit === "cm" && styles.toggleActive,
            ]}
            onPress={() => setUnit("cm")}
          >
            <Text
              style={[
                styles.toggleText,
                unit === "cm" && styles.toggleTextActive,
              ]}
            >
              cm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              unit === "ft" && styles.toggleActive,
            ]}
            onPress={() => setUnit("ft")}
          >
            <Text
              style={[
                styles.toggleText,
                unit === "ft" && styles.toggleTextActive,
              ]}
            >
              ft
            </Text>
          </TouchableOpacity>
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

          
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            style={styles.previousButton}
            onPress={() => {router.navigate("/")}}
            name = "Previous"
          />
          <Button
            style={styles.nextButton}
            onPress={() => {router.navigate("/date")}}
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
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
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
    backgroundColor: "#fff",
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    color: "#999",
  },
  toggleTextActive: {
    color: "#000",
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
