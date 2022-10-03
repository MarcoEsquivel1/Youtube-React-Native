import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Dimensions, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { VideoList } from "../components/VideoList"
import { useStores } from "../models"
import {  useTheme } from "@react-navigation/native"
import { MaterialIcons } from '@expo/vector-icons'
import YoutubePlayer from "react-native-youtube-iframe";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Video: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Video" component={VideoScreen} />`
// Hint: Look for the 🔥!
interface VideoScreenProps extends AppStackScreenProps<"Video"> { }
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type

export const VideoScreen = observer(function VideoScreen(_props: VideoScreenProps) {
	// Pull in one of our MST stores
	// const { someStore, anotherStore } = useStores()
	const { videosStore, recommendedVideosStore } = useStores()
	// Pull in navigation via hook
	// const navigation = useNavigation()
	/* const route = useRoute<RouteProp<ParamList, 'video'>>();
	const video = route.params
	console.log(video.id) */
	const { colors } = useTheme()
    const textcolor = colors.text
	const [playing, setPlaying] = useState(true);
	const { route, navigation } = _props
	const {height} = Dimensions.get('window');
	useEffect(() => {
		//channelStore.fetchChannel(route.params.channelId)
		recommendedVideosStore.fetchRecommendedVideos(route.params.video.id.videoId)
	
	  }, [ recommendedVideosStore.items])

	  if(recommendedVideosStore.isLoading ){
		return(
		  <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
			<ActivityIndicator size="large" />
		  </View>
		)
	  }
	return (
		<Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
			<View style={{
				flex: 1,
				
			}}>
				<View style={{
					width: "100%",
					height: 230
				}}>
					<YoutubePlayer
                    height={270}
                    play={playing}
                    videoId={route.params.video.id.videoId}
                />
					{/* <WebView
						allowsBackForwardNavigationGestures={true}
						mediaPlaybackRequiresUserAction={false}
						allowsInlineMediaPlayback={true}
						javaScriptEnabled={true}
						domStorageEnabled={true}
						source={{ uri: `https://www.youtube.com/embed/${route.params.video.id.videoId}` }}
					/> */}

				</View>
				<View >
					<Text style={{
						fontSize: 20,
						width: Dimensions.get("screen").width - 50,
						margin: 9,
						marginBottom:0
					}}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{route.params.video.snippet.title}
					</Text>
					<Text style={{
						fontSize: 10,
						//width: Dimensions.get("screen").width - 50,
						margin: 9
					}}
						
						
					>
						{route.params.video.snippet.description}
					</Text>
				</View>

				<View >
					<TouchableOpacity
						onPress={
							() => { navigation.navigate('Channel', {channelId: route.params.video.snippet.channelId})
							
						}}
					>
					<View
						style={{ 
							borderTopWidth: 0.6, 
							borderBottomWidth: 0.6, 
							borderColor: 'lightgray', 
							flexDirection: 'row', 
							margin: 5, 
							paddingVertical: 5,
							alignItems: 'center'
						}}
					>
							<MaterialIcons name="account-circle" size={40} color="#212121" />
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
							>{route.params.video.snippet.channelTitle}</Text>
						</View>
					</View>
					</TouchableOpacity>
				</View>
				<View style={{flex:1, height: height}}>
					{
						recommendedVideosStore.isLoading ? 
						<ActivityIndicator size="large" /> :
						<VideoList data={recommendedVideosStore.recommendedVideosList} getMore={recommendedVideosStore.fetchMoreVideos}/>
					}
				</View>
			</View>
		</Screen>
	)
})

const $root: ViewStyle = {
	flex: 1,
}

const $screenContentContainer: ViewStyle = {
	flex: 1,
}
