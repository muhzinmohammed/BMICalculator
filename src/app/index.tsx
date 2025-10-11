import MaskedView from '@react-native-masked-view/masked-view';
import * as Font from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeightSlider from '../components/HeightSlider';
import Button from "../components/button";
import { useBmiContext } from '../context/BmiContext';

export default function HeightScreen() {

  const {
    height, 
    setHeight,
    heightUnit,
    setHeightUnit,
    heightin, 
    setHeightin
  } = useBmiContext();
  
  const isCm = heightUnit === "cm"

  useEffect(() => {
    Font.loadAsync({
      'Gilroy-Bold': require('../assets/fonts/gilroy-bold.ttf'),
      'Gilroy-SemiBold': require('../assets/fonts/gilroy-semibold.ttf'),
      'Gilroy-Regular': require('../assets/fonts/gilroy-regular.ttf'),
    });
  }, []);
  
  const handleHeight = (val:number, targetUnit = heightUnit) =>{
    let roundedHeight = val
    if(targetUnit === "ft"){
      roundedHeight = Math.floor(val/12);
      const roundedHeightin = Math.floor(val-roundedHeight*12);
      if(roundedHeightin>0){
        setHeightin(roundedHeightin.toString());
      }else{
        setHeightin(null);
      }
    }
    setHeight(roundedHeight.toString());
  }

  return (
    <LinearGradient
      colors={["rgb(255, 244, 170)", "rgba(247, 247, 247, 1)"]}
      start={{ x: 1, y: 0 }}   
      end={{ x: 0.5, y: 0.3 }}      
      style={styles.container}
    >

      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.progressContainer}>
          <View style={[styles.dot, { opacity: 1 }]} />
          <View style={[styles.dot, { opacity: 0.4 }]} />
          <View style={[styles.dot, { opacity: 0.4 }]} />
        </View>
        <View>
          <Text style={styles.title}>What's your current height?</Text>
        </View>
        <Text style={styles.subtitle}>
          Tell us your current height to personalize your plan.
        </Text>

        <View style={styles.toggleContainer}>
          <Button
            style={[
              styles.toggleButton,
              isCm && styles.toggleActive,
            ]}
            onPress={() => setHeightUnit("cm")}
            nameStyle={[
                styles.toggleText,
                isCm && styles.toggleTextActive,
              ]}
            name="cm"
          />
          <Button
            style={[
              styles.toggleButton,
              heightUnit === "ft" && styles.toggleActive,
            ]}
            onPress={() => setHeightUnit("ft")}
            nameStyle={[
                styles.toggleText,
                heightUnit === "ft" && styles.toggleTextActive,
              ]}
            name="ft"
          />
        </View>

        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Enter your height"
          placeholderTextColor={"rgba(94, 99, 104, 1)"}
          returnKeyType="done"
          onEndEditing={() => {
            let val = parseInt(height);
            if (!isNaN(val)) {
              handleHeight(val); 
            }
          }}
        />

        <View style={styles.heightMeter}>
          <View style={styles.heightInfoContainer}>
            <View style={styles.heightValueContainer}>
              <Text style={styles.heightValue}>{height? height:""}</Text>
              <View>
                {heightin? null:(<Image
                  source={require("../assets/images/wide.png")} 
                  style={{width:28, flex: 1, justifyContent: 'flex-start' }}
                  resizeMode="contain"
                  />)}
                <Text style={styles.heightUnit}>{isCm? heightUnit:"ft"}</Text>
              </View>
              {heightUnit === "ft"? (
                  <View style={{flexDirection:"row"}}>
                    <Text style={styles.heightValue}>{heightin? heightin:""}</Text>
                    <View>
                      {heightin? (<Image
                      source={require("../assets/images/wide.png")} 
                      style={{width:28, flex: 1, justifyContent: 'flex-start' }}
                      resizeMode="contain"
                      />):null}
                      <Text style={styles.heightUnit}>{heightin? "in":""}</Text>
                    </View>
                  </View>
                ):null
              }
            </View>

            <Image
              source={require("../assets/images/avatar.png")} 
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <MaskedView
            style={{ paddingRight:20}}
            maskElement={
              <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', 'black', 'black', 'transparent']}
                locations={[0, 0.2, 0.8, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            }>
              <HeightSlider 
                onChange={(val) => handleHeight(val)} 
                unit={heightUnit}
              />
          </MaskedView>
          <View style={styles.selectionLine}/>
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
  heightMeter: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:20,
    height:380,
    width:"100%",
    marginLeft:50,
  },
  heightInfoContainer: {
    marginTop:10,
    height:320,  
  },
  heightValueContainer: {
    marginTop:20,
    flexDirection: "row",
    alignItems: "flex-end",
    height:70,
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
      width: '100%',
      height: 3,
      backgroundColor: "rgba(254, 186, 27, 1)", 
      top: 120, 
      zIndex: 10,
  },
  avatar: {
    width: 170,
    height: 260,
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
