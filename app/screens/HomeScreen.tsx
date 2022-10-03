import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  Dimensions,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Screen } from "../components"
import { delay } from "../utils/delay"
import { useStores } from "../models/"
import { VideoList } from "../components/VideoList"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Home: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Home" component={HomeScreen} />`
// Hint: Look for the 🔥!
const ICON_SIZE = 14
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackParamList, "Home">> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { videosStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const {height} = Dimensions.get('window');
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await videosStore.fetchVideos()
      setIsLoading(false)
    })
  }, [])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([videosStore.fetchVideos(), delay(750)])
    setRefreshing(false)
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <View style={{flex: 1, height: height}}>

        <VideoList data={videosStore.videosList} onRefresh={manualRefresh} refreshing={refreshing} getMore={videosStore.fetchMoreVideos}/>
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
