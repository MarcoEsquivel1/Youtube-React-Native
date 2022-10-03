import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Dimensions, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { FlatList } from "react-native-gesture-handler"
import { Comment } from "../models/Comment"
import { CommentCard } from "../components/CommentCard"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Comments: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Comments" component={CommentsScreen} />`
// Hint: Look for the 🔥!
interface CommentsScreenProps extends AppStackScreenProps<"Comments"> { }
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type

export const CommentsScreen = observer(function CommentsScreen(_props: CommentsScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { commentsStore } = useStores()
  const { route } = _props
  const {height} = Dimensions.get('window');
  useEffect(() => {
    commentsStore.fetchComments(route.params.videoId)

  }, [commentsStore.items])

  if (commentsStore.isLoading) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <Text>Comments:</Text>
      <View style={{flex:1, height: height}}>
      <FlatList<Comment>
                style={{flex:1}}
                data={commentsStore.commentsList}
                contentContainerStyle={{ paddingVertical: 15 }}
                keyExtractor={(comment) => comment.id+Math.random()}
                renderItem={({ item }) => {
                    return (    
                        <CommentCard comment={item}/>
                    )
                }}
            />
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