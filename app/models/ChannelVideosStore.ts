import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { withSetPropAction } from "./helpers/with-set-prop-action"
import { VideoModel } from "./Video"

/**
 * Model description here for TypeScript hints.
 */
export const ChannelVideosStoreModel = types
  .model("VideosStore")
  .props({
    isLoading: false,
    nextPageToken: types.optional(types.string, ''),
    items: types.optional(types.array(VideoModel), []),
  })
  .views((self) => ({
    get channelVideosList() {
      return self.items
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchChannelVideos(channelId) {
      self.setProp("isLoading", true)
      const response = await api.getChannelVideos(channelId)
      if (response.kind === "ok") {
        self.setProp("items", response.videos)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
      self.setProp("isLoading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ChannelVideosStore extends Instance<typeof ChannelVideosStoreModel> { }
export interface ChannelVideosStoreSnapshotOut extends SnapshotOut<typeof ChannelVideosStoreModel> { }
export interface ChannelVideosStoreSnapshotIn extends SnapshotIn<typeof ChannelVideosStoreModel> { }
export const createChannelVideosStoreDefaultModel = () => types.optional(ChannelVideosStoreModel, {})
