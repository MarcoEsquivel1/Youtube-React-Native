import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Dimensions, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { VideoList } from "../components/VideoList"
import { VideoCard } from "../components/VideoCard"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Channel: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Channel" component={ChannelScreen} />`
// Hint: Look for the 🔥!
interface ChannelScreenProps extends AppStackScreenProps<"Channel"> { }
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
export const ChannelScreen = observer(function ChannelScreen(_props: ChannelScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { channelVideosStore } = useStores()
  const { route } = _props
  const {height} = Dimensions.get('window');
  useEffect(() => {
    channelVideosStore.fetchChannelVideos(route.params.channelId)

  }, [channelVideosStore.items])

  if (channelVideosStore.isLoading) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <VideoCard video={channelVideosStore.channelVideosList[0]} />
      <Text>Uploads:</Text>
      <View style={{flex:1, height: height}}>
        <VideoList data={channelVideosStore.channelVideosList} margin={10} getMore={channelVideosStore.fetchMoreVideos}/>
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
