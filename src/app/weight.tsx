import MaskedView from '@react-native-masked-view/masked-view';
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
import WeightSlider from '../components/WeightSlider';
import Button from "../components/button";

export default function WeightScreen() {
  const [unit, setUnit] = useState("kg");
  const [weight, setWeight] = useState("0");
  const [bmi, setBmi] = useState("16.1");

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
          <View style={[styles.dot, { opacity: 1 }]} />
          <View style={[styles.dot, { opacity: 0.4 }]} />
        </View>

        {/* Title */}
        <View style={{}}>
          <Text style={styles.title}>What's your current weight?</Text>
        </View>
        <Text style={styles.subtitle}>
          Tell us your current weight to personalize your plan.
        </Text>

        {/* Unit Toggle */}
        <View style={styles.toggleContainer}>
          <Button
            style={[
              styles.toggleButton,
              unit === "kg" && styles.toggleActive,
            ]}
            onPress={() => setUnit("kg")}
            nameStyle={[
                styles.toggleText,
                unit === "kg" && styles.toggleTextActive,
              ]}
            name="kg"
          />
          <Button
            style={[
              styles.toggleButton,
              unit === "lb" && styles.toggleActive,
            ]}
            onPress={() => setUnit("lb")}
            nameStyle={[
                styles.toggleText,
                unit === "lb" && styles.toggleTextActive,
              ]}
            name="lb"
          />
        </View>

        {/* Weight Input */}
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Enter your weight"
          placeholderTextColor={"rgba(94, 99, 104, 1)"}
          returnKeyType="done"
        />

        {/* Weight Meter Section */}
        <View style={styles.weightMeter}>
          <View style={styles.heightInfoContainer}>
            <View style={styles.heightValueContainer}>
              <Text style={styles.heightValue}>{weight? weight:""}</Text>
              <View>
                <Image
                  source={require("../assets/images/wide.png")} // Replace with your local asset
                  style={{width:28, flex: 1, justifyContent: 'flex-start' }}
                  resizeMode="contain"
                />
                <Text style={styles.heightUnit}>{unit === "kg"? unit:"lb"}</Text>
              </View>
            </View>
              
          </View>
          <MaskedView
            maskElement={
              <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', 'black', 'black', 'transparent']}
                locations={[0, 0.2, 0.8, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            }>
            <View>
              <WeightSlider 
                onChange={setWeight} 
                min={unit === "kg" ? 30:60} 
                max={unit === "kg" ? 150:300} 
                unit={unit}
              />
            </View>
          </MaskedView>
          <View style={styles.selectionLine}/>
        </View>

        <View style={styles.bmiContainer}>
          <Image
            source={require("../assets/images/wide.png")} // Replace with your local asset
            style={{width:12,position:"absolute",bottom:5,right:150}}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/wide.png")} // Replace with your local asset
            style={{width:20,position:"absolute",top:5,right:90}}
            resizeMode="contain"
          />
          <Text style={[styles.bmiTitle]}>Your current BMI!</Text>
          <Image
            source={require("../assets/images/Weighingmachine.png")} // Replace with your local asset
            style={{width:100,height:100,position:"absolute",top:-25,right:-20}}
            resizeMode="contain"
            />
          <View style={styles.bmiContent}>
            <Text style={styles.bmi}>{bmi}</Text>
            <Text style={styles.bmiText}>You have a great potential to 
                  get in better shape. Move now!</Text>
          </View>
        </View>
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
    height:34,
    width:158,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    overflow: "hidden",
  },
  toggleButton: {
    width:74,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignContent:"center"
  },
  toggleActive: {
    borderRadius:25,
    backgroundColor: "#000",
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
    borderRadius: 54,
    paddingLeft: 20,
    width: "80%",
    height: 48,
    textAlign: "left",
    color:"rgb(0, 0, 0)",
    marginTop: 15,
    fontSize: 16,
  },
  weightMeter: {
    display:"flex",
    alignItems:"center",
    // flexDirection:"row",
    // justifyContent:"space-between",
    // paddingVertical:20,
    height:280,
    width:"100%",
    // marginLeft:50,
    // borderWidth:1,
    // borderColor:"black"
  },
  heightInfoContainer: {
    marginTop:10,
    // height:100,  
    // borderWidth:1,
    // borderColor:"black"
  },
  heightValueContainer: {
    marginTop:20,
    flexDirection: "row",
    alignItems: "flex-end",
    height:70,
    // borderWidth:1,
    // borderColor:"black"
  },
  heightValue: {
    fontFamily:"Gilroy-Bold",
    fontSize: 52,
    fontWeight: "700",
    color: "#222",
  },
  heightUnit: {
    fontSize: 18,
    fontFamily:"Gilroy-SemiBold",
    fontWeight:400,
    color: "#666",
    marginLeft: 5,
    marginBottom: 10,
  },
  selectionLine: {
      position: 'absolute',
      width: 4,
      borderRadius:2,
      height: 150,
      backgroundColor: "rgba(254, 186, 27, 1)", 
      top: 120, 
      zIndex: 10,
  },bmiContainer: {
    // flexDirection:"row",
    height:100,
    width:350,
    borderRadius:16,
    backgroundColor:"#fff",
    marginHorizontal:30,
    paddingHorizontal:20
  },
  bmiTitle: {
    width:200,
    // textAlign:"center",
    fontFamily:"Gilroy-SemiBold",
    fontSize: 14,
    fontWeight: "400",
    color: "#222",
    marginTop: 20,
  },
  bmiContent: {
    paddingTop:10,
    flexDirection:"row",
    alignItems:"center"
  },
  bmi: {
    fontFamily:"Gilroy-Bold",
    fontSize: 36,
    fontWeight: "400",
    color: "rgba(46, 181, 121, 1)",
  },
  bmiText: {
    fontSize: 12,
    fontFamily:"Gilroy-Regular",
    fontWeight:300,
    width:210,
    letterSpacing:1,
    lineHeight:15,
    color: "#666",
    marginLeft: 5,
    marginBottom: 10,
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
