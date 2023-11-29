import "./globals.css";

import { Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import tw from "twrnc";

const App: React.FC = () => {
  return (
    <View style={tw`bg-gray-900 justify-center items-center text-white w-full`}>
      <Text style={tw`text-white`}>Welcome to WeatherFluent!</Text>
      <StatusBar style="auto" />
    </View>
  );
};


export default App;