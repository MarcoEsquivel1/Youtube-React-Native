import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ChannelStoreModel } from "./ChannelStore"
import { ChannelVideosStoreModel } from "./ChannelVideosStore"
import { VideosStoreModel } from "./VideosStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    videosStore: types.optional(VideosStoreModel, {}),
    channelStore: types.optional(ChannelStoreModel, {}),
    channelVideosStore: types.optional(ChannelVideosStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
