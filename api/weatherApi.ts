import { REACT_APP_WEATHER_API_KEY } from "@env";
import axios from "axios";

interface ParamsType {
    cityName: string;
    days?: string;
}

const forecastEndpoint = (params: ParamsType) => `https://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_WEATHER_API_KEY}&q=${params.cityName}&days=${params.days}`;
const locationsEndpoint = (params: ParamsType) => `https://api.weatherapi.com/v1/search.json?key=${REACT_APP_WEATHER_API_KEY}&q=${params.cityName}`;

const apiCall = async (endpoint: string) => {
    try {
        const response = await axios.get(endpoint);
        return response;
    } catch {
        throw new Error("Failed to fetch data");
    }
};

export const fetchWeatherForecast = (params: ParamsType) => {
    const forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
};

export const fetchLocations = (params: ParamsType) => {
    const locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
};
