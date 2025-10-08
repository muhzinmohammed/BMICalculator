import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="weight" options={{headerShown:false}}/>
      <Stack.Screen name="date" options={{headerShown:false}}/>
    </Stack>
  );
}
