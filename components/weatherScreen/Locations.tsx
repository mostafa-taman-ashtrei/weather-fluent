import { Text, TouchableOpacity, View } from "react-native";

import { LocationType } from "../../types/weather";
import { MapPinIcon } from "react-native-heroicons/outline";
import { createUniqueId } from "../../utils/keys";
import tw from "twrnc";

interface LocationsProps {
    locations: LocationType[];
    // eslint-disable-next-line no-unused-vars
    handleLocation: (location: LocationType) => void;
}

const Locations: React.FC<LocationsProps> = ({ locations, handleLocation }) => {
    return (
        <View style={tw`absolute w-full bg-gray-300 top-16 rounded-2xl`}>
            {
                locations.map((location, index) => {
                    const showBorder = index + 1 != locations.length;
                    const borderClass = showBorder ? " border-b-2 border-b-gray-400" : "";

                    return (
                        <TouchableOpacity
                            key={createUniqueId(5)}
                            style={tw`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
                            onPress={() => handleLocation(location)}
                        >
                            <MapPinIcon size="20" color="gray" />

                            <Text style={tw`text-black text-lg ml-2`}>
                                {location?.name}, {location?.country}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
};

export default Locations;