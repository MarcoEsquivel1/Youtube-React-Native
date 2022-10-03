import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ChannelVideosStoreModel } from "./ChannelVideosStore"
import { RecommendedVideoStoreModel } from "./RecommendedVideoStore"
import { VideosStoreModel } from "./VideosStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    videosStore: types.optional(VideosStoreModel, {}),
    channelVideosStore: types.optional(ChannelVideosStoreModel, {}),
    recommendedVideosStore: types.optional(RecommendedVideoStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
