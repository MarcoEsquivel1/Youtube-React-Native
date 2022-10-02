import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Video } from "../models/Video";
import { VideoCard } from "./VideoCard";
import { AppStackParamList } from '../navigators/AppNavigator'
interface VideoListProps {
    data: Video[],
    refreshing?: boolean,
    onRefresh?: () => void
}

export const VideoList = (props: VideoListProps) => {
    const { data, refreshing, onRefresh } = props
    type homeScreenProp = StackNavigationProp<AppStackParamList, 'Welcome'>;
    const navigation = useNavigation<homeScreenProp>();
    return (
        <View>
            <FlatList<Video>
                data={data}
                contentContainerStyle={{ paddingVertical: 15 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={(video) => video.id.videoId}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                        onPress={() => {navigation.navigate('Video', {video: item} );}}
                        >
                            <VideoCard
                                video={item}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
};
