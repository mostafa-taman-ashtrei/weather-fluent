import { CalendarDaysIcon, MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LocationType, WeatherDataType } from "../types/weather";
import { fetchLocations, fetchWeatherForecast } from "../api/weatherApi";
import { useCallback, useEffect, useState } from "react";

import DayForecast from "../components/weatherScreen/DayForecast";
import Loading from "../components/general/Loading";
import Locations from "../components/weatherScreen/Locations";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { backgroundColor } from "../utils/theme";
import { debounce } from "lodash";
import tw from "twrnc";
import { weatherImages } from "../constants/ui";

const HomeScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm || searchTerm.length < 2) return;

        const res = await fetchLocations({ cityName: searchTerm });
        if (res.status === 200) setLocations(res.data);
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const handleLocation = async (location: LocationType) => {
        try {
            setLoading(true);
            setShowSearch(false);
            setLocations([]);

            const res = await fetchWeatherForecast({ cityName: location.name, days: "7" });
            if (res.status === 200) setWeatherData(res.data);
        } catch {
            throw new Error("Failed to fetch weather forecast data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMyWeatherData(); }, []);

    const fetchMyWeatherData = async () => {
        try {
            setLoading(true);
            const res = await fetchWeatherForecast({ cityName: "Tokyo", days: "7" });
            if (res.status === 200) setWeatherData(res.data);
        } catch {
            throw new Error("Failed to fetch weather forecast data");
        } finally {
            setLoading(false);
        }
    };


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
                                    onChangeText={handleTextDebounce}
                                />
                            }

                            <TouchableOpacity
                                onPress={() => setShowSearch(!showSearch)}
                                style={[tw`rounded-full p-3 m-1`, { backgroundColor: backgroundColor(0.3) }]}
                            >
                                {showSearch ? <XMarkIcon size="25" color="white" /> : <MagnifyingGlassIcon size="25" color="white" />}
                            </TouchableOpacity>
                        </View>

                        {locations.length > 0 && showSearch && <Locations handleLocation={handleLocation} locations={locations} />}
                    </View>

                    <View style={tw`mx-4 flex justify-around flex-1 mb-2`}>
                        <Text style={tw`text-white text-center text-2xl font-bold`}>
                            {weatherData?.location?.name} {", "}
                            <Text style={tw`text-xl font-semibold text-gray-300`}>
                                {weatherData?.location?.country}
                            </Text>
                        </Text>

                        <View style={tw`flex-row justify-center`}>
                            <Image
                                source={weatherImages[weatherData?.current?.condition?.text as keyof typeof weatherImages || "other"]}
                                style={tw`w-52 h-52`}
                            />
                        </View>

                        <View>
                            <Text style={tw`text-center font-bold text-white text-6xl ml-5`}>
                                {weatherData?.current?.temp_c}&#176;
                            </Text>

                            <Text style={tw`text-center text-white text-xl tracking-widest`}>
                                {weatherData?.current?.condition?.text}
                            </Text>
                        </View>


                        <View style={tw`flex-row justify-between mx-4`}>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require("../assets/icons/wind.png")} style={tw`w-6 h-6`} />

                                <Text style={tw`text-white font-semibold text-base`}>
                                    {weatherData?.current?.wind_kph}km
                                </Text>
                            </View>

                            <View style={tw`flex-row items-center`}>
                                <Image source={require("../assets/icons/drop.png")} style={tw`w-6 h-6`} />

                                <Text style={tw`text-white font-semibold text-base`}>
                                    {weatherData?.current?.humidity}%
                                </Text>
                            </View>

                            <View style={tw`flex-row items-center`}>
                                <Image source={require("../assets/icons/sun.png")} style={tw`w-6 h-6`} />

                                <Text style={tw`text-white font-semibold text-base`}>
                                    {weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={tw`mb-2`}>
                        <View style={tw`flex-row items-center justify-center gap-2 mx-5 mb-2`}>
                            <CalendarDaysIcon size="22" color="white" />

                            <Text style={tw`text-white text-base`}>
                                Weekly Forecast
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