import { observer } from "mobx-react-lite";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useStores } from "../models";
import { Video } from "../models/Video";
import { VideoCard } from "./VideoCard";
interface VideoListProps {
    data: Video[],
    refreshing?: boolean,
    onRefresh?: () => void
    margin?: number
}
export const VideoList/* Component */ = (props: VideoListProps) => {
    const { videosStore } = useStores()
    
    const { data, refreshing, onRefresh } = props
    return (
        <View style={{paddingHorizontal: props.margin, flex: 1}}>
            <FlatList<Video>
                onEndReached={videosStore.fetchMoreVideos}
                onEndReachedThreshold={0.3}
                style={{flex:1}}
                ListFooterComponent={renderLoader}
                data={data}
                contentContainerStyle={{ paddingVertical: 15 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={(video) => video.id.videoId+Math.random()}
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
}

/* export const VideoList = observer(VideoListComponent) */

const renderLoader = () =>{
    
    return(
        
        <ActivityIndicator size="large" /> 
    )
}
