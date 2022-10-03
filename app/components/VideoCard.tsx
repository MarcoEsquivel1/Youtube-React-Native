import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native';
import { Video } from '../models/Video';
import { observer } from 'mobx-react-lite'
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigators';
interface CardVideoProps {
    video: Video
}

const VideoCardComponent = (props: CardVideoProps) => {
    const { colors } = useTheme()
    const textcolor = colors.text
    type homeScreenProp = StackNavigationProp<AppStackParamList, 'Welcome'>;
    const navigation = useNavigation<homeScreenProp>();
    return (
        <View
            style={{ marginBottom: 10 }}
        >
            <TouchableOpacity
                onPress={() => { navigation.navigate('Video', { video: props.video }); }}
            >
                <Image
                    source={{ uri: `https://i.ytimg.com/vi/${props.video.id.videoId}/hqdefault.jpg` }}
                    style={{
                        height: 210,
                        width: "100%",
                    }}
                />
                <View style={{
                    flexDirection: "row",
                    margin: 5
                }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Channel', {channelId: props.video.snippet.channelId})}}
                    >

                        <MaterialIcons name="account-circle" size={40} color="#212121" />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            width: Dimensions.get("screen").width - 60,
                            color: textcolor,
                        }}
                            ellipsizeMode="tail"
                            numberOfLines={2}
                        >{props.video.snippet.title}</Text>
                        <Text style={{
                            color: textcolor

                        }}>{props.video.snippet.channelTitle}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    );
};

export const VideoCard = observer(VideoCardComponent)