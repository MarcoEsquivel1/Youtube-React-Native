import React from "react";
import { FlatList, View } from "react-native";
import { Video } from "../models/Video";
import { VideoCard } from "./VideoCard";
interface VideoListProps {
    data: Video[],
    refreshing?: boolean,
    onRefresh?: () => void
    margin?: number
}

export const VideoList = (props: VideoListProps) => {
    const { data, refreshing, onRefresh } = props
    return (
        <View style={{paddingHorizontal: props.margin}}>
            <FlatList<Video>
                data={data}
                contentContainerStyle={{ paddingVertical: 15 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={(video) => video.id.videoId}
                renderItem={({ item }) => {
                    return (    
                        <VideoCard
                            video={item}
                        />
                    )
                }}
            />
        </View>
    )
};
