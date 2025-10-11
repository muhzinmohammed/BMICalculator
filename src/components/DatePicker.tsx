import * as Font from 'expo-font';
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";
import { useBmiContext } from '../context/BmiContext';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DOBPicker({ onChange }: { onChange?: (date: string) => void }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear-100 + i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const repeatArray = <T,>(arr: T[], times: number) => {
    let result: T[] = [];
    for (let i = 0; i < times; i++) result = result.concat(arr);
    return result;
  };

  const repeatedDays = repeatArray(days, 100);
  const repeatedMonths = repeatArray(months, 100);
  const itemHeight = 50;

  const {
    selectedDay,
    setSelectedDay,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear
  } = useBmiContext()

  const lastIndexRef = useRef({ day: -1, month: -1, year: -1 });

  const handleScroll = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
    data: any[],
    setter: (v: any) => void,
    field: "day" | "month" | "year"
  ) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight)+3;
    const value = data[index];

    if (index !== lastIndexRef.current[field]) {
      lastIndexRef.current[field] = index;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (field === "day") {
        setSelectedDay(value);
        onChange?.(`${value} ${selectedMonth} ${selectedYear}`);
      } else if (field === "month") {
        setSelectedMonth(months.indexOf(value));
        onChange?.(`${selectedDay} ${value} ${selectedYear}`);
      } else if (field === "year") {
        setSelectedYear(value);
        onChange?.(`${selectedDay} ${selectedMonth} ${value}`);
      }
    }
  };

  useEffect(() => {
    Font.loadAsync({
      'Gilroy-Bold': require('../assets/fonts/gilroy-bold.ttf'),
      'Gilroy-SemiBold': require('../assets/fonts/gilroy-semibold.ttf'),
      'Gilroy-Regular': require('../assets/fonts/gilroy-regular.ttf'),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <FlatList
          data={repeatedDays}
          keyExtractor={(item, index) => `day-${index}`}
          initialScrollIndex={Math.floor(repeatedDays.length / 2)} 
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={(e) => handleScroll(e, repeatedDays, setSelectedDay, "day")}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <Text
                style={[
                  styles.itemText,
                  item === selectedDay && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.picker}>
        <FlatList
          data={repeatedMonths}
          keyExtractor={(item, index) => `month-${index}`}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={Math.floor(repeatedMonths.length / 2)} 
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={(e) => handleScroll(e, repeatedMonths, setSelectedMonth, "month")}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <Text
                style={[
                  styles.itemText,
                  item === months[selectedMonth] && styles.selectedText,
                ]}
              >
                {item.slice(0, 3)}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.picker}>
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={Math.floor(years.length / 2)} 
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={(e) => handleScroll(e, years, setSelectedYear, "year")}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <Text
                style={[
                  styles.itemText,
                  item === selectedYear && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  picker: {
    height: 330,
    width: 100,
    alignItems: "center",
    marginHorizontal: 5,
    overflow: "hidden",
  },
  item: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 40,
    fontFamily:"Gilroy-SemiBold",
    fontWeight:400,
    color: "rgba(174,174,174,0.7)",
  },
  selectedText: {
    fontSize: 40,
    fontFamily:"Gilroy-Bold",
    color: "rgba(66, 50, 40, 1)",
    fontWeight: "600",
  }
});
