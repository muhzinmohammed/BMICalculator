import { Stack } from "expo-router";
import { BmiContextProvider } from "../context/BmiContext";


export default function RootLayout() {
  return(
    <BmiContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="weight" options={{headerShown:false}}/>
        <Stack.Screen name="date" options={{headerShown:false}}/>
      </Stack>
    </BmiContextProvider>
  );
}
