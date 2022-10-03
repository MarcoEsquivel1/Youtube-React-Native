import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CommentModel = types
  .model("Comment")
  .props({
    id: types.string,
    snippet: types.model({
      videoId: types.string,
      topLevelComment: types.model({
        id: types.string,
        snippet: types.model({
          videoId: types.string,
          textDisplay: types.string,
          textOriginal: types.string,
          authorDisplayName: types.string,
          authorProfileImageUrl: types.string,
          likeCount: types.number,
        })
      }),
    })
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Comment extends Instance<typeof CommentModel> { }
export interface CommentSnapshotOut extends SnapshotOut<typeof CommentModel> { }
export interface CommentSnapshotIn extends SnapshotIn<typeof CommentModel> { }
export const createCommentDefaultModel = () => types.optional(CommentModel, {})
