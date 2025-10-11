import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {
  min: number;
  max: number;
  unit:string;
  onChange?: (value: number) => void;
};

const HeightSlider = ({
  min = 100,
  max = 240,
  unit,
  onChange,
}: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const pixel_count = unit === "cm"? 70:84 
  const unit_no = unit === "cm"? 10:12
  max = unit === "cm"? max:max*12
  min = unit === "cm"? min:min*12
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const stepsScrolled = value / pixel_count;
      const currentHeight = max - stepsScrolled * unit_no;
      const clampedHeight = Math.max(min, Math.min(max, currentHeight));
      let roundedHeight = Math.round(clampedHeight);
      onChange?.(roundedHeight);
    });

    return () => scrollY.removeListener(listener);
  }, [min, max]);
  
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef as any}
        style={styles.tapeContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        snapToInterval={6}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {unit === "cm"? (Array.from({ length: (max - min)/10 + 1 }, (_, i) => {
          const label = max - i * 10;
          return (
            <View key={i} style={styles.mark}>
                <Text>{label}</Text>
                <View style={styles.lines}>
                    <View style={styles.markLine} />
                    {Array.from({ length: 9 }, (_,j) => (i*10!=max-min?(
                    (j == 4? (
                        <View key={j} style={styles.halfLine} />
                    ):(
                    <View key={j} style={styles.unitLine} />))
        ):null))}
                </View>
            </View>
          )
        })):(Array.from({ length: (7 - 2) + 1 }, (_, i) => {
            const label = 7 - i;
            return (
              <View key={i} style={styles.mark}>
                  <Text>{label}</Text>
                  <View style={styles.lines}>
                      <View style={styles.markLine} />
                      {Array.from({ length: 11 }, (_,j) => (i!=5?(
                      (j == 5? (
                          <View key={j} style={styles.halfLine} />
                      ):(
                      <View key={j} style={styles.unitLine} />))
          ):null))}
                  </View>
              </View>  
              )}))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        alignItems: "center",
        justifyContent:"center",
    },  
    tapeContainer: {
        height: 400,
        width: 150,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
    },
    scrollContent: { 
        paddingTop: 100, 
        paddingBottom: 202, 
    },
    mark: { 
        flexDirection: "row",
    },
    lines: {
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center"
    },
    markLine: {
        width: 112,
        height: 1,
        backgroundColor: "rgba(187, 187, 187, 1)",
        marginHorizontal: 10,
        marginVertical: 3,
    },
    halfLine: {
        width: 85,
        height: 1,
        backgroundColor: "rgba(187, 187, 187, 0.6)",
        marginVertical: 3,
    },
    unitLine: {
        width: 60,
        height: 1,
        backgroundColor: "rgba(187, 187, 187, 0.4)",
        marginVertical: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "400",
        color: "#333",
        lineHeight: 30,
        textAlign: "center",
        width: 35,
    },
});

export default HeightSlider;
