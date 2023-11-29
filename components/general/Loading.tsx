import * as Progress from "react-native-progress";

import { View } from "react-native";
import tw from "twrnc";

const Loading: React.FC = () => {
    return (
        <View style={tw`flex-1 flex-row justify-center items-center`}>
            <Progress.CircleSnail thickness={20} size={200} animated color={["#0bb3b2", "orange"]} />
        </View>
    );
};

export default Loading;