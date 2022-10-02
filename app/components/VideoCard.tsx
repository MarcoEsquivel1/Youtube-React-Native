import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native';
import { Video } from '../models/Video';
import {observer} from 'mobx-react-lite'
interface CardVideoProps {
    video: Video
}

const VideoCardComponent = (props: CardVideoProps) => {
    const navigation = useNavigation();
    const { colors } = useTheme()
    const textcolor = colors.text
    return (
        <TouchableOpacity
            //onPress={() => navigation.navigate("videoplayer", { videoId: props.video.id.videoId, title: props.video.snippet.title })}
        >
            <View style={{ marginBottom: 10 }}

            >
                <Image
                    source={{ uri: `https://i.ytimg.com/vi/${props.video.id.videoId}/hqdefault.jpg` }}
                    style={{
                        width: "100%",
                        height: 200
                    }}

                />
                <View style={{
                    flexDirection: "row",
                    margin: 5
                }}>
                    <MaterialIcons name="account-circle" size={40} color="#212121" />
                    <View
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            width: Dimensions.get("screen").width - 50,
                            color: textcolor

                        }}
                            ellipsizeMode="tail"
                            numberOfLines={2}
                        >{props.video.snippet.title}</Text>
                        <Text style={{
                            color: textcolor

                        }}>{props.video.snippet.channelTitle}</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
};

export const VideoCard = observer(VideoCardComponent)