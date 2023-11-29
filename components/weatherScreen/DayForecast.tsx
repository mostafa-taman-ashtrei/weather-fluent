import { Image, ScrollView, Text, View } from "react-native";

import { WeatherDataType } from "../../types/weather";
import { backgroundColor } from "../../utils/theme";
import { createUniqueId } from "../../utils/keys";
import tw from "twrnc";
import { weatherImages } from "../../constants/ui";

interface DayForecastProps {
    weatherData: WeatherDataType | null;
}

const DayForecast: React.FC<DayForecastProps> = ({ weatherData }) => {
    const getDateData = (forecastDate: string) => {
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
                weatherData?.forecast?.forecastday?.map((forecast) => <View
                    key={createUniqueId(5)}
                    style={[tw`flex justify-center items-center w-36 rounded-2xl py-3 mr-2`, { backgroundColor: backgroundColor(0.15) }]}
                >
                    <Image
                        source={weatherImages[forecast?.day?.condition?.text as keyof typeof weatherImages || "other"]}
                        style={tw`w-13 h-13`}
                    />

                    <Text style={tw`text-white`}>
                        {getDateData(forecast.date)}
                    </Text>

                    <Text style={tw`text-white text-xl font-semibold`}>
                        {forecast?.day?.avgtemp_c}&#176;
                    </Text>
                </View>
                )
            }
        </ScrollView>
    );
};

export default DayForecast;