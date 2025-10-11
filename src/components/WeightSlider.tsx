import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {
  unit:string;
  onChange?: (value: string) => void;
};

const WeightSlider = ({unit,onChange}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);

  const max = unit === "kg"? 150:300
  const min = unit === "kg"? 30:60

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    let lastValue = -1
    const listener = scrollX.addListener(({ value }) => {
      const stepsScrolled = value / 55;
      const currentHeight = min + stepsScrolled * 5;
      const clampedHeight = Math.max(min, Math.min(max, currentHeight));
      let roundedHeight = Math.round(clampedHeight);

      if (roundedHeight !== lastValue) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        lastValue = roundedHeight;
      }

      onChange?.(roundedHeight.toString());
    });

    return () => scrollX.removeListener(listener);
  }, [min, max]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef as any}
        style={styles.tapeContainer}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        snapToInterval={10}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        horizontal
      >
        {Array.from({ length: (max - min)/5 + 1 }, (_, i) => {
          const label = min + i * 5;
          return (
            <View key={i} >
                <View style={styles.lines}>
                    <View style={styles.markLine} />
                    {Array.from({ length: 4 }, (_,j) => (i*5!=max-min?(
                          <View key={j} style={styles.unitLine} />
                    ):null))}
                </View>
                <Text>{label}</Text>
            </View>
          )
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        alignItems: "center",
        justifyContent:"center",
        height: 200,
    },  
    tapeContainer: {
        borderRadius: 10,
        backgroundColor: "#f7f7f7",
    },
    scrollContent: { 
        paddingLeft: 190, 
        paddingRight: 185, 
        paddingTop:30
    },
    lines: {    
        flexDirection: "row",
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center"
    },
    markLine: {
        width: 1,
        height: 100,
        backgroundColor: "rgba(187, 187, 187, 1)",
        marginHorizontal: 5,
        marginVertical: 10,
    },
    unitLine: {
        width: 1,
        height: 70,
        backgroundColor: "rgba(187, 187, 187, 0.4)",
        marginHorizontal: 5,
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

export default WeightSlider;
