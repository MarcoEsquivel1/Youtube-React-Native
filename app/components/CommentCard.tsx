import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Comment } from "../models/Comment";
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
interface CardCommentProps {
    comment: Comment
}
export const CommentCardComponent = (props: CardCommentProps) => {
    const { colors } = useTheme()
    const { comment } = props
    const textcolor = colors.text
    return (
        <View 
            style={{ 
                flex: 1,borderTopWidth: 0.6,
                borderBottomWidth: 0.6,
                borderColor: 'lightgray', 
                paddingVertical: 10
            }}
        >
            <View
                style={{
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
                    >{comment.snippet.topLevelComment.snippet.authorDisplayName}</Text>
                </View>
            </View>
            <Text
                style={{
                    fontSize: 12,
                    margin: 9
                }}
            >
                {comment.snippet.topLevelComment.snippet.textDisplay}
            </Text>
        </View>
    )
};

export const CommentCard = observer(CommentCardComponent)