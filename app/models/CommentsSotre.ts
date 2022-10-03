import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { CommentModel } from "./Comment"
import { withSetPropAction } from "./helpers/with-set-prop-action"

/**
 * Model description here for TypeScript hints.
 */
export const CommentsSotreModel = types
  .model("CommentsSotre")
  .props({
    isLoading: false,
    nextPageToken: types.optional(types.string, ""),
    items: types.optional(types.array(CommentModel), [])
  })
  .views((self) => ({
    get commentsList(){
      return self.items
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchComments(videoId) {
      self.setProp("isLoading", true)
      
      const response = await api.getComments(videoId)
      if (response.kind === "ok") {
        //console.log(response.comments)
        self.setProp("items", response.comments)
        self.setProp("nextPageToken", response.nextPageToke)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
      self.setProp("isLoading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CommentsSotre extends Instance<typeof CommentsSotreModel> { }
export interface CommentsSotreSnapshotOut extends SnapshotOut<typeof CommentsSotreModel> { }
export interface CommentsSotreSnapshotIn extends SnapshotIn<typeof CommentsSotreModel> { }
export const createCommentsSotreDefaultModel = () => types.optional(CommentsSotreModel, {})
