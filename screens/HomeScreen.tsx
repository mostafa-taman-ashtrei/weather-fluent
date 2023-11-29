import { CalendarDaysIcon, MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import DayForecast from "../components/weatherScreen/DayForecast";
import Loading from "../components/general/Loading";
import Locations from "../components/weatherScreen/Locations";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { backgroundColor } from "../utils/theme";
import tw from "twrnc";
import { useState } from "react";
import { weatherImages } from "../constants/ui";

const HomeScreen: React.FC = () => {
    const [loading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [locations] = useState([]);
    const [weatherData] = useState({});

    const { location, current } = weatherData;

    return (
        <View style={tw`flex-1 relative`}>
            <StatusBar style="light" />

            <Image
                blurRadius={70}
                source={require("../assets/images/bg.png")}
                style={tw`absolute w-full h-full`}
            />

            {loading
                ? <Loading />
                : <SafeAreaView style={tw`flex flex-1`}>
                    <View style={[tw`mx-4 relative z-50`, { height: "7%" }]}>
                        <View style={[tw`flex-row justify-end items-center rounded-2xl`, { backgroundColor: showSearch ? backgroundColor(0.2) : "transparent" }]}>
                            {
                                showSearch && <TextInput
                                    placeholder="Search city"
                                    placeholderTextColor={"lightgray"}
                                    style={tw`pl-6 h-10 pb-1 flex-1 text-base text-white`}
                                />
                            }

                            <TouchableOpacity
                                onPress={() => setShowSearch(!showSearch)}
                                style={[tw`rounded-full p-3 m-1`, { backgroundColor: backgroundColor(0.3) }]}
                            >
                                {showSearch ? <XMarkIcon size="25" color="white" /> : <MagnifyingGlassIcon size="25" color="white" />}
                            </TouchableOpacity>
                        </View>

                        {locations.length > 0 && showSearch && <Locations locations={locations} />}
                    </View>

                    <View style={tw`mx-4 flex justify-around flex-1 mb-2`}>
                        <Text style={tw`text-white text-center text-2xl font-bold`}>
                            {location?.name},
                            <Text style={tw`text-lg font-semibold text-gray-300`}>
                                {location?.country}
                            </Text>
                        </Text>

                        <View style={tw`flex-row justify-center`}>
                            <Image
                                source={weatherImages["other"]}
                                style={tw`w-52 h-52`}
                            />
                        </View>

                        <View style={tw`space-y-2`}>
                            <Text style={tw`text-center font-bold text-white text-6xl ml-5`}>
                                {current?.temp_c}&#176;
                            </Text>

                            <Text style={tw`text-center text-white text-xl tracking-widest`}>
                                {current?.condition?.text}
                            </Text>
                        </View>


                        <View style={tw`flex-row justify-between mx-4`}>
                            <View style={tw`flex-row space-x-2 items-center`}>
                                <Image source={require("../assets/icons/wind.png")} style={tw`w-6 h-6`} />

                                <Text style={tw`text-white font-semibold text-base`}>
                                    {current?.wind_kph}km
                                </Text>
                            </View>

                            <View style={tw`flex-row space-x-2 items-center`}>
                                <Image source={require("../assets/icons/drop.png")} style={tw`w-6 h-6`} />

                                <Text style={tw`text-white font-semibold text-base`}>
                                    {current?.humidity}%
                                </Text>
                            </View>

                            <View style={tw`flex-row space-x-2 items-center`}>
                                <Image source={require("../assets/icons/sun.png")} style={tw`w-6 h-6`} />

                                <Text style={tw`text-white font-semibold text-base`}>
                                    {weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={tw`mb-2 space-y-3`}>
                        <View style={tw`flex-row items-center mx-5 space-x-2`}>
                            <CalendarDaysIcon size="22" color="white" />

                            <Text style={tw`text-white text-base`}>
                                Daily forecast
                            </Text>
                        </View>

                        <DayForecast weatherData={weatherData} />
                    </View>
                </SafeAreaView>
            }
        </View>
    );
};

export default HomeScreen;