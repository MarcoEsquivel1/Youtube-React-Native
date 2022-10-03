
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { withSetPropAction } from "./helpers/with-set-prop-action"
import { VideoModel } from "./Video"

/**
 * Model description here for TypeScript hints.
 */
export const RecommendedVideoStoreModel = types
  .model("RecommendedVideoStore")
  .props({
    isLoading: false,
    nextPageToken: types.optional(types.string, ''),
    items: types.optional(types.array(VideoModel), []),
  })
  .views((self) => ({
    get recommendedVideosList() {
      return self.items
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchRecommendedVideos(videoId) {
      self.setProp("isLoading", true)
      const response = await api.getRecommendedVideos(videoId)
      if (response.kind === "ok") {
        self.setProp("items", response.videos)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
      self.setProp("isLoading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface RecommendedVideoStore extends Instance<typeof RecommendedVideoStoreModel> {}
export interface RecommendedVideoStoreSnapshotOut extends SnapshotOut<typeof RecommendedVideoStoreModel> {}
export interface RecommendedVideoStoreSnapshotIn extends SnapshotIn<typeof RecommendedVideoStoreModel> {}
export const createRecommendedVideoStoreDefaultModel = () => types.optional(RecommendedVideoStoreModel, {})
