import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, FlatList, ImageBackground, StatusBar, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { cast } from "mobx-state-tree"
import { ZoomIn } from "react-native-reanimated"
import { VideoList } from "../components/VideoList"
import { useStores } from "../models"
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Video } from "../models/Video"
import { RouteProp, useRoute } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Video: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Video" component={VideoScreen} />`
// Hint: Look for the 🔥!
type ParamList = {
	video: Video
}
interface VideoScreenProps extends AppStackScreenProps<"Video"> {}
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type

export const VideoScreen = observer(function VideoScreen(_props: VideoScreenProps) {
	// Pull in one of our MST stores
	// const { someStore, anotherStore } = useStores()
	const { videosStore } = useStores()
	// Pull in navigation via hook
	// const navigation = useNavigation()
	/* const route = useRoute<RouteProp<ParamList, 'video'>>();
	const video = route.params
	console.log(video.id) */
	const {route, navigation}=_props
	return (
		<Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
			<Text text="video" />
			<View style={{
				flex: 1,
				marginTop: Constant.statusBarHeight
			}}>
				<View style={{
               width:"100%",
               height:250
           }}>
              <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
               source={{uri:`https://www.youtube.com/embed/${route.params.video.id.videoId}`}}
              />

           </View>
           <Text style={{
               fontSize:20,
               width:Dimensions.get("screen").width - 50,
               margin:9
           }}
           numberOfLines={2}
           ellipsizeMode="tail"
           >
             {route.params.video.snippet.title}
           </Text>
           <View
             style={{borderBottomWidth:1}}
           />
			<View >
				<View>
					<VideoList data={videosStore.items} />
				</View>
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
