import { Image, ScrollView, Text, View } from "react-native";

import { backgroundColor } from "../../utils/theme";
import tw from "twrnc";
import { weatherImages } from "../../constants/ui";

interface DayForecastProps {
    weatherData: any;
}

const DayForecast: React.FC<DayForecastProps> = ({ weatherData }) => {
    const getDateData = (forecastDate: Date) => {
        const date = new Date(forecastDate);
        let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        dayName = dayName.split(",")[0];
        return dayName;
    };

    return (
        <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
        >
            {
                weatherData?.forecast?.forecastday?.map((forecast, index) => {
                    return (
                        <View
                            key={index}
                            style={[tw`flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4`, { backgroundColor: backgroundColor(0.15) }]}
                        >
                            <Image
                                source={weatherImages["other"]}
                                style={tw`w-11 h-11`}
                            />

                            <Text style={tw`text-white`}>
                                {getDateData(forecast.date)}
                            </Text>

                            <Text style={tw`text-white text-xl font-semibold`}>
                                {forecast?.day?.avgtemp_c}&#176;
                            </Text>
                        </View>
                    );
                })
            }
        </ScrollView>
    );
};

export default DayForecast;