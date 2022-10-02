import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { VideosStoreModel } from "./VideosStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    videosStore: types.optional(VideosStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
