import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { VideoList } from "../components/VideoList"

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
  const { channelStore, channelVideosStore } = useStores()
  const { route, navigation } = _props
  const [refreshing, setRefreshing] = React.useState(false)

  useEffect(() => {
    channelStore.fetchChannel(route.params.channelId)
    channelVideosStore.fetchChannelVideos(route.params.channelId)

  }, [ channelVideosStore.items, channelStore.items])
  /* useEffect(() => {
      //await channelStore.fetchChannel(route.params.channelId);
      channelVideosStore.fetchChannelVideos(route.params.channelId)
    
  }, []); */
  //console.log(channelVideosStore.items)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  if(channelVideosStore.isLoading || channelStore.isLoading){
    return(
      <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <Text text="channel" />
      <View>
						<VideoList data={channelVideosStore.channelVideosList} />
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
