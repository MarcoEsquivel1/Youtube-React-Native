import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Button, Card, EmptyState, Icon, Screen, Text, Toggle } from "../components"
import { Video } from "../models/Video"
import { delay } from "../utils/delay"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { VideoCard } from "../components/VideoCard"
import { useStore } from "../models/VideosStore"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

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
  const videosStore = useStore()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await videosStore.fetchVideos()
      setIsLoading(false)
    })
  }, [videosStore])

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
      <Text text="home" />
      <Text>Hola</Text>
      <FlatList<Video> 
        data={videosStore.videosList}
        contentContainerStyle={{ paddingVertical: 15 }}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        
        keyExtractor= {(video) => video.id.videoId}
        renderItem={({ item }) => {
          return(
            <VideoCard 
              video={item}
            />
          )
        }}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

//MAVERICKTODO: update the generator template with new patterns
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}

const $item: ViewStyle = {
  padding: spacing.medium,
  marginTop: spacing.medium,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.small,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $toggle: ViewStyle = {
  marginTop: spacing.medium,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginRight: spacing.small,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.extraSmall,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginRight: spacing.medium,
  marginBottom: spacing.extraSmall,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.medium,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.micro,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.huge,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}